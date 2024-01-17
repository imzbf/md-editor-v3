import { ComputedRef, defineComponent, inject, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { prefix } from '~/config';
import { PreviewThemes } from '~/type';

import { useCopyCode, userZoom, useMarkdownIt } from './composition';
import { contentPreviewProps } from './props';

export type ContentPreviewProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof contentPreviewProps>>>
>;

const ContentPreview = defineComponent({
  name: 'ContentPreview',
  props: contentPreviewProps,
  setup(props: ContentPreviewProps) {
    const editorId = inject('editorId') as string;
    // 预览主题
    const previewTheme = inject<ComputedRef<PreviewThemes>>('previewTheme');
    // 是否显示行号
    const showCodeRowNumber = inject('showCodeRowNumber') as boolean;
    // markdown => html
    const { html, key } = useMarkdownIt(props, props.previewOnly);
    // 复制代码
    useCopyCode(props, html, key);
    // 图片点击放大
    userZoom(props, html);

    return () => {
      return (
        <>
          <div
            id={`${editorId}-preview-wrapper`}
            class={`${prefix}-preview-wrapper`}
            data-show={props.setting.preview}
            key="content-preview-wrapper"
          >
            <div
              key={key.value}
              id={`${editorId}-preview`}
              class={[
                `${prefix}-preview`,
                `${previewTheme?.value}-theme`,
                showCodeRowNumber && `${prefix}-scrn`
              ]}
              innerHTML={html.value}
            />
          </div>
          {!props.previewOnly && (
            <div
              id={`${editorId}-html-wrapper`}
              class={`${prefix}-preview-wrapper`}
              data-show={props.setting.htmlPreview}
              key="html-preview-wrapper"
            >
              <div class={`${prefix}-html`}>{html.value}</div>
            </div>
          )}
        </>
      );
    };
  }
});

export default ContentPreview;
