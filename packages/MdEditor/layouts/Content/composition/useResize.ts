import { Ref, computed, onBeforeUnmount, onMounted, reactive, toRef, watch } from 'vue';
import { MinInputBoxWidth } from '~/config';

import { ContentProps } from '../props';

const useResize = (
  props: ContentProps,
  contentRef: Ref<HTMLDivElement | undefined>,
  resizeRef: Ref<HTMLDivElement | undefined>
) => {
  // 向后兼容，防止以前使用px的用户的编辑器布局混乱
  const compatibledInputBoxWidth = computed(() => {
    return /px$/.test(`${props.inputBoxWidth}`) ? '50%' : props.inputBoxWidth;
  });

  const state = reactive({
    resizedWidth: compatibledInputBoxWidth.value
  });

  const inputWrapperStyle = reactive({
    width: compatibledInputBoxWidth.value
  });

  const resizeOperateStyle = reactive({
    left: compatibledInputBoxWidth.value,
    display: 'initial'
  });

  const resizeMousemove = (e: MouseEvent) => {
    // 挂载后计算宽度的数值
    const maxWidth = contentRef.value?.offsetWidth || 0;

    const contentX = contentRef.value?.getBoundingClientRect().x || 0;

    // 新的宽度 = 鼠标的位置 - 图标的一半宽度 - 内容区域的横坐标
    let nextWidth = e.x - contentX;

    if (nextWidth / maxWidth < MinInputBoxWidth) {
      nextWidth = maxWidth * MinInputBoxWidth;
    } else if (nextWidth > maxWidth - maxWidth * MinInputBoxWidth) {
      nextWidth = maxWidth - maxWidth * MinInputBoxWidth;
    }

    const ibw = `${(nextWidth / maxWidth) * 100}%`;

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

  watch([compatibledInputBoxWidth], ([nVal]) => {
    state.resizedWidth = nVal;
    inputWrapperStyle.width = nVal;
    resizeOperateStyle.left = nVal;
  });

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
      } else if (!props.setting.htmlPreview && !props.setting.preview) {
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

  return {
    inputWrapperStyle,
    resizeOperateStyle
  };
};

export default useResize;
