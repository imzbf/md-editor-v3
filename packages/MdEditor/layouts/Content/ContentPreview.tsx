import { defineComponent, inject, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { prefix } from '~/config';

import {
  useCopyCode,
  userZoom,
  useMarkdownIt,
  useTaskState,
  useRemount
} from './composition';
import { contentPreviewProps } from './props';
import UpdateOnDemand from './UpdateOnDemand';

export type ContentPreviewProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof contentPreviewProps>>>
>;

const ContentPreview = defineComponent({
  name: 'ContentPreview',
  props: contentPreviewProps,
  setup(props: ContentPreviewProps) {
    const editorId = inject('editorId') as string;

    // markdown => html
    const { html, key } = useMarkdownIt(props, props.previewOnly);
    // 复制代码
    useCopyCode(props, html, key);
    // 图片点击放大
    userZoom(props, html);
    // 任务状态
    useTaskState(props, html);
    // 标准的重新渲染事件，能够正确获取到html
    useRemount(props, html, key);

    return () => {
      return (
        <>
          {props.setting.preview && (
            <div
              id={`${editorId}-preview-wrapper`}
              class={`${prefix}-preview-wrapper`}
              key="content-preview-wrapper"
            >
              <UpdateOnDemand key={key.value} html={html.value} />
            </div>
          )}

          {!props.previewOnly && props.setting.htmlPreview && (
            <div
              id={`${editorId}-html-wrapper`}
              class={`${prefix}-preview-wrapper`}
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
