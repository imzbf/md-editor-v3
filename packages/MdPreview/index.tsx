import { defineComponent, onBeforeUnmount } from 'vue';
import { prefix } from '~/config';
import bus from '~/utils/event-bus';
import { useProvidePreview, useExpansionPreview } from '~/composition';

import ContentPreview from '~/layouts/Content/ContentPreview';
import { MdPreviewProps } from '~/type';
import { mdPreviewProps as props } from '~/props';

import '~/styles/index.less';
import '@vavt/markdown-theme/css/all.css';

const MdPreview = defineComponent({
  name: 'MdPreview',
  props,
  setup(props: MdPreviewProps) {
    // ID不允许响应式（解构会失去响应式能力），这会扰乱eventbus
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { editorId, noKatex, noMermaid, noHighlight } = props;

    // provide 部分prop
    useProvidePreview(props);
    // 插入扩展的外链
    useExpansionPreview(props);
    // 卸载组件前清空全部事件监听
    onBeforeUnmount(() => {
      bus.clear(editorId);
    });

    return () => {
      return (
        <div
          id={editorId}
          class={[
            prefix,
            props.class,
            props.theme === 'dark' && `${prefix}-dark`,
            `${prefix}-previewOnly`
          ]}
          style={props.style}
        >
          <ContentPreview
            modelValue={props.modelValue}
            onHtmlChanged={props.onHtmlChanged}
            onGetCatalog={props.onGetCatalog}
            mdHeadingId={props.mdHeadingId}
            noMermaid={noMermaid}
            sanitize={props.sanitize}
            noKatex={noKatex}
            formatCopiedText={props.formatCopiedText}
            noHighlight={noHighlight}
            previewOnly
          />
        </div>
      );
    };
  }
});

export default MdPreview;
