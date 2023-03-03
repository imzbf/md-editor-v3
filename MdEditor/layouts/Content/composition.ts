import {
  watch,
  inject,
  ref,
  ComputedRef,
  nextTick,
  Ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  toRef
} from 'vue';
import { marked, Renderer } from 'marked';
import copy from 'copy-to-clipboard';
import mediumZoom from 'medium-zoom';
import { ContentProps } from './props';
import { HeadList, RewriteHeading, StaticTextDefaultValue } from '../../type';
import { prefix, katexUrl, mermaidUrl, configOption } from '../../config';
import bus from '../../utils/event-bus';
import {
  insert,
  scrollAuto,
  setPosition,
  generateCodeRowNumber,
  debounce,
  getSelectionText,
  uuid
} from '../../utils';
import { ToolDirective, directive2flag } from '../../utils/content-help';
import { appendHandler, updateHandler } from '../../utils/dom';
import kaTexExtensions from '../../utils/katex';
import alertExtension from '../../utils/alert';
import { TEXTAREA_FOCUS } from '../../static/event-name';
import { isServer } from '../../static/env';

interface HistoryItemType {
  // 记录内容
  content: string;
  // 本次记录鼠标选择内容开始位置
  startPos: number;
  // 结束位置
  endPos: number;
}
interface HistoryDataType {
  // 历史记录列表
  list: Array<HistoryItemType>;
  // 是否是手动输入而非撤回
  userUpdated: boolean;
  // 当前记录位置
  curr: number;
}

/**
 * 保存历史记录
 */
export const useHistory = (
  props: ContentProps,
  textAreaRef: Ref,
  completeStatus: Ref<boolean>
) => {
  const previewOnly = inject('previewOnly') as boolean;
  const historyLength = inject('historyLength') as number;
  const editorId = inject('editorId') as string;

  if (previewOnly) {
    return;
  }

  // 防抖ID
  let saveHistoryId = -1;

  const history: HistoryDataType = {
    list: [
      {
        content: props.value,
        startPos: textAreaRef.value?.selectionStart || 0,
        endPos: textAreaRef.value?.selectionEnd || 0
      }
    ],
    userUpdated: true,
    curr: 0
  };

  const POSITION_START = [0, 0];
  // 文本改变前的光标位置
  let historyPos = POSITION_START;

  const keyZCallback = (curr: number) => {
    // 保存当前的鼠标位置
    const startPos: number = textAreaRef.value?.selectionStart || 0;
    const endPos: number = textAreaRef.value?.selectionEnd || 0;

    history.list[history.curr].startPos = startPos;
    history.list[history.curr].endPos = endPos;

    // 移除状态
    history.userUpdated = false;
    history.curr = curr;

    const currHistory = history.list[history.curr];

    // 恢复光标位置
    historyPos = [currHistory.startPos, currHistory.endPos];
    props.onChange(currHistory.content);

    // 选中内容
    setPosition(textAreaRef.value, currHistory.startPos, currHistory.endPos).then(() => {
      bus.emit(editorId, 'selectTextChange');
    });
  };

  const saveHistory = (content: string) => {
    clearTimeout(saveHistoryId);
    const startPos: number = textAreaRef.value?.selectionStart || 0;
    const endPos: number = textAreaRef.value?.selectionEnd || 0;

    saveHistoryId = <any>setTimeout(() => {
      // 如果不是撤销操作，就记录
      if (history.userUpdated) {
        // 重置撤回之前的记录
        if (history.curr < history.list.length - 1) {
          history.list = history.list.slice(0, history.curr + 1);
        }
        if (history.list.length > historyLength) {
          history.list.shift();
        }

        // 修改保存上次记录选中定位
        const lastStep = history.list.pop() || {
          startPos: 0,
          endPos: 0,
          content
        };

        lastStep.startPos = historyPos[0];
        lastStep.endPos = historyPos[1];

        // 恢复初始位置历史
        historyPos = POSITION_START;

        Array.prototype.push.call(history.list, lastStep, {
          content,
          startPos,
          endPos
        });

        // 下标调整为最后一个位置
        history.curr = history.list.length - 1;
      } else {
        history.userUpdated = true;
      }
    }, 150);
  };

  /**
   * @param force 是否强制更新光标历史
   */
  const saveHistoryPos = (force: boolean) => {
    // 如果不是初始值，代表上次记录未插入输入历史
    if (historyPos === POSITION_START || force) {
      historyPos = [textAreaRef.value?.selectionStart, textAreaRef.value?.selectionEnd];
    }
  };

  watch([toRef(props, 'value'), completeStatus], () => {
    // 输入中文等时，oninput不会保存历史记录
    // 在完成时保存
    if (completeStatus.value) {
      saveHistory(props.value);
    }
  });

  watch(
    () => props.value,
    () => {
      // 更新后清除选中内容
      bus.emit(editorId, 'selectTextChange');
    },
    {
      flush: 'post'
    }
  );

  onMounted(() => {
    bus.on(editorId, {
      name: 'ctrlZ',
      callback() {
        keyZCallback(history.curr - 1 < 0 ? 0 : history.curr - 1);
      }
    });

    bus.on(editorId, {
      name: 'ctrlShiftZ',
      callback() {
        keyZCallback(
          history.curr + 1 === history.list.length ? history.curr : history.curr + 1
        );
      }
    });

    bus.on(editorId, {
      name: 'saveHistoryPos',
      callback: saveHistoryPos
    });
  });
};

/**
 * 注册katex扩展到marked
 *
 * @param props 内容组件props
 * @param marked -
 */
export const useKatex = (props: ContentProps, marked: any) => {
  // 获取相应的扩展配置链接
  const katexConf = configOption.editorExtensions?.katex;
  const katexIns = katexConf?.instance;

  // katex是否加载完成
  const katexInited = ref(false);

  // 当没有设置不使用katex，直接扩展组件
  if (!props.noKatex) {
    marked.use({
      extensions: [
        kaTexExtensions.inline(prefix, katexIns),
        kaTexExtensions.block(prefix, katexIns)
      ]
    });
  }

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
  });

  return katexInited;
};

/**
 * markdown编译逻辑
 */
export const useMarked = (props: ContentProps) => {
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
          return `<p class="${prefix}-mermaid-loading">${code}</p>`;
        }
        // ==========
        //   客户端
        // ==========
        else {
          const mermaid = mermaidIns || window.mermaid;

          if (mermaid) {
            mermaidTasks.push(mermaid.mermaidAPI.render(idRand, code));
          } else {
            // 这块图源码不会正确展示在页面上
            return `<p class="${prefix}-mermaid-loading">${code}</p>`;
          }
        }

        const mermaidTemplate = `<script type="text/tmplate"<${idRand}</script>`;

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

  const katexInited = useKatex(props, marked);
  // mermaid图表
  const mermaidData = useMermaid(props);

  // 在created阶段构造一次
  // 这里的不包括异步编译内容（mermaid@10）
  const html = ref(props.sanitize(marked(props.value || '', { renderer })));

  /**
   * 手动替换占位符
   */
  const asyncReplace = async () => {
    /**
     * 未处理占位符的html
     */
    let unresolveHtml = props.sanitize(marked(props.value || '', { renderer }));

    const taskResults = await Promise.allSettled(mermaidTasks);
    taskResults.forEach((r, index) => {
      // 正常完成，替换模板
      if (r.status === 'fulfilled') {
        unresolveHtml = unresolveHtml.replace(
          mermaidIds[index],
          `<p class="${prefix}-mermaid">${
            typeof r.value === 'string' ? r.value : r.value.svg
          }</p>`
        );
      } else {
        unresolveHtml = unresolveHtml.replace(
          mermaidIds[index],
          `<p class="${prefix}-mermaid-error">${r.reason || ''}</p>`
        );
      }
    });
    // 替换后移除占位信息
    mermaidIds = [];
    mermaidTasks = [];

    return unresolveHtml;
  };

  const markHtml = debounce(
    async () => {
      // 清理历史标题
      heads.value = [];
      // 编译文本并替换异步任务模板占位
      const resolveHtml = await asyncReplace();
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
    [
      highlightInited,
      toRef(mermaidData, 'reRender'),
      toRef(mermaidData, 'mermaidInited'),
      katexInited,
      toRef(props, 'value')
    ],
    markHtml
  );

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

    if (!highlightIns) {
      const highlightLink = document.createElement('link');
      highlightLink.rel = 'stylesheet';
      highlightLink.href = highlightUrl.value.css;
      highlightLink.id = `${prefix}-hlCss`;

      const highlightScript = document.createElement('script');
      highlightScript.src = highlightUrl.value.js;
      highlightScript.onload = highlightLoad;
      highlightScript.id = `${prefix}-hljs`;

      appendHandler(highlightLink);
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

/**
 * 自动滚动逻辑
 */
export const useAutoScroll = (
  props: ContentProps,
  html: Ref<string>,
  textAreaRef: Ref,
  previewRef: Ref,
  htmlRef: Ref
) => {
  const previewOnly = inject('previewOnly') as boolean;
  const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
  const editorId = inject('editorId') as string;

  let clearScrollAuto = () => {};
  let initScrollAuto = () => {};

  // 向页面代码块注入复制按钮
  const initCopyEntry = () => {
    document.querySelectorAll(`#${editorId}-preview pre`).forEach((pre: Element) => {
      // 恢复进程ID
      let clearTimer = -1;

      // 如果存在复制按钮，则移除
      pre.querySelector('.copy-button')?.remove();

      const copyBtnText = ult.value.copyCode?.text || '复制代码';
      const copyButton = document.createElement('span');
      copyButton.setAttribute('class', 'copy-button');
      copyButton.dataset.tips = copyBtnText;

      copyButton.innerHTML = `<svg class="${prefix}-icon" aria-hidden="true"><use xlink:href="#${prefix}-icon-copy"></use></svg>`;

      copyButton.addEventListener('click', () => {
        // 多次点击移除上次的恢复进程
        clearTimeout(clearTimer);

        const codeText = (pre.querySelector('code') as HTMLElement).innerText;

        const success = copy(props.formatCopiedText(codeText));

        const succssTip = ult.value.copyCode?.successTips || '已复制！';
        const failTip = ult.value.copyCode?.failTips || '已复制！';

        copyButton.dataset.tips = success ? succssTip : failTip;

        clearTimer = window.setTimeout(() => {
          copyButton.dataset.tips = copyBtnText;
        }, 1500);
      });
      pre.appendChild(copyButton);
    });
  };

  // 编译事件
  const htmlChanged = () => {
    nextTick(() => {
      // 更新完毕后判断是否需要重新绑定滚动事件
      if (props.setting.preview && !previewOnly && props.scrollAuto) {
        clearScrollAuto();
        initScrollAuto();
      }

      // 重新设置复制按钮
      initCopyEntry();
    });
  };

  const settingPreviewChanged = (nVal: boolean) => {
    // 分栏发生变化时，显示分栏时注册同步滚动，隐藏是清除同步滚动
    if (nVal && !previewOnly) {
      nextTick(() => {
        clearScrollAuto();
        // 需要等到页面挂载完成后再注册，否则不能正确获取到预览dom
        [initScrollAuto, clearScrollAuto] = scrollAuto(
          textAreaRef.value as HTMLElement,
          (previewRef.value as HTMLElement) || htmlRef.value
        );
        initScrollAuto();
        initCopyEntry();
      });
    }
  };

  watch(() => html.value, htmlChanged);
  watch(() => ult.value, initCopyEntry);
  watch(() => props.setting.preview, settingPreviewChanged);
  watch(() => props.setting.htmlPreview, settingPreviewChanged);
  watch(
    () => props.scrollAuto,
    (sa) => {
      if (sa) {
        initScrollAuto();
      } else {
        clearScrollAuto();
      }
    }
  );

  onMounted(() => {
    initCopyEntry();

    if (!previewOnly && (previewRef.value || htmlRef.value)) {
      [initScrollAuto, clearScrollAuto] = scrollAuto(
        textAreaRef.value as HTMLElement,
        (previewRef.value as HTMLElement) || htmlRef.value
      );
    }

    if (props.scrollAuto) {
      initScrollAuto();
    }
  });
};

/**
 * 处理输入框中的一些交互事件，例如：列表回车生成一个新的空行列表等
 *
 * @param props ContentProps
 * @param textAreaRef 输入框
 */
export const useAutoGenrator = (props: ContentProps, textAreaRef: Ref) => {
  const previewOnly = inject('previewOnly') as boolean;
  const tabWidth = inject('tabWidth') as number;
  const editorId = inject('editorId') as string;
  const selectedText = ref('');

  onMounted(() => {
    if (!previewOnly) {
      textAreaRef.value?.addEventListener('keypress', (event: any) => {
        if (event.key === 'Enter') {
          const endPoint = textAreaRef.value?.selectionStart as number;

          // 前半部分
          const prefixStr = textAreaRef.value?.value.substring(0, endPoint);
          // 后半部分
          const subStr = textAreaRef.value?.value.substring(endPoint);
          // 前半部分最后一个换行符位置，用于分割当前行内容
          const lastIndexBR = prefixStr?.lastIndexOf('\n');

          const enterPressRow = prefixStr?.substring(
            (lastIndexBR as number) + 1,
            endPoint
          ) as string;

          // 是列表
          if (/^\d+\.\s|^-\s/.test(enterPressRow)) {
            event.cancelBubble = true;
            event.preventDefault();
            event.stopPropagation();

            // 如果列表当前行没有内容，则清空当前行
            // '- ', '- [ ] ', '- [x] '，-同数字
            if (/^(\d+\.|-)\s+(\[[x\s]\]\s+)?$/.test(enterPressRow)) {
              const resetPrefixStr = prefixStr?.replace(
                /(\d+\.|-)\s+(\[[x\s]\]\s+)?$/,
                ''
              );

              props.onChange((resetPrefixStr as string) + subStr);

              // 手动定位光标到当前位置
              setPosition(
                textAreaRef.value as HTMLTextAreaElement,
                resetPrefixStr?.length
              );
            } else if (/^-\s+.+/.test(enterPressRow)) {
              const newLine = /^-\s+\[[x\s]\]/.test(enterPressRow) ? '\n- [ ] ' : '\n- ';
              // 无序列表存在内容
              props.onChange(
                insert(textAreaRef.value as HTMLTextAreaElement, newLine, {})
              );
            } else {
              const lastOrderMatch = enterPressRow?.match(/\d+(?=\.)/);

              const nextOrder = (lastOrderMatch && Number(lastOrderMatch[0]) + 1) || 1;

              const newLine = /^\d\.\s+\[[x\s]\]/.test(enterPressRow)
                ? `\n${nextOrder}. [ ] `
                : `\n${nextOrder}. `;

              props.onChange(
                insert(textAreaRef.value as HTMLTextAreaElement, newLine, {})
              );
            }
          }
        }
      });

      // 注册指令替换内容事件
      bus.on(editorId, {
        name: 'replace',
        callback(direct: ToolDirective, params = {}) {
          props.onChange(
            directive2flag(
              direct,
              selectedText.value,
              textAreaRef.value as HTMLTextAreaElement,
              {
                ...params,
                tabWidth,
                editorId
              }
            )
          );
        }
      });

      // 注册修改选择内容事件
      bus.on(editorId, {
        name: 'selectTextChange',
        callback() {
          selectedText.value = getSelectionText(textAreaRef.value);
        }
      });
    }
  });

  watch(
    () => props.value,
    () => {
      // 内容变化后清空选中内容
      selectedText.value = '';
    }
  );
};

/**
 * 注册katex扩展到marked
 *
 */
export const useMermaid = (props: ContentProps) => {
  const theme = inject('theme') as ComputedRef<string>;
  const { editorExtensions } = configOption;
  const mermaidConf = editorExtensions?.mermaid;

  const mermaidData = reactive({
    reRender: false,
    mermaidInited: !!mermaidConf?.instance
  });

  const reSetMermaidTheme = () => {
    if (!props.noMermaid) {
      // 提供了外部实例
      if (mermaidConf?.instance) {
        mermaidConf.instance.initialize({
          startOnLoad: false,
          theme: theme.value === 'dark' ? 'dark' : 'default'
        });
      } else if (window.mermaid) {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: theme.value === 'dark' ? 'dark' : 'default'
        });
      }

      mermaidData.reRender = !mermaidData.reRender;
    }
  };

  watch(() => theme.value, reSetMermaidTheme);

  let mermaidScript: HTMLScriptElement;
  onMounted(() => {
    // 引入mermaid
    if (!props.noMermaid && !mermaidConf?.instance) {
      mermaidScript = document.createElement('script');
      mermaidScript.id = `${prefix}-mermaid`;
      const jsSrc = mermaidConf?.js || mermaidUrl;

      if (/\.mjs/.test(jsSrc)) {
        mermaidScript.setAttribute('type', 'module');
        mermaidScript.innerHTML = `import mermaid from "${jsSrc}";window.mermaid=mermaid;document.getElementById('${prefix}-mermaid').onload()`;
      } else {
        mermaidScript.src = jsSrc;
      }
      mermaidScript.onload = () => {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: theme.value === 'dark' ? 'dark' : 'default',
          logLevel: import.meta.env.MODE === 'development' ? 'Error' : 'Fatal'
        });
        mermaidData.mermaidInited = true;
      };

      appendHandler(mermaidScript, 'mermaid');
    } else if (!props.noMermaid) {
      reSetMermaidTheme();
    }
  });

  return mermaidData;
};

/**
 * 处理粘贴板
 */
export const usePasteUpload = (props: ContentProps, textAreaRef: Ref) => {
  const editorId = inject('editorId') as string;
  const previewOnly = inject('previewOnly') as boolean;

  // 粘贴板上传
  const pasteHandler = (e: ClipboardEvent) => {
    if (!e.clipboardData) {
      return;
    }

    // 处理文件
    if (e.clipboardData.files.length > 0) {
      const { files } = e.clipboardData;

      bus.emit(
        editorId,
        'uploadImage',
        Array.from(files).filter((file) => {
          return /image\/.*/.test(file.type);
        })
      );

      e.preventDefault();
    }

    // 识别vscode代码
    if (props.autoDetectCode && e.clipboardData.types.includes('vscode-editor-data')) {
      const vscCoodInfo = JSON.parse(e.clipboardData.getData('vscode-editor-data'));

      bus.emit(editorId, 'replace', 'code', {
        mode: vscCoodInfo.mode,
        text: e.clipboardData.getData('text/plain')
      });

      e.preventDefault();
    }
  };

  onMounted(() => {
    if (!previewOnly) {
      textAreaRef.value.addEventListener('paste', pasteHandler);
    }
  });

  onBeforeUnmount(() => {
    if (!previewOnly) {
      textAreaRef.value.removeEventListener('paste', pasteHandler);
    }
  });
};

/**
 * 放大图片
 *
 * @param props 基础属性
 * @param html 编译后的html
 */
export const userZoom = (props: ContentProps, html: Ref<string>) => {
  const editorId = inject('editorId') as string;

  const zoomHander = debounce(() => {
    const imgs = document.querySelectorAll(`#${editorId}-preview img[zoom]`);

    if (imgs.length === 0) {
      return;
    }

    mediumZoom(imgs, {
      background: '#00000073'
    });
  });

  onMounted(zoomHander);
  watch([html, toRef(props.setting, 'preview')], zoomHander);
};

/**
 * 一些附带的设置
 */
export const useAttach = (textAreaRef: Ref) => {
  const editorId = inject('editorId') as string;

  onMounted(() => {
    bus.on(editorId, {
      name: TEXTAREA_FOCUS,
      callback() {
        textAreaRef.value?.focus();
      }
    });
  });
};
