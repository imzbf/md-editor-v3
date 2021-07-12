import {
  defineComponent,
  computed,
  onMounted,
  Teleport,
  inject,
  PropType,
  watch,
  nextTick,
  ref
} from 'vue';
import { prefix, SettingType } from '../../Editor';
import marked from 'marked';
import copy from 'copy-to-clipboard';
import bus from '../../utils/event-bus';
import {
  ToolDirective,
  directive2flag,
  insert,
  setPosition,
  scrollAuto
} from '../../utils';

import { useHistory } from './composition';

declare global {
  interface Window {
    hljs: any;
  }
}

// 向页面代码块注入复制按钮
const initCopyEntry = () => {
  document.querySelectorAll(`.${prefix}-preview-wrapper pre`).forEach((pre: Element) => {
    const copyButton = document.createElement('span');
    copyButton.setAttribute('class', 'copy-button');
    copyButton.innerText = '复制代码';
    copyButton.addEventListener('click', () => {
      copy((pre.querySelector('code') as HTMLElement).innerText);
    });
    pre.appendChild(copyButton);
  });
};

export type EditorContentProps = Readonly<{
  value: string;
  hljs: Record<string, any>;
  onChange: (v: string) => void;
}>;

export default defineComponent({
  name: 'MDEditorContent',
  props: {
    value: {
      type: String as PropType<string>,
      default: ''
    },
    hljs: {
      type: Object,
      default: null
    },
    onChange: {
      type: Function as PropType<(v: string) => void>,
      default: () => () => {}
    },
    setting: {
      type: Object as PropType<SettingType>,
      default: () => ({})
    }
  },
  setup(props) {
    const highlightInited = ref<boolean>(props.hljs !== null);
    const highlight = inject('highlight') as { js: string; css: string };

    // 输入框
    const textAreaRef = ref<HTMLTextAreaElement>();
    // 输入框选中的内容
    let selectedText = '';
    // 预览框
    const previewRef = ref<HTMLDivElement>();

    if (props.hljs) {
      // 提供了hljs，在创建阶段即完成设置
      marked.setOptions({
        highlight(code) {
          return props.hljs.highlightAuto(code).value;
        }
      });
    }

    onMounted(() => {
      // 复制按钮
      initCopyEntry();

      textAreaRef.value?.addEventListener('select', () => {
        selectedText = window.getSelection()?.toString() || '';
      });

      textAreaRef.value?.addEventListener('keypress', (event) => {
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
              selectedText,
              textAreaRef.value as HTMLTextAreaElement,
              params
            )
          );
        }
      });

      // bus.on({
      //   name: 'clearSelectedText',
      //   callback() {
      //     selectedText = '';
      //   }
      // });

      //
      scrollAuto(textAreaRef.value as HTMLElement, previewRef.value as HTMLElement);
    });

    const html = computed(() => {
      if (highlightInited.value) {
        return marked(props.value);
      } else {
        return '';
      }
    });

    const highlightLoad = () => {
      marked.setOptions({
        highlight(code) {
          return window.hljs.highlightAuto(code).value;
        }
      });

      highlightInited.value = true;
      nextTick(initCopyEntry);
    };

    // ------\
    let clearScrollAuto = () => {};
    watch(
      () => props.value,
      () => {
        nextTick(() => {
          initCopyEntry();

          if (props.setting.column) {
            clearScrollAuto = scrollAuto(
              textAreaRef.value as HTMLElement,
              previewRef.value as HTMLElement
            );
          }
        });
      }
    );

    watch(
      () => props.setting.column,
      (nVal) => {
        // 分栏发生变化时，显示分栏时注册同步滚动，隐藏是清除同步滚动
        if (nVal) {
          nextTick(() => {
            // 需要等到页面挂载完成后再注册，否则不能正确获取到预览dom
            clearScrollAuto = scrollAuto(
              textAreaRef.value as HTMLElement,
              previewRef.value as HTMLElement
            );
          });
        } else {
          clearScrollAuto();
        }
      }
    );

    useHistory(props);

    return () => {
      return (
        <>
          <div class={`${prefix}-content`}>
            <div class={[`${prefix}-input-wrapper`]}>
              <textarea
                ref={textAreaRef}
                value={props.value}
                onInput={(e) => {
                  // 先清空保存的选中内容，防止异常现象
                  selectedText = '';

                  // 触发更新
                  props.onChange((e.target as HTMLTextAreaElement).value);
                }}
                class={[props.setting.column ? '' : 'textarea-only']}
              />
            </div>
            {props.setting.column && (
              <div
                ref={previewRef}
                class={`${prefix}-preview-wrapper`}
                innerHTML={html.value}
              />
            )}
          </div>
          {props.hljs === null && (
            <Teleport to={document.head}>
              <link rel="stylesheet" href={highlight.css} />
              <script src={highlight.js} onLoad={highlightLoad} />
            </Teleport>
          )}
        </>
      );
    };
  }
});
