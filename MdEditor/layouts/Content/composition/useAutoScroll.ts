import { inject, nextTick, onMounted, Ref, toRef, watch } from 'vue';
import scrollAuto, { scrollAutoWithScale } from '~/utils/scroll-auto';
import CodeMirrorUt from '../codemirror';
import { ContentProps } from '../props';

const useAutoScroll = (
  props: ContentProps,
  html: Ref<string>,
  previewRef: Ref<HTMLDivElement | undefined>,
  htmlRef: Ref<HTMLDivElement | undefined>,
  codeMirrorUt: Ref<CodeMirrorUt | undefined>
) => {
  const previewOnly = inject('previewOnly') as boolean;

  let clearScrollAuto = () => {};
  let initScrollAuto = () => {};

  // 编译事件
  const rebindEvent = () => {
    clearScrollAuto();
    const cmScroller = document.querySelector<HTMLDivElement>('.cm-scroller');

    if (!previewOnly && (previewRef.value || htmlRef.value)) {
      const scrollHandler = previewRef.value ? scrollAuto : scrollAutoWithScale;

      [initScrollAuto, clearScrollAuto] = scrollHandler(
        cmScroller!,
        previewRef.value! || htmlRef.value,
        codeMirrorUt.value!
      );
    }

    if (props.scrollAuto) {
      initScrollAuto();
    }
  };

  watch(
    [
      html,
      toRef(props.setting, 'preview'),
      toRef(props.setting, 'htmlPreview'),
      toRef(props.setting, 'fullscreen'),
      toRef(props.setting, 'pageFullscreen')
    ],
    () => {
      nextTick(rebindEvent);
    }
  );

  // 切换滚动状态
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

  onMounted(rebindEvent);
};

export default useAutoScroll;
