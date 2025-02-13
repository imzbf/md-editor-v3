import { Ref, onBeforeUnmount, onMounted, reactive, ref, toRef, watch } from 'vue';
import { MinInputBoxWidth } from '~/config';

import { ContentProps } from '../props';

const useResize = (
  props: ContentProps,
  contentRef: Ref<HTMLDivElement | undefined>,
  resizeRef: Ref<HTMLDivElement | undefined>
) => {
  const state = reactive({
    resizedWidth: props.inputBoxWidth
  });

  const inputWrapperStyle = reactive({
    width: props.inputBoxWidth
  });

  const resizeOperateStyle = reactive({
    left: props.inputBoxWidth,
    display: 'initial'
  });

  /**
   * 是否展示预览模块
   *
   * 解决问题：编辑区域和预览区域切换出现的时机不对，导致预览区域后，编辑区域的宽度才调整，出现闪缩。
   */
  const showPreviewWrapper = ref(props.setting.preview || props.setting.htmlPreview);

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
    props.oninputBoxWidthChange?.(ibw);
  };

  const resizeMousedown = (ev: MouseEvent) => {
    if (ev.target === resizeRef.value) {
      document.addEventListener('mousemove', resizeMousemove);
    }
  };

  const resizeMouseup = () => {
    document.removeEventListener('mousemove', resizeMousemove);
  };

  watch([resizeRef], () => {
    document.removeEventListener('mousedown', resizeMousedown);
    document.removeEventListener('mouseup', resizeMouseup);

    document.addEventListener('mousedown', resizeMousedown);
    document.addEventListener('mouseup', resizeMouseup);
  });

  onMounted(() => {
    document.addEventListener('mousedown', resizeMousedown);
    document.addEventListener('mouseup', resizeMouseup);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', resizeMousedown);
    document.removeEventListener('mouseup', resizeMouseup);
  });

  watch(
    () => props.inputBoxWidth,
    (nVal) => {
      if (nVal) {
        state.resizedWidth = nVal;
        inputWrapperStyle.width = nVal;
        resizeOperateStyle.left = nVal;
      }
    }
  );

  watch(
    [
      toRef(props.setting, 'htmlPreview'),
      toRef(props.setting, 'preview'),
      toRef(props.setting, 'previewOnly')
    ],
    () => {
      if (props.setting.previewOnly) {
        inputWrapperStyle.width = '0%';
        resizeOperateStyle.display = 'none';
        showPreviewWrapper.value = true;
      } else if (!props.setting.htmlPreview && !props.setting.preview) {
        inputWrapperStyle.width = '100%';
        resizeOperateStyle.display = 'none';
        showPreviewWrapper.value = false;
      } else {
        inputWrapperStyle.width = state.resizedWidth;
        resizeOperateStyle.display = 'initial';
        showPreviewWrapper.value = true;
      }
    },
    {
      immediate: true
    }
  );

  return { inputWrapperStyle, resizeOperateStyle, showPreviewWrapper };
};

export default useResize;
