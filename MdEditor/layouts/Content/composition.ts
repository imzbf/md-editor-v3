import { watch, inject, computed, ref, ComputedRef, nextTick, Ref, onMounted } from 'vue';
import marked from 'marked';
import copy from 'copy-to-clipboard';
import bus from '../../utils/event-bus';
import { EditorContentProps } from './index';
import { HeadList, StaticTextDefaultValue, prefix } from '../../Editor';
import {
  directive2flag,
  insert,
  scrollAuto,
  setPosition,
  ToolDirective
} from '../../utils';

interface HistoryDataType {
  // 历史记录列表
  list: Array<string>;
  // 是否是手动输入而非撤回
  userUpdated: boolean;
  // 当前记录位置
  curr: number;
}

/**
 * 保存历史记录
 */
export const useHistory = (props: EditorContentProps) => {
  const historyLength = inject('historyLength') as number;

  // 防抖ID
  let saveHistoryId = -1;

  const history: HistoryDataType = {
    list: [props.value],
    userUpdated: true,
    curr: 0
  };

  watch(
    () => props.value,
    (nVal) => {
      clearTimeout(saveHistoryId);

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

          history.list.push(nVal);
          // 下标调整为最后一个位置
          history.curr = history.list.length - 1;
        } else {
          history.userUpdated = true;
        }
      }, 500);
    }
  );

  bus.on({
    name: 'ctrlZ',
    callback() {
      history.userUpdated = false;
      // 倒退一个下标，最多倒退到0
      history.curr = history.curr - 1 < 0 ? 0 : history.curr - 1;
      props.onChange(history.list[history.curr]);
    }
  });

  bus.on({
    name: 'ctrlShiftZ',
    callback() {
      history.userUpdated = false;
      // 前进一个下标，最多倒退到最大下标
      history.curr =
        history.curr + 1 === history.list.length ? history.curr : history.curr + 1;
      props.onChange(history.list[history.curr]);
    }
  });
};

/**
 * markdown编译逻辑
 */
export const useMarked = (props: EditorContentProps) => {
  const highlightInited = ref(false);

  // 标题数目
  let count = Number(0);
  // 标题列表，扁平结构
  let headstemp: HeadList[] = new Array();

  // marked渲染实例
  const renderer = new marked.Renderer();

  // 标题重构
  renderer.heading = (text, level) => {
    headstemp.push({ text, level });
    count++;

    // Bug marked单实例，count等依赖被共享

    return `<h${level} id="heading-${count}"><span class="h-text">${text}</span></h${level}>`;
  };

  marked.setOptions({
    renderer
  });

  if (props.hljs) {
    // 提供了hljs，在创建阶段即完成设置
    marked.setOptions({
      highlight: (code) => props.hljs.highlightAuto(code).value
    });
  }

  // ---预览代码---
  const html = computed(() => {
    // 重置标题说和标题列表
    count = 0;
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
      highlight(code) {
        return window.hljs.highlightAuto(code).value;
      }
    });

    highlightInited.value = true;
  };

  watch(
    () => html.value,
    (nVal) => {
      // 变化时调用变化事件
      props.onHtmlChanged(nVal);
      props.onGetCatalog(headstemp);
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

  htmlChanged();
};

export const useAutoGenrator = (props: EditorContentProps, textAreaRef: Ref) => {
  const previewOnly = inject('previewOnly') as boolean;
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
                insert(textAreaRef.value as HTMLTextAreaElement, `\n- `, {})
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
      bus.on({
        name: 'replace',
        callback(direct: ToolDirective, params: any) {
          props.onChange(
            directive2flag(
              direct,
              selectedText.value,
              textAreaRef.value as HTMLTextAreaElement,
              params
            )
          );
        }
      });
    }
  });

  return {
    selectedText
  };
};
