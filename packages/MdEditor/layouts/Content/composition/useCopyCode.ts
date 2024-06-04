import { ComputedRef, inject, nextTick, onMounted, Ref, watch } from 'vue';
import copy from 'copy-to-clipboard';
import { StaticTextDefaultValue } from '~/type';
import { ContentPreviewProps } from '../ContentPreview';
import { prefix } from '~/config';

const useCopyCode = (props: ContentPreviewProps, html: Ref<string>, key: Ref<string>) => {
  const editorId = inject('editorId') as string;
  const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;

  // 向页面代码块注入复制按钮
  const initCopyEntry = () => {
    document
      .querySelectorAll(`#${editorId} .${prefix}-preview .${prefix}-code`)
      .forEach((codeBlock: Element) => {
        // 恢复进程ID
        let clearTimer = -1;

        const copyButton = codeBlock.querySelector<HTMLSpanElement>(
          `.${prefix}-copy-button`
        );

        if (copyButton)
          copyButton.onclick = (e) => {
            e.preventDefault();
            // 多次点击移除上次的恢复进程
            clearTimeout(clearTimer);

            const activeCode =
              codeBlock.querySelector('input:checked + pre code') ||
              codeBlock.querySelector('pre code');

            const codeText = (activeCode as HTMLElement).textContent!;

            const success = copy(props.formatCopiedText(codeText));
            const { text, successTips, failTips } = ult.value.copyCode!;
            const msg = success ? successTips! : failTips!;

            if (copyButton.dataset.isIcon) {
              copyButton.dataset.tips = msg;
            } else {
              copyButton.innerHTML = msg;
            }

            clearTimer = window.setTimeout(() => {
              if (copyButton.dataset.isIcon) {
                copyButton.dataset.tips = text;
              } else {
                copyButton.innerHTML = text!;
              }
            }, 1500);
          };
      });
  };

  // 编译事件
  const htmlChanged = () => {
    // 重新设置复制按钮
    nextTick(initCopyEntry);
  };

  // 分栏发生变化时
  const settingPreviewChanged = (nVal: boolean) => {
    if (nVal) {
      nextTick(initCopyEntry);
    }
  };

  watch([html, key], htmlChanged);
  watch(() => props.setting.preview, settingPreviewChanged);
  watch(() => props.setting.htmlPreview, settingPreviewChanged);
  watch(() => ult.value, initCopyEntry);
  onMounted(initCopyEntry);
};

export default useCopyCode;
