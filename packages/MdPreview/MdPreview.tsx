import { defineComponent, onBeforeUnmount } from 'vue';
import { prefix } from '~/config';
import bus from '~/utils/event-bus';
import { useProvidePreview, useExpansionPreview } from '~/composition';

import ContentPreview from '~/layouts/Content/ContentPreview';
import { MdPreviewProps } from '~/type';
import { mdPreviewProps as props, mdPreviewEmits as emits } from '~/props';

const MdPreview = defineComponent({
  name: 'MdPreview',
  props,
  emits,
  setup(props: MdPreviewProps, ctx) {
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
            onHtmlChanged={(html) => {
              if (props.onHtmlChanged) {
                props.onHtmlChanged(html);
              } else {
                ctx.emit('onHtmlChanged', html);
              }
            }}
            onGetCatalog={(list) => {
              if (props.onGetCatalog) {
                props.onGetCatalog(list);
              } else {
                ctx.emit('onGetCatalog', list);
              }
            }}
            mdHeadingId={props.mdHeadingId}
            noMermaid={noMermaid}
            sanitize={props.sanitize}
            noKatex={noKatex}
            formatCopiedText={props.formatCopiedText}
            noHighlight={noHighlight}
            noImgZoomIn={props.noImgZoomIn}
            previewOnly
          />
        </div>
      );
    };
  }
});

export default MdPreview;
