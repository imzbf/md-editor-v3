import { Ref, onBeforeUnmount, onMounted, reactive, toRef, watch } from 'vue';
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

    if (nextWidth < 100) {
      nextWidth = 100;
    } else if (nextWidth > maxWidth - 100) {
      nextWidth = maxWidth - 100;
    }

    inputWrapperStyle.width = `${nextWidth}px`;
    resizeOperateStyle.left = `${nextWidth}px`;
    state.resizedWidth = `${nextWidth}px`;
  };

  const resizeMousedown = () => {
    document.addEventListener('mousemove', resizeMousemove);
  };

  const resizeMouseup = () => {
    document.removeEventListener('mousemove', resizeMousemove);
  };

  onMounted(() => {
    resizeRef.value?.addEventListener('mousedown', resizeMousedown);
    document.addEventListener('mouseup', resizeMouseup);
  });

  onBeforeUnmount(() => {
    resizeRef.value?.removeEventListener('mousedown', resizeMousedown);
    resizeRef.value?.removeEventListener('mouseup', resizeMouseup);
  });

  watch(
    [toRef(props.setting, 'htmlPreview'), toRef(props.setting, 'preview')],
    () => {
      if (!props.setting.htmlPreview && !props.setting.preview) {
        state.resizedWidth = inputWrapperStyle.width;
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

  return { inputWrapperStyle, resizeOperateStyle };
};

export default useResize;
