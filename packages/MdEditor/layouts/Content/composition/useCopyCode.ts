import { ComputedRef, inject, nextTick, onMounted, Ref, watch } from 'vue';
import copy from 'copy-to-clipboard';
import { CustomIcon, StaticTextDefaultValue } from '~/type';
import { ContentPreviewProps } from '../ContentPreview';
import StrIcon from '~/components/Icon/Str';

const useCopyCode = (props: ContentPreviewProps, html: Ref<string>, key: Ref<string>) => {
  const editorId = inject('editorId') as string;
  const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
  const customIcon = inject('customIcon') as ComputedRef<CustomIcon>;

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

      copyButton.innerHTML = StrIcon('copy', customIcon.value);

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
