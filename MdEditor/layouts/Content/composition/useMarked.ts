import { watch, inject, ref, ComputedRef, onMounted, toRef, computed } from 'vue';
import { marked, Renderer } from 'marked';
import LRUCache from 'lru-cache';
import bus from '~/utils/event-bus';
import { HeadList, RewriteHeading } from '~/type';
import { prefix, katexUrl, configOption } from '~/config';
import { generateCodeRowNumber, debounce, uuid } from '~/utils';
import { appendHandler, updateHandler } from '~/utils/dom';
import { isServer } from '~/static/env';
import { ContentProps } from '../props';
import { useKatex } from './useKatex';
import useMermaid from './useMermaid';
import alertExtension from '../marked/alert';

/**
 * markdown编译逻辑
 */
const useMarked = (props: ContentProps) => {
  const {
    markedRenderer,
    markedExtensions,
    markedOptions,
    editorExtensions,
    editorConfig
  } = configOption;
  // 是否显示行号
  const showCodeRowNumber = inject('showCodeRowNumber') as boolean;
  const editorId = inject('editorId') as string;
  const highlightUrl = inject('highlight') as ComputedRef<{ js: string; css: string }>;
  const previewOnly = inject('previewOnly') as boolean;
  const theme = inject('theme') as ComputedRef<string>;

  // 获取相应的扩展实例
  const highlightIns = editorExtensions?.highlight?.instance;
  const mermaidIns = editorExtensions?.mermaid?.instance;
  const katexIns = editorExtensions?.katex?.instance;

  // 获取相应的扩展配置链接
  const katexConf = editorExtensions?.katex;

  // ~~
  const highlightInited = ref(false);

  // 标题列表，扁平结构
  const heads = ref<HeadList[]>([]);

  // mermaid@10以后不再提供同步方法
  // 调整为ID站位，异步转译后替换
  let mermaidTasks: Array<Promise<any>> = [];
  let mermaidIds: Array<string> = [];

  const mermaidCache = new LRUCache({
    max: 1000,
    // 缓存10分钟
    ttl: 600000
  });

  // mermaid图表
  const mermaidData = useMermaid(props);
  const katexInited = useKatex(props, marked);

  // 三个影响编译内容的扩展同时初始化完成后再重新编译
  // 减少编译次数
  const extensionsInited = computed(() => {
    return (
      (props.noMermaid || mermaidData.mermaidInited) &&
      highlightInited.value &&
      (props.noKatex || katexInited.value)
    );
  });

  // marked渲染实例
  let renderer = new marked.Renderer();

  // 1. 设定可被覆盖的内部模块渲染方式
  // 1.1 图片
  renderer.image = (href, title, desc) => {
    return `<span class="figure"><img src="${href}" title="${title || ''}" alt="${
      desc || ''
    }" zoom><span class="figcaption">${desc || ''}</span></span>`;
  };

  // 1.2 列表
  renderer.listitem = (text: string, task: boolean) => {
    if (task) {
      return `<li class="li-task">${text}</li>`;
    }
    return `<li>${text}</li>`;
  };

  // 2. 设定自定义的renderer
  if (markedRenderer instanceof Function) {
    renderer = markedRenderer(renderer) as Renderer;
  }

  // 3. 设定内部携带不可覆盖逻辑的模块
  // 3.1 代码
  const markedCode = renderer.code;
  renderer.code = (code, language, isEscaped) => {
    if (!props.noMermaid && language === 'mermaid') {
      const idRand = uuid();

      try {
        // ==========
        //   服务端
        // ==========
        if (isServer) {
          // 无论是否提供实例，mermaid均不支持在node运行
          // 这块图源码不会正确显示在页面上，但可被搜索引擎捕获
          return `<p class="${prefix}-mermaid">${code}</p>`;
        }
        // ==========
        //   客户端
        // ==========
        else {
          // 取缓存
          const cacheSvg = mermaidCache.get(code) as string | undefined;
          if (cacheSvg) {
            return `<p class="${prefix}-mermaid" data-processed>${cacheSvg}</p>`;
          }

          // 主动转换
          const mermaid = mermaidIns || window.mermaid;
          if (mermaidData.mermaidInited) {
            // @9以下使用renderAsync，@10以上使用render
            const render = mermaid.renderAsync || mermaid.render;
            const mermaidRenderTask = render(idRand, code);
            mermaidRenderTask.then((svg: any) => {
              // 9:10
              mermaidCache.set(code, typeof svg === 'string' ? svg : svg.svg);
            });

            mermaidTasks.push(mermaidRenderTask);
          } else {
            // 这块图源码不会正确展示在页面上
            return `<p class="${prefix}-mermaid">${code}</p>`;
          }
        }

        const mermaidTemplate = `<script type="text/tmplate">${idRand}</script>`;

        mermaidIds.push(mermaidTemplate);

        // 返回占位符
        return mermaidTemplate;
      } catch (error: any) {
        // 兼容@9及以下的错误提示
        return `<p class="${prefix}-mermaid-error">Error: ${error?.message || ''}</p>`;
      }
    }

    return markedCode
      .call(renderer, code, language, isEscaped)
      .replace(
        /^<pre><code\sclass="language-([^>]*)">/,
        '<pre><code class="language-$1" language="$1">'
      );
  };

  // 3.2 标题
  const newHeading = renderer.heading;
  // 判断是否有重写heading
  const isNewHeading = newHeading !== new marked.Renderer().heading;

  renderer.heading = (text, level, raw, slugger) => {
    heads.value.push({ text: raw, level });

    // 我们默认同一级别的标题，你不会定义两个相同的
    const id = props.markedHeadingId(raw, level, heads.value.length);

    // 如果heading被重写了，使用新的heading
    if (isNewHeading) {
      return (newHeading as RewriteHeading).call(
        renderer,
        text,
        level,
        raw,
        slugger,
        heads.value.length,
        id
      );
    }

    // 如果标题有markdown语法内容，会按照该语法添加标题，而不再自定义，但是仍然支持目录定位
    if (text !== raw) {
      return `<h${level} id="${id}">${text}</h${level}>`;
    } else {
      return `<h${level} id="${id}"><a href="#${id}">${raw}</a></h${level}>`;
    }
  };

  // 4. 设定option
  // 4.1
  // 提供了hljs，在创建阶段即完成设置
  if (highlightIns) {
    // 提供了hljs，在创建阶段即完成设置
    marked.setOptions({
      highlight: (code, language) => {
        let codeHtml;
        const hljsLang = highlightIns.getLanguage(language);
        if (language && hljsLang) {
          codeHtml = highlightIns.highlight(code, {
            language,
            ignoreIllegals: true
          }).value;
        } else {
          codeHtml = highlightIns.highlightAuto(code).value;
        }

        return showCodeRowNumber
          ? generateCodeRowNumber(codeHtml)
          : `<span class="code-block">${codeHtml}</span>`;
      }
    });
  }

  // 4.2 自定义option覆盖
  marked.setOptions({
    breaks: true,
    ...markedOptions
  });

  // 5. 设置自定义的marked扩展
  if (markedExtensions instanceof Array && markedExtensions.length > 0) {
    marked.use({
      extensions: markedExtensions
    });
  }
  // 5.1 内部扩展扩展
  marked.use({
    extensions: [alertExtension]
  });

  // 在created阶段构造一次
  // 这里的不包括异步编译内容（mermaid@10）
  const html = ref(props.sanitize(marked(props.value || '', { renderer })));

  /**
   * 手动替换占位符
   */
  const asyncReplace = async (value: string) => {
    /**
     * 未处理占位符的html
     */
    // console.time(`${editorId}-asyncReplace`);
    let unresolveHtml = props.sanitize(marked(value, { renderer }));

    const mermaidTasksCopy = [...mermaidTasks];
    const mermaidIdsCopy = [...mermaidIds];
    // 移除占位信息
    mermaidIds = [];
    mermaidTasks = [];

    const taskResults = await Promise.allSettled(mermaidTasksCopy);
    taskResults.forEach((r, index) => {
      // 正常完成，替换模板
      if (r.status === 'fulfilled') {
        unresolveHtml = unresolveHtml.replace(
          mermaidIdsCopy[index],
          `<p class="${prefix}-mermaid" data-processed>${
            typeof r.value === 'string' ? r.value : r.value.svg
          }</p>`
        );
      } else {
        unresolveHtml = unresolveHtml.replace(
          mermaidIdsCopy[index],
          `<p class="${prefix}-mermaid-error">${r.reason || ''}</p>`
        );
      }
    });

    // console.timeEnd(`${editorId}-asyncReplace`);
    return unresolveHtml;
  };

  const markHtml = debounce(
    async () => {
      // 清理历史标题
      heads.value = [];
      // 编译文本并替换异步任务模板占位
      const resolveHtml = await asyncReplace(props.value || '');
      html.value = resolveHtml;
      // 触发异步的保存事件（html总是会比text后更新）
      bus.emit(editorId, 'buildFinished', html.value);
      props.onHtmlChanged(html.value);
    },
    editorConfig?.renderDelay !== undefined
      ? editorConfig?.renderDelay
      : previewOnly
      ? 0
      : 500
  );

  // 监听调用
  watch(
    [extensionsInited, toRef(mermaidData, 'reRender'), toRef(props, 'value')],
    markHtml
  );

  // mermaid每次生成的style会跟主题绑定
  watch([theme], () => {
    mermaidCache.clear();
  });

  // 高亮代码js加载完成后回调
  const highlightLoad = () => {
    marked.setOptions({
      highlight: (code, language) => {
        let codeHtml;
        const hljsLang = window.hljs.getLanguage(language);
        if (language && hljsLang) {
          codeHtml = window.hljs.highlight(code, {
            language,
            ignoreIllegals: true
          }).value;
        } else {
          codeHtml = window.hljs.highlightAuto(code).value;
        }

        return showCodeRowNumber
          ? generateCodeRowNumber(codeHtml)
          : `<span class="code-block">${codeHtml}</span>`;
      }
    });

    highlightInited.value = true;
  };

  watch(
    () => heads.value,
    (list) => {
      // 传递标题
      props.onGetCatalog(list);

      // 生成目录
      bus.emit(editorId, 'catalogChanged', list);
    }
  );

  // =====插入依赖扩展=====
  onMounted(() => {
    // 标签引入katex
    if (!props.noKatex && !katexIns) {
      const katexScript = document.createElement('script');

      katexScript.src = katexConf?.js || katexUrl.js;
      katexScript.onload = () => {
        katexInited.value = true;
      };
      katexScript.id = `${prefix}-katex`;

      const katexLink = document.createElement('link');
      katexLink.rel = 'stylesheet';
      katexLink.href = katexConf?.css || katexUrl.css;
      katexLink.id = `${prefix}-katexCss`;

      appendHandler(katexScript, 'katex');
      appendHandler(katexLink);
    }

    const highlightLink = document.createElement('link');
    highlightLink.rel = 'stylesheet';
    highlightLink.href = highlightUrl.value.css;
    highlightLink.id = `${prefix}-hlCss`;

    appendHandler(highlightLink);

    if (!highlightIns) {
      const highlightScript = document.createElement('script');
      highlightScript.src = highlightUrl.value.js;
      highlightScript.onload = highlightLoad;
      highlightScript.id = `${prefix}-hljs`;

      appendHandler(highlightScript, 'hljs');
    }
  });

  watch(
    () => highlightUrl.value.css,
    (url: string) => {
      updateHandler(`${prefix}-hlCss`, 'href', url);
    }
  );

  // 添加目录主动触发接收监听
  onMounted(() => {
    bus.on(editorId, {
      name: 'pushCatalog',
      callback() {
        bus.emit(editorId, 'catalogChanged', heads.value);
      }
    });
  });

  return html;
};

export default useMarked;
