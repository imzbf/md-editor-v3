import { inject, nextTick, onMounted, Ref, toRef, watch } from 'vue';
import scrollAuto, { scrollAutoWithScale } from '~/utils/scroll-auto';
import CodeMirrorUt from '../codemirror';
import { ContentProps } from '../props';

const useAutoScroll = (
  props: ContentProps,
  html: Ref<string>,
  codeMirrorUt: Ref<CodeMirrorUt | undefined>
) => {
  const editorId = inject('editorId') as string;

  let clearScrollAuto = () => {};
  let initScrollAuto = () => {};

  // 编译事件
  const rebindEvent = () => {
    clearScrollAuto();

    const rootNode = codeMirrorUt.value?.view.contentDOM.getRootNode() as
      | Document
      | ShadowRoot;
    const cmScroller = rootNode.querySelector<HTMLDivElement>(
      `#${editorId} .cm-scroller`
    );
    const previewEle = rootNode.querySelector<HTMLElement>(
      `[id="${editorId}-preview-wrapper"]`
    );
    const htmlEle = rootNode.querySelector<HTMLElement>(
      `[id="${editorId}-html-wrapper"]`
    );

    if (previewEle || htmlEle) {
      const scrollHandler = previewEle ? scrollAuto : scrollAutoWithScale;
      const cEle = previewEle || htmlEle;

      [initScrollAuto, clearScrollAuto] = scrollHandler(
        cmScroller!,
        cEle!,
        codeMirrorUt.value!
      );

      if (props.scrollAuto) {
        initScrollAuto();
      }
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

  // 编辑状态的仅预览
  watch(
    () => props.setting.previewOnly,
    (po) => {
      if (po) {
        clearScrollAuto();
      } else {
        initScrollAuto();
      }
    }
  );

  onMounted(rebindEvent);
};

export default useAutoScroll;
