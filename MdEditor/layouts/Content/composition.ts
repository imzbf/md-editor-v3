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
import { marked } from 'marked';
import copy from 'copy-to-clipboard';
import mediumZoom from 'medium-zoom';
import { EditorContentProps } from './index';
import { HeadList, StaticTextDefaultValue, ConfigOption } from '../../type';
import { prefix, katexUrl, mermaidUrl } from '../../config';
import bus from '../../utils/event-bus';
import {
  insert,
  scrollAuto,
  setPosition,
  generateCodeRowNumber,
  debounce,
  getSelectionText
} from '../../utils';
import { ToolDirective, directive2flag } from '../../utils/content-help';
import { appendHandler, updateHandler } from '../../utils/dom';
import kaTexExtensions from '../../utils/katex';

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
  props: EditorContentProps,
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
 * markdown编译逻辑
 */
export const useMarked = (props: EditorContentProps, mermaidData: any) => {
  const {
    markedRenderer,
    markedExtensions,
    markedOptions,
    editorExtensions,
    editorConfig
  } = inject('extension') as ConfigOption;
  // 是否显示行号
  const showCodeRowNumber = inject('showCodeRowNumber') as boolean;
  const editorId = inject('editorId') as string;
  const highlightUrl = inject('highlight') as ComputedRef<{ js: string; css: string }>;

  // 获取相应的扩展实例
  const highlightIns = editorExtensions?.highlight?.instance;
  const mermaidIns = editorExtensions?.mermaid?.instance;
  const katexIns = editorExtensions?.katex?.instance;

  // 获取相应的扩展配置链接
  const katexConf = editorExtensions?.katex;

  // ~~
  const highlightInited = ref(false);
  // katex是否加载完成
  const katexInited = ref(false);

  // 标题列表，扁平结构
  const heads = ref<HeadList[]>([]);

  // marked渲染实例
  let renderer = new marked.Renderer();

  // 代码
  const markedCode = renderer.code;
  renderer.code = (code, language, isEscaped) => {
    if (!props.noMermaid && language === 'mermaid') {
      const idRand = `${prefix}-mermaid-${Date.now().toString(36)}`;

      try {
        let svgCode = '';
        // 服务端渲染，如果提供了mermaid，就生成svg
        if (mermaidIns) {
          svgCode = mermaidIns.mermaidAPI.render(idRand, code);
        }
        // 没有提供，则判断window对象是否可用，不可用则反回待解析的结构，在页面引入后再解析
        else if (typeof window !== 'undefined' && window.mermaid) {
          svgCode = window.mermaid.mermaidAPI.render(idRand, code);
        } else {
          // 这块代码不会正确展示在页面上
          svgCode = `<div class="mermaid">${code}</div>`;
        }

        return `<div class="${prefix}-mermaid">${svgCode}</div>`;
      } catch (error) {
        if (typeof document !== 'undefined') {
          const errorDom = document.querySelector(`#${idRand}`);

          if (errorDom) {
            const errorSvg = errorDom.outerHTML;
            errorDom.parentElement?.remove();
            return errorSvg;
          }
        }

        return '';
      }
    }

    return markedCode.call(renderer, code, language, isEscaped);
  };

  // 图片
  renderer.image = (href, title, desc) => {
    return `<span class="figure"><img src="${href}" title="${title || ''}" alt="${
      desc || ''
    }" zoom><span class="figcaption">${desc || ''}</span></span>`;
  };

  // 列表
  renderer.listitem = (text: string, task: boolean) => {
    if (task) {
      return `<li class="li-task">${text}</li>`;
    }
    return `<li>${text}</li>`;
  };

  // 保存默认heading
  const markedheading = renderer.heading;

  if (markedRenderer instanceof Function) {
    renderer = markedRenderer(renderer);
  }

  // 判断是否有重写heading
  const newHeading = renderer.heading;
  const isNewHeading = markedheading !== newHeading;

  // 标题
  renderer.heading = (text, level, raw, slugger) => {
    heads.value.push({ text: raw, level });

    // 如果heading被重写了，使用新的heading
    if (isNewHeading) {
      return newHeading.call(renderer, text, level, raw, slugger);
    }

    // return props.markedHeading(...headProps);
    // 我们默认同一级别的标题，你不会定义两个相同的
    const id = props.markedHeadingId(raw, level, heads.value.length);

    // 如果标题有markdown语法内容，会按照该语法添加标题，而不再自定义，但是仍然支持目录定位
    if (text !== raw) {
      return `<h${level} id="${id}">${text}</h${level}>`;
    } else {
      return `<h${level} id="${id}"><a href="#${id}">${raw}</a></h${level}>`;
    }
  };

  marked.setOptions({
    breaks: true,
    ...markedOptions
  });

  // 当没有设置不使用katex，直接扩展组件
  if (!props.noKatex) {
    marked.use({
      extensions: [
        kaTexExtensions.inline(prefix, katexIns),
        kaTexExtensions.block(prefix, katexIns)
      ]
    });
  }

  if (highlightIns) {
    // 提供了hljs，在创建阶段即完成设置
    marked.setOptions({
      highlight: (code, language) => {
        let codeHtml = '';
        const hljsLang = highlightIns.getLanguage(language);
        if (language && hljsLang) {
          codeHtml = highlightIns.highlight(code, {
            language: hljsLang.name.split(/,|\s/)[0],
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

  // 自定义的marked扩展
  if (markedExtensions instanceof Array && markedExtensions.length > 0) {
    marked.use({
      extensions: markedExtensions
    });
  }

  const html = ref(props.sanitize(marked(props.value || '', { renderer })));

  const markHtml = debounce(
    () => {
      heads.value = [];
      const _html = props.sanitize(marked(props.value || '', { renderer }));
      html.value = _html;

      props.onHtmlChanged(_html);
    },
    editorConfig?.renderDelay !== undefined ? editorConfig?.renderDelay : 500
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
        let codeHtml = '';
        const hljsLang = window.hljs.getLanguage(language);
        if (language && hljsLang) {
          codeHtml = window.hljs.highlight(code, {
            language: hljsLang.name.split(/,|\s/)[0],
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

  return {
    html
  };
};

/**
 * 自动滚动逻辑
 */
export const useAutoScroll = (
  props: EditorContentProps,
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
      const copyBtnText = ult.value.copyCode?.text || '复制代码';
      const copyButton = document.createElement('span');
      copyButton.setAttribute('class', 'copy-button');
      copyButton.innerText = copyBtnText;
      copyButton.addEventListener('click', () => {
        const success = copy((pre.querySelector('code') as HTMLElement).innerText);

        const succssTip = ult.value.copyCode?.successTips || '已复制！';
        const failTip = ult.value.copyCode?.failTips || '已复制！';

        copyButton.innerText = success ? succssTip : failTip;

        setTimeout(() => {
          copyButton.innerText = copyBtnText;
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
      });
    }
  };

  watch(() => html.value, htmlChanged);
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

export const useAutoGenrator = (props: EditorContentProps, textAreaRef: Ref) => {
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
            if (/^\d+\.\s+$|^-\s+$/.test(enterPressRow)) {
              const resetPrefixStr = prefixStr?.replace(
                new RegExp(enterPressRow + '$'),
                ''
              );
              props.onChange((resetPrefixStr as string) + subStr);

              // 手动定位光标到当前位置
              setPosition(
                textAreaRef.value as HTMLTextAreaElement,
                resetPrefixStr?.length
              );
            } else if (/^-\s+.+/.test(enterPressRow)) {
              // 无序列表存在内容
              props.onChange(
                insert(textAreaRef.value as HTMLTextAreaElement, '\n- ', {})
              );
            } else {
              const lastOrderMatch = enterPressRow?.match(/\d+(?=\.)/);

              const nextOrder = (lastOrderMatch && Number(lastOrderMatch[0]) + 1) || 1;
              props.onChange(
                insert(textAreaRef.value as HTMLTextAreaElement, `\n${nextOrder}. `, {})
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
                mermaidTemplate: props.mermaidTemplate,
                editorId
              }
            )
          );
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

  // 注册修改选择内容事件
  bus.on(editorId, {
    name: 'selectTextChange',
    callback() {
      selectedText.value = getSelectionText(textAreaRef.value);
    }
  });
};

export const useMermaid = (props: EditorContentProps) => {
  const theme = inject('theme') as ComputedRef<string>;
  const { editorExtensions } = inject('extension') as ConfigOption;
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
          theme: theme.value === 'dark' ? 'dark' : 'default'
        });
      } else if (window.mermaid) {
        window.mermaid.initialize({
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

      mermaidScript.src = mermaidConf?.js || mermaidUrl;
      mermaidScript.onload = () => {
        window.mermaid.initialize({
          theme: theme.value === 'dark' ? 'dark' : 'default',
          logLevel: import.meta.env.MODE === 'development' ? 'Error' : 'Fatal'
        });
        mermaidData.mermaidInited = true;
      };
      mermaidScript.id = `${prefix}-mermaid`;

      appendHandler(mermaidScript, 'mermaid');
    } else if (!props.noMermaid) {
      reSetMermaidTheme();
    }
  });

  return mermaidData;
};

export const usePasteUpload = (textAreaRef: Ref) => {
  const editorId = inject('editorId') as string;
  const previewOnly = inject('previewOnly') as boolean;

  // 粘贴板上传
  const pasteHandler = (e: ClipboardEvent) => {
    if (e.clipboardData && e.clipboardData.files.length > 0) {
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

export const userZoom = (html: Ref<string>) => {
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
  watch([html], zoomHander);
};
