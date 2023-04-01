import { inject, nextTick, onMounted, Ref, watch } from 'vue';
import scrollAuto from '~/utils/scroll-auto';
import { ContentProps } from '../props';
import { SourceLine } from '../marked/calcSourceLine';
import CodeMirrorUt from '../codemirror';

const useAutoScroll = (
  props: ContentProps,
  html: Ref<string>,
  previewRef: Ref<HTMLDivElement | undefined>,
  htmlRef: Ref<HTMLDivElement | undefined>,
  relatedListRef: Ref<SourceLine[]>,
  codeMirrorUt: Ref<CodeMirrorUt | undefined>
) => {
  const previewOnly = inject('previewOnly') as boolean;

  let clearScrollAuto = () => {};
  let initScrollAuto = () => {};

  // 编译事件
  const htmlChanged = () => {
    nextTick(() => {
      // 更新完毕后判断是否需要重新绑定滚动事件
      if (props.setting.preview && !previewOnly && props.scrollAuto) {
        clearScrollAuto();
        initScrollAuto();
      }
    });
  };

  const settingPreviewChanged = (nVal: boolean) => {
    // 分栏发生变化时，显示分栏时注册同步滚动，隐藏是清除同步滚动
    if (nVal && !previewOnly) {
      nextTick(() => {
        clearScrollAuto();
        const cmScroller = document.querySelector<HTMLDivElement>('.cm-scroller');

        // 需要等到页面挂载完成后再注册，否则不能正确获取到预览dom
        [initScrollAuto, clearScrollAuto] = scrollAuto(
          cmScroller!,
          previewRef.value! || htmlRef.value,
          relatedListRef,
          codeMirrorUt.value!
        );
        initScrollAuto();
      });
    }
  };

  watch(() => html.value, htmlChanged);
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
    const cmScroller = document.querySelector<HTMLDivElement>('.cm-scroller');

    if (!previewOnly && (previewRef.value || htmlRef.value)) {
      [initScrollAuto, clearScrollAuto] = scrollAuto(
        cmScroller!,
        previewRef.value! || htmlRef.value,
        relatedListRef,
        codeMirrorUt.value!
      );
    }

    if (props.scrollAuto) {
      initScrollAuto();
    }
  });
};

export default useAutoScroll;
