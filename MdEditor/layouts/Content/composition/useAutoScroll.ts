import { ComputedRef, inject, nextTick, onMounted, Ref, watch } from 'vue';
import copy from 'copy-to-clipboard';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { scrollAuto } from '~/utils';
import { ContentProps } from '../props';

/**
 * 自动滚动逻辑
 */
const useAutoScroll = (
  props: ContentProps,
  html: Ref<string>,
  inputWrapper: Ref<HTMLDivElement | undefined> | string,
  previewRef: Ref<HTMLDivElement | undefined>,
  htmlRef: Ref<HTMLDivElement | undefined>
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

        const inputWrapperElement =
          typeof inputWrapper === 'string'
            ? document.querySelector(inputWrapper)
            : inputWrapper.value;

        // 需要等到页面挂载完成后再注册，否则不能正确获取到预览dom
        [initScrollAuto, clearScrollAuto] = scrollAuto(
          inputWrapperElement as HTMLElement,
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

    const inputWrapperElement =
      typeof inputWrapper === 'string'
        ? document.querySelector(inputWrapper)
        : inputWrapper.value;

    if (!previewOnly && (previewRef.value || htmlRef.value)) {
      [initScrollAuto, clearScrollAuto] = scrollAuto(
        inputWrapperElement as HTMLElement,
        (previewRef.value as HTMLElement) || htmlRef.value
      );
    }

    if (props.scrollAuto) {
      initScrollAuto();
    }
  });
};

export default useAutoScroll;
