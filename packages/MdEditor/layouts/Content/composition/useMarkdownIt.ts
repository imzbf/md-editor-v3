import { computed, ComputedRef, inject, onMounted, ref, toRef, watch } from 'vue';
import mdit from 'markdown-it';
import ImageFiguresPlugin from 'markdown-it-image-figures';
import TaskListPlugin from 'markdown-it-task-lists';
import XSSPlugin from 'markdown-it-xss';
import { debounce, uuid } from '@vavt/util';
import bus from '~/utils/event-bus';
import { generateCodeRowNumber } from '~/utils';
import { HeadList, MarkdownItConfigPlugin, Themes } from '~/type';
import { configOption } from '~/config';
import {
  BUILD_FINISHED,
  CATALOG_CHANGED,
  PUSH_CATALOG,
  RERENDER
} from '~/static/event-name';

import useHighlight from './useHighlight';
import useMermaid from './useMermaid';
import useKatex from './useKatex';

import MermaidPlugin from '../markdownIt/mermaid';
import KatexPlugin from '../markdownIt/katex';
import AdmonitionPlugin from '../markdownIt/admonition';
import HeadingPlugin from '../markdownIt/heading';
import CodeTabsPlugin from '../markdownIt/codetabs';
import { ContentPreviewProps } from '../ContentPreview';

const initLineNumber = (md: mdit) => {
  [
    'paragraph_open',
    'table_open',
    'ordered_list_open',
    'bullet_list_open',
    'blockquote_open',
    'hr',
    'html_block',
    'fence'
  ].forEach((rule) => {
    const backup = md.renderer.rules[rule];

    if (!backup) {
      md.renderer.rules[rule] = (tokens, idx, options, _env, self) => {
        let line;
        if (tokens[idx].map && tokens[idx].level === 0) {
          line = tokens[idx].map![0];
          tokens[idx].attrSet('data-line', String(line));
        }
        return self.renderToken(tokens, idx, options);
      };
    } else {
      md.renderer.rules[rule] = (tokens, idx, options, env, self) => {
        let line;
        const _htmlCode = backup(tokens, idx, options, env, self);

        // 不向注释行添加行号
        if (tokens[idx].map && tokens[idx].level === 0 && !/^<!--/.test(_htmlCode)) {
          line = tokens[idx].map![0];
          return _htmlCode.replace(/^(<[^>]*)/, `$1 data-line="${line}"`);
        }

        return _htmlCode;
      };
    }
  });
};

const useMarkdownIt = (props: ContentPreviewProps, previewOnly: boolean) => {
  const { editorConfig, markdownItConfig, markdownItPlugins } = configOption;
  //
  const editorId = inject('editorId') as string;
  // 是否显示行号
  const showCodeRowNumber = inject('showCodeRowNumber') as boolean;
  const themeRef = inject('theme') as ComputedRef<Themes>;

  const headsRef = ref<HeadList[]>([]);

  const hljsRef = useHighlight(props);
  const katexRef = useKatex(props);
  const { reRenderRef, replaceMermaid } = useMermaid(props);

  const md = mdit({
    html: true,
    breaks: true
  });

  markdownItConfig!(md, {
    editorId
  });

  const plugins: MarkdownItConfigPlugin[] = [
    {
      type: 'katex',
      plugin: KatexPlugin,
      options: { katexRef }
    },
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
      type: 'codeTabs',
      plugin: CodeTabsPlugin,
      options: { editorId }
    },
    {
      type: 'xss',
      plugin: XSSPlugin,
      options: {
        // https://github.com/leizongmin/js-xss/blob/master/README.zh.md
        xss(xss: any) {
          return {
            whiteList: Object.assign({}, xss.getDefaultWhiteList(), {
              // 支持任务列表
              input: ['class', 'disabled', 'type', 'checked'],
              // 主要支持youtobe、腾讯视频、哔哩哔哩等内嵌视频代码
              iframe: [
                'class',
                'width',
                'height',
                'src',
                'title',
                'border',
                'frameborder',
                'framespacing',
                'allow',
                'allowfullscreen'
              ]
            })
          };
        }
      }
    }
  ];

  if (!props.noMermaid) {
    plugins.push({
      type: 'mermaid',
      plugin: MermaidPlugin,
      options: { themeRef }
    });
  }

  markdownItPlugins!(plugins, {
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
      let codeHtml;

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
        ? generateCodeRowNumber(codeHtml.replace(/^\n+|\n+$/g, ''))
        : `<span class="code-block">${codeHtml.replace(/^\n+|\n+$/g, '')}</span>`;

      return `<pre><code class="language-${language}" language=${language}>${codeSpan}</code></pre>`;
    }
  });

  initLineNumber(md);

  // 文章节点的key
  const key = ref(`_article-key_${uuid()}`);

  const html = ref(props.sanitize(md.render(props.modelValue)));

  const updatedTodo = () => {
    // 触发异步的保存事件（html总是会比text后更新）
    bus.emit(editorId, BUILD_FINISHED, html.value);
    props.onHtmlChanged(html.value);
    // 传递标题
    props.onGetCatalog(headsRef.value);
    // 生成目录
    bus.emit(editorId, CATALOG_CHANGED, headsRef.value);
    replaceMermaid();
  };

  onMounted(updatedTodo);

  const markHtml = () => {
    // 清理历史标题
    headsRef.value = [];
    html.value = props.sanitize(md.render(props.modelValue));
    updatedTodo();
  };

  const needReRender = computed(() => {
    return (props.noKatex || katexRef.value) && (props.noHighlight || hljsRef.value);
  });

  watch(
    [toRef(props, 'modelValue'), needReRender, reRenderRef],
    debounce<any, void>(
      markHtml,
      editorConfig?.renderDelay !== undefined
        ? editorConfig?.renderDelay
        : previewOnly
        ? 0
        : 500
    )
  );

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
        markHtml();
        // 强制更新节点
        key.value = `_article-key_${uuid()}`;
      }
    });
  });

  return { html, key };
};

export default useMarkdownIt;
