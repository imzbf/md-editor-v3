import { ComputedRef, defineComponent, inject, ExtractPropTypes, PropType } from 'vue';
import { LooseRequired } from '@vue/shared';
import { prefix } from '~/config';
import { HeadList, MdHeadingId, PreviewThemes, SettingType } from '~/type';

import { useCopyCode, userZoom, useMarkdownIt } from './composition';

export const contentPreviewProps = {
  modelValue: {
    type: String as PropType<string>,
    default: ''
  },
  setting: {
    type: Object as PropType<SettingType>,
    default: () => ({})
  },
  onHtmlChanged: {
    type: Function as PropType<(h: string) => void>,
    default: () => {}
  },
  onGetCatalog: {
    type: Function as PropType<(list: HeadList[]) => void>,
    default: () => {}
  },
  mdHeadingId: {
    type: Function as PropType<MdHeadingId>,
    default: () => ''
  },
  noMermaid: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  sanitize: {
    type: Function as PropType<(html: string) => string>,
    default: (html: string) => html
  },
  // 不使用该函数功能
  noKatex: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  formatCopiedText: {
    type: Function as PropType<(text: string) => string>,
    default: (text: string) => text
  },
  noHighlight: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  previewOnly: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

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
    const { html } = useMarkdownIt(props, props.previewOnly);
    // 复制代码
    useCopyCode(props, html);
    // 图片点击放大
    userZoom(props, html);

    return () => {
      return (
        <div
          id={`${editorId}-preview-wrapper`}
          class={`${prefix}-preview-wrapper`}
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
      );
    };
  }
});

export default ContentPreview;
