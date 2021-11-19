import { watch, inject, computed, ref, ComputedRef, nextTick, Ref, onMounted } from 'vue';
import marked from 'marked';
import copy from 'copy-to-clipboard';
import { EditorContentProps } from './index';
import { HeadList, StaticTextDefaultValue, prefix } from '../../Editor';
import bus from '../../utils/event-bus';
import { insert, scrollAuto, setPosition, generateCodeRowNumber } from '../../utils';
import { ToolDirective, directive2flag } from '../../utils/content-help';

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
export const useHistory = (props: EditorContentProps, textAreaRef: Ref) => {
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

  watch(
    () => props.value,
    (nVal) => {
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
          const lastStep = history.list.pop() as HistoryItemType;
          lastStep.startPos = startPos;
          lastStep.endPos = endPos;

          Array.prototype.push.call(history.list, lastStep, {
            content: nVal,
            startPos,
            endPos
          });

          // 下标调整为最后一个位置
          history.curr = history.list.length - 1;
        } else {
          history.userUpdated = true;
        }
      }, 10);
    }
  );

  onMounted(() => {
    bus.on(editorId, {
      name: 'ctrlZ',
      callback() {
        history.userUpdated = false;
        // 倒退一个下标，最多倒退到0
        history.curr = history.curr - 1 < 0 ? 0 : history.curr - 1;

        const currHistory = history.list[history.curr];
        props.onChange(currHistory.content);

        // 选中内容
        setPosition(textAreaRef.value, currHistory.startPos, currHistory.endPos);
      }
    });

    bus.on(editorId, {
      name: 'ctrlShiftZ',
      callback() {
        history.userUpdated = false;
        // 前进一个下标，最多倒退到最大下标
        history.curr =
          history.curr + 1 === history.list.length ? history.curr : history.curr + 1;

        const currHistory = history.list[history.curr];
        props.onChange(currHistory.content);

        // 选中内容
        setPosition(textAreaRef.value, currHistory.startPos, currHistory.endPos);
      }
    });
  });
};

/**
 * markdown编译逻辑
 */
export const useMarked = (props: EditorContentProps) => {
  // 是否显示行号
  const showCodeRowNumber = inject('showCodeRowNumber') as boolean;
  const editorId = inject('editorId') as string;
  // ~~
  const highlightInited = ref(false);

  // 标题列表，扁平结构
  let headstemp: HeadList[] = [];

  // marked渲染实例
  const renderer = new marked.Renderer();

  // 标题重构
  renderer.heading = (...headProps) => {
    const [text, level] = headProps;
    headstemp.push({ text, level });

    return props.markedHeading(...headProps);
  };

  renderer.image = (href, _, desc) => {
    return `<figure><img src="${href}" alt="${desc}"><figcaption>${desc}</figcaption></figure>`;
  };
  marked.setOptions({
    renderer,
    breaks: true
  });

  if (props.hljs) {
    // 提供了hljs，在创建阶段即完成设置
    marked.setOptions({
      highlight: (code) => {
        const codeHtml = props.hljs.highlightAuto(code).value;

        return showCodeRowNumber
          ? generateCodeRowNumber(codeHtml)
          : `<span class="code-block">${codeHtml}</span>`;
      }
    });
  }

  // ---预览代码---
  const html = computed(() => {
    // 重置标题说和标题列表
    // count = 0;
    headstemp = [];
    const markedContent = marked(props.value);

    // 代码高亮加载完成后再重新编译一次代码
    if (highlightInited.value) {
      return markedContent;
    } else {
      return markedContent;
    }
  });

  // 高亮代码js加载完成后回调
  const highlightLoad = () => {
    marked.setOptions({
      highlight: (code) => {
        const codeHtml = window.hljs.highlightAuto(code).value;
        return showCodeRowNumber
          ? generateCodeRowNumber(codeHtml)
          : `<span class="code-block">${codeHtml}</span>`;
      }
    });

    highlightInited.value = true;
  };

  watch(
    () => html.value,
    (nVal) => {
      // 变化时调用变化事件
      props.onHtmlChanged(nVal);
      // 传递标题
      props.onGetCatalog(headstemp);

      // 生成目录
      bus.emit(editorId, 'catalogChanged', headstemp);
    }
  );

  return {
    html,
    highlightLoad
  };
};

/**
 * 自动滚动逻辑
 */
export const useAutoScroll = (
  props: EditorContentProps,
  html: ComputedRef<string>,
  textAreaRef: Ref,
  previewRef: Ref,
  htmlRef: Ref
) => {
  const previewOnly = inject('previewOnly') as boolean;
  const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
  const editorId = inject('editorId') as string;

  let clearScrollAuto = () => {};

  // 向页面代码块注入复制按钮
  const initCopyEntry = () => {
    document
      .querySelectorAll(`#${editorId} .${prefix}-preview pre`)
      .forEach((pre: Element) => {
        const copyButton = document.createElement('span');
        copyButton.setAttribute('class', 'copy-button');
        copyButton.innerText = ult.value.copyCode?.text || '复制代码';
        copyButton.addEventListener('click', () => {
          copy((pre.querySelector('code') as HTMLElement).innerText);

          copyButton.innerText = ult.value.copyCode?.tips || '已复制！';
          setTimeout(() => {
            copyButton.innerText = ult.value.copyCode?.text || '复制代码';
          }, 1500);
        });
        pre.appendChild(copyButton);
      });
  };

  // 编译事件
  const htmlChanged = () => {
    nextTick(() => {
      // 更新完毕后判断是否需要重新绑定滚动事件
      if (props.setting.preview && !previewOnly) {
        clearScrollAuto = scrollAuto(
          textAreaRef.value as HTMLElement,
          (previewRef.value as HTMLElement) || htmlRef.value
        );
      }

      // 重新设置复制按钮
      initCopyEntry();
    });
  };

  watch(() => html.value, htmlChanged);

  watch(
    () => props.setting.preview,
    (nVal) => {
      // 分栏发生变化时，显示分栏时注册同步滚动，隐藏是清除同步滚动
      if (nVal && !previewOnly) {
        nextTick(() => {
          // 需要等到页面挂载完成后再注册，否则不能正确获取到预览dom
          clearScrollAuto = scrollAuto(
            textAreaRef.value as HTMLElement,
            (previewRef.value as HTMLElement) || htmlRef.value
          );
        });
      } else {
        clearScrollAuto();
      }
    }
  );

  onMounted(htmlChanged);
};

export const useAutoGenrator = (props: EditorContentProps, textAreaRef: Ref) => {
  const previewOnly = inject('previewOnly') as boolean;
  const tabWidth = inject('tabWidth') as number;
  const editorId = inject('editorId') as string;
  const selectedText = ref('');

  onMounted(() => {
    if (!previewOnly) {
      textAreaRef.value?.addEventListener('select', () => {
        selectedText.value = window.getSelection()?.toString() || '';
      });

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
                tabWidth
              }
            )
          );
        }
      });
    }
  });

  // 注册修改选择内容事件
  bus.on(editorId, {
    name: 'selectTextChange',
    callback(val: string) {
      selectedText.value = val;
    }
  });

  return {
    selectedText
  };
};
