import { watch, inject, ref, onMounted } from 'vue';

import bus from '~/utils/event-bus';
import { getSelectionText } from '~/utils';
import { ToolDirective, directive2flag } from '~/utils/content-help';

import { ContentProps } from '../props';

/**
 * 处理输入框中的一些交互事件，例如：列表回车生成一个新的空行列表等
 *
 * @param props ContentProps
 * @param textAreaRef 输入框
 */
const useAutoGenrator = (props: ContentProps) => {
  const previewOnly = inject('previewOnly') as boolean;
  const tabWidth = inject('tabWidth') as number;
  const editorId = inject('editorId') as string;
  const selectedText = ref('');

  onMounted(() => {
    // if (!previewOnly) {
    //   textAreaRef.value?.addEventListener('keypress', (event: any) => {
    //     if (event.key === 'Enter') {
    //       const endPoint = textAreaRef.value?.selectionStart as number;
    //       // 前半部分
    //       const prefixStr = textAreaRef.value?.value.substring(0, endPoint);
    //       // 后半部分
    //       const subStr = textAreaRef.value?.value.substring(endPoint);
    //       // 前半部分最后一个换行符位置，用于分割当前行内容
    //       const lastIndexBR = prefixStr?.lastIndexOf('\n');
    //       const enterPressRow = prefixStr?.substring(
    //         (lastIndexBR as number) + 1,
    //         endPoint
    //       ) as string;
    //       // 是列表
    //       if (/^\d+\.\s|^-\s/.test(enterPressRow)) {
    //         event.cancelBubble = true;
    //         event.preventDefault();
    //         event.stopPropagation();
    //         // 如果列表当前行没有内容，则清空当前行
    //         // '- ', '- [ ] ', '- [x] '，-同数字
    //         if (/^(\d+\.|-)\s+(\[[x\s]\]\s+)?$/.test(enterPressRow)) {
    //           const resetPrefixStr = prefixStr?.replace(
    //             /(\d+\.|-)\s+(\[[x\s]\]\s+)?$/,
    //             ''
    //           );
    //           props.onChange((resetPrefixStr as string) + subStr);
    //           // 手动定位光标到当前位置
    //           setPosition(
    //             textAreaRef.value as HTMLTextAreaElement,
    //             resetPrefixStr?.length
    //           );
    //         } else if (/^-\s+.+/.test(enterPressRow)) {
    //           const newLine = /^-\s+\[[x\s]\]/.test(enterPressRow) ? '\n- [ ] ' : '\n- ';
    //           // 无序列表存在内容
    //           props.onChange(
    //             insert(textAreaRef.value as HTMLTextAreaElement, newLine, {})
    //           );
    //         } else {
    //           const lastOrderMatch = enterPressRow?.match(/\d+(?=\.)/);
    //           const nextOrder = (lastOrderMatch && Number(lastOrderMatch[0]) + 1) || 1;
    //           const newLine = /^\d\.\s+\[[x\s]\]/.test(enterPressRow)
    //             ? `\n${nextOrder}. [ ] `
    //             : `\n${nextOrder}. `;
    //           props.onChange(
    //             insert(textAreaRef.value as HTMLTextAreaElement, newLine, {})
    //           );
    //         }
    //       }
    //     }
    //   });
    //   // 注册指令替换内容事件
    //   bus.on(editorId, {
    //     name: 'replace',
    //     callback(direct: ToolDirective, params = {}) {
    //       props.onChange(
    //         directive2flag(
    //           direct,
    //           selectedText.value,
    //           textAreaRef.value as HTMLTextAreaElement,
    //           {
    //             ...params,
    //             tabWidth,
    //             editorId
    //           }
    //         )
    //       );
    //     }
    //   });
    //   // 注册修改选择内容事件
    //   bus.on(editorId, {
    //     name: 'selectTextChange',
    //     callback() {
    //       selectedText.value = getSelectionText(textAreaRef.value);
    //     }
    //   });
    // }
  });

  watch(
    () => props.value,
    () => {
      // 内容变化后清空选中内容
      selectedText.value = '';
    }
  );
};

export default useAutoGenrator;
