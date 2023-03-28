import { defineComponent, inject, ref, ComputedRef } from 'vue';
import { PreviewThemes } from '~/type';
import { prefix } from '~/config';
import { useAutoScroll, useCodeMirror, useMarked, userZoom } from './composition/index';
import { contentProps as props, ContentProps } from './props';

export default defineComponent({
  name: 'MDEditorContent',
  props,
  setup(props: ContentProps) {
    // 仅预览
    const previewOnly = inject('previewOnly') as boolean;
    // 是否显示行号
    const showCodeRowNumber = inject('showCodeRowNumber') as boolean;
    // 预览主题
    const previewTheme = inject<ComputedRef<PreviewThemes>>('previewTheme');

    const editorId = inject('editorId') as string;

    // 预览框
    const previewRef = ref<HTMLDivElement>();
    // html代码预览框
    const htmlRef = ref<HTMLDivElement>();
    //
    const { inputWrapperRef } = useCodeMirror(props);
    // markdown => html
    const html = useMarked(props);
    // 自动滚动
    useAutoScroll(props, html, '.cm-scroller', previewRef, htmlRef);
    // 图片点击放大
    userZoom(props, html);

    return () => {
      return (
        <>
          <div class={`${prefix}-content`}>
            {!previewOnly && (
              <div class={`${prefix}-input-wrapper`} ref={inputWrapperRef}></div>
            )}

            {props.setting.preview && (
              <div
                id={`${editorId}-preview-wrapper`}
                class={`${prefix}-preview-wrapper`}
                ref={previewRef}
                key="content-preview-wrapper"
              >
                <article
                  id={`${editorId}-preview`}
                  class={[
                    `${prefix}-preview`,
                    `${previewTheme?.value}-theme`,
                    showCodeRowNumber && `${prefix}-scrn`
                  ]}
                  innerHTML={html.value}
                />
              </div>
            )}

            {props.setting.htmlPreview && (
              <div
                class={`${prefix}-preview-wrapper`}
                ref={htmlRef}
                key="html-preview-wrapper"
              >
                <div class={`${prefix}-html`}>{html.value}</div>
              </div>
            )}
          </div>
        </>
      );
    };
  }
});
