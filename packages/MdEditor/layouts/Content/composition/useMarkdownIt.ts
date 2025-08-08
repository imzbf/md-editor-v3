import { randomId } from '@vavt/util';
import mdit from 'markdown-it';
import ImageFiguresPlugin from 'markdown-it-image-figures';
import SubPlugin from 'markdown-it-sub';
import SupPlugin from 'markdown-it-sup';
import {
  computed,
  ComputedRef,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  toRef,
  watch
} from 'vue';
import { globalConfig, prefix } from '~/config';
import {
  BUILD_FINISHED,
  CATALOG_CHANGED,
  PUSH_CATALOG,
  RERENDER
} from '~/static/event-name';
import {
  CustomIcon,
  HeadList,
  MarkdownItConfigPlugin,
  StaticTextDefaultValue,
  Themes
} from '~/type';
import { generateCodeRowNumber } from '~/utils';
import { zoomMermaid } from '~/utils/dom';
import bus from '~/utils/event-bus';

import useHighlight from './useHighlight';
import useKatex from './useKatex';
import useMermaid from './useMermaid';

import { ContentPreviewProps } from '../ContentPreview';
import AdmonitionPlugin from '../markdownIt/admonition';
import CodePlugin from '../markdownIt/code';
import HeadingPlugin from '../markdownIt/heading';
import KatexPlugin from '../markdownIt/katex';
import MermaidPlugin from '../markdownIt/mermaid';
import TaskListPlugin from '../markdownIt/task';

const initLineNumber = (md: mdit) => {
  md.core.ruler.push('init-line-number', (state) => {
    state.tokens.forEach((token) => {
      if (token.map) {
        if (!token.attrs) {
          token.attrs = [];
        }
        token.attrs.push(['data-line', token.map[0].toString()]);
      }
    });
    return true;
  });
};

const useMarkdownIt = (props: ContentPreviewProps, previewOnly: boolean) => {
  const { editorConfig, markdownItConfig, markdownItPlugins, editorExtensions } =
    globalConfig;
  //
  const editorId = inject('editorId') as string;
  const languageRef = inject('language') as ComputedRef<string>;
  const usedLanguageTextRef = inject(
    'usedLanguageText'
  ) as ComputedRef<StaticTextDefaultValue>;
  // 是否显示行号
  const showCodeRowNumber = inject('showCodeRowNumber') as boolean;
  const themeRef = inject('theme') as ComputedRef<Themes>;
  const customIconRef = inject('customIcon') as ComputedRef<CustomIcon>;
  const rootRef = inject('rootRef') as ComputedRef<HTMLDivElement>;
  const headsRef = ref<HeadList[]>([]);

  // 存储每次mermaid更新后，需要清除的绑定事件
  let clearMermaidEvents = () => {};

  const hljsRef = useHighlight(props);
  const katexRef = useKatex(props);
  const { reRenderRef, replaceMermaid } = useMermaid(props);

  const md = mdit({
    html: true,
    breaks: true,
    linkify: true
  });

  markdownItConfig(md, {
    editorId
  });

  const plugins: MarkdownItConfigPlugin[] = [
    {
      type: 'image',
      plugin: ImageFiguresPlugin,
      options: { figcaption: true, classes: 'md-zoom' }
    },
    {
      type: 'admonition',
      plugin: AdmonitionPlugin,
      options: {}
    },
    {
      type: 'taskList',
      plugin: TaskListPlugin,
      options: {}
    },
    {
      type: 'heading',
      plugin: HeadingPlugin,
      options: { mdHeadingId: props.mdHeadingId, headsRef }
    },
    {
      type: 'code',
      plugin: CodePlugin,
      options: {
        editorId,
        usedLanguageTextRef,
        // showCodeRowNumber,
        codeFoldable: props.codeFoldable,
        autoFoldThreshold: props.autoFoldThreshold,
        customIconRef
      }
    },

    {
      type: 'sub',
      plugin: SubPlugin,
      options: {}
    },
    {
      type: 'sup',
      plugin: SupPlugin,
      options: {}
    }
  ];

  if (!props.noKatex) {
    plugins.push({
      type: 'katex',
      plugin: KatexPlugin,
      options: { katexRef }
    });
  }

  if (!props.noMermaid) {
    plugins.push({
      type: 'mermaid',
      plugin: MermaidPlugin,
      options: { themeRef }
    });
  }

  markdownItPlugins(plugins, {
    editorId
  }).forEach((item) => {
    md.use(item.plugin, item.options);
  });

  const userDefHighlight = md.options.highlight;

  md.set({
    highlight: (str, language, attrs) => {
      if (userDefHighlight) {
        const result = userDefHighlight(str, language, attrs);
        if (result) {
          return result;
        }
      }
      let codeHtml: string;

      // 不高亮或者没有实例，返回默认
      if (!props.noHighlight && hljsRef.value) {
        const hljsLang = hljsRef.value.getLanguage(language);
        if (hljsLang) {
          codeHtml = hljsRef.value.highlight(str, {
            language,
            ignoreIllegals: true
          }).value;
        } else {
          codeHtml = hljsRef.value.highlightAuto(str).value;
        }
      } else {
        codeHtml = md.utils.escapeHtml(str);
      }

      const codeSpan = showCodeRowNumber
        ? generateCodeRowNumber(
            codeHtml.replace(/^\n+|\n+$/g, ''),
            str.replace(/^\n+|\n+$/g, '')
          )
        : `<span class="${prefix}-code-block">${codeHtml.replace(/^\n+|\n+$/g, '')}</span>`;

      return `<pre><code class="language-${language}" language=${language}>${codeSpan}</code></pre>`;
    }
  });

  // if (!props.previewOnly) {
  initLineNumber(md);
  // }

  // 文章节点的key
  const key = ref(`_article-key_${randomId()}`);

  const html = ref(
    props.sanitize(
      md.render(props.modelValue, {
        srcLines: props.modelValue.split('\n')
      })
    )
  );

  const updatedTodo = () => {
    // 触发异步的保存事件（html总是会比text后更新）
    bus.emit(editorId, BUILD_FINISHED, html.value);
    props.onHtmlChanged(html.value);
    // 传递标题
    props.onGetCatalog(headsRef.value);
    // 生成目录
    bus.emit(editorId, CATALOG_CHANGED, headsRef.value);

    void nextTick(() => {
      void replaceMermaid().then(() => {
        if (editorExtensions.mermaid?.enableZoom) {
          clearMermaidEvents();
          clearMermaidEvents = zoomMermaid(
            rootRef.value?.querySelectorAll(
              `#${editorId} p.${prefix}-mermaid:not([data-closed=false])`
            ),
            {
              customIcon: customIconRef.value
            }
          );
        }
      });
    });
  };

  const markHtml = () => {
    // 清理历史标题
    headsRef.value = [];
    html.value = props.sanitize(
      md.render(props.modelValue, {
        srcLines: props.modelValue.split('\n')
      })
    );
    updatedTodo();
  };

  const needReRender = computed<boolean>(() => {
    return (props.noKatex || !!katexRef.value) && (props.noHighlight || !!hljsRef.value);
  });

  /**
   * 组件移除后，异步任务可能还未执行，无法取消debounce
   * 通过unMounted中断编译任务
   */
  let timer = -1;
  // 由于复制按钮被放到了编译内容中，所以切换语言时，需要重新编译一次
  watch([toRef(props, 'modelValue'), needReRender, reRenderRef, languageRef], () => {
    timer = window.setTimeout(
      () => {
        markHtml();
      },
      previewOnly ? 0 : editorConfig.renderDelay
    );
  });

  watch(
    () => props.setting.preview,
    () => {
      if (props.setting.preview) {
        // 生成目录
        void nextTick(() => {
          void replaceMermaid().then(() => {
            if (editorExtensions.mermaid?.enableZoom) {
              clearMermaidEvents();
              clearMermaidEvents = zoomMermaid(
                rootRef.value?.querySelectorAll(
                  `#${editorId} p.${prefix}-mermaid:not([data-closed=false])`
                ),
                {
                  customIcon: customIconRef.value
                }
              );
            }
          });
          bus.emit(editorId, CATALOG_CHANGED, headsRef.value);
        });
      }
    }
  );

  onMounted(updatedTodo);

  // 添加目录主动触发接收监听
  onMounted(() => {
    bus.on(editorId, {
      name: PUSH_CATALOG,
      callback() {
        bus.emit(editorId, CATALOG_CHANGED, headsRef.value);
      }
    });

    bus.on(editorId, {
      name: RERENDER,
      callback: () => {
        // 强制更新节点
        key.value = `_article-key_${randomId()}`;
        markHtml();
      }
    });
  });

  onBeforeUnmount(() => {
    clearMermaidEvents();
    clearTimeout(timer);
  });

  return { html, key };
};

export default useMarkdownIt;
