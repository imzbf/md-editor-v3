import { Ref, onBeforeUnmount, reactive, toRef, watch } from 'vue';
import { MinInputBoxWidth } from '~/config';

import { ContentProps } from '../props';

const useResize = (
  props: ContentProps,
  contentRef: Ref<HTMLDivElement | undefined>,
  resizeRef: Ref<HTMLDivElement | undefined>
) => {
  const state = reactive({
    resizedWidth: props.inputBoxWitdh
  });

  const inputWrapperStyle = reactive({
    width: props.inputBoxWitdh
  });

  const resizeOperateStyle = reactive({
    left: props.inputBoxWitdh,
    display: 'initial'
  });

  const resizeMousemove = (e: MouseEvent) => {
    // 挂载后计算宽度的数值
    const maxWidth = contentRef.value?.offsetWidth || 0;

    const contentX = contentRef.value?.getBoundingClientRect().x || 0;

    // 新的宽度 = 鼠标的位置 - 图标的一半宽度 - 内容区域的横坐标
    let nextWidth = e.x - contentX;

    if (nextWidth < MinInputBoxWidth) {
      nextWidth = MinInputBoxWidth;
    } else if (nextWidth > maxWidth - MinInputBoxWidth) {
      nextWidth = maxWidth - MinInputBoxWidth;
    }

    const ibw = `${nextWidth}px`;

    inputWrapperStyle.width = ibw;
    resizeOperateStyle.left = ibw;
    state.resizedWidth = ibw;
    props.onInputBoxWitdhChange?.(ibw);
  };

  const resizeMousedown = () => {
    document.addEventListener('mousemove', resizeMousemove);
  };

  const resizeMouseup = () => {
    document.removeEventListener('mousemove', resizeMousemove);
  };

  watch(
    [resizeRef],
    () => {
      resizeRef.value?.addEventListener('mousedown', resizeMousedown);
      resizeRef.value?.addEventListener('mouseup', resizeMouseup);
    },
    {
      immediate: true
    }
  );

  onBeforeUnmount(() => {
    resizeRef.value?.removeEventListener('mousedown', resizeMousedown);
    resizeRef.value?.removeEventListener('mouseup', resizeMouseup);
  });

  watch(
    () => props.inputBoxWitdh,
    (nVal) => {
      if (nVal) {
        inputWrapperStyle.width = nVal;
        resizeOperateStyle.left = nVal;
      }
    }
  );

  watch(
    [toRef(props.setting, 'htmlPreview'), toRef(props.setting, 'preview')],
    () => {
      if (!props.setting.htmlPreview && !props.setting.preview) {
        inputWrapperStyle.width = '100%';
        resizeOperateStyle.display = 'none';
      } else {
        inputWrapperStyle.width = state.resizedWidth;
        resizeOperateStyle.display = 'initial';
      }
    },
    {
      immediate: true
    }
  );

  // 编辑模式仅预览
  watch(
    () => props.setting.previewOnly,
    (po) => {
      if (po) {
        inputWrapperStyle.width = '0%';
        resizeOperateStyle.display = 'none';
      } else {
        inputWrapperStyle.width = state.resizedWidth;
        resizeOperateStyle.display = 'initial';
      }
    }
  );

  return { inputWrapperStyle, resizeOperateStyle };
};

export default useResize;
