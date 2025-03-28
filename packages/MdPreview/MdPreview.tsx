import { defineComponent, onBeforeUnmount, ref } from 'vue';
import { prefix } from '~/config';
import bus from '~/utils/event-bus';
import { useProvidePreview } from '~/composition';

import ContentPreview from '~/layouts/Content/ContentPreview';
import { MdPreviewProps } from '~/type';
import { mdPreviewProps as props, mdPreviewEmits as emits } from '~/props';
import { useExpose } from './composition/useExpose';

const MdPreview = defineComponent({
  name: 'MdPreview',
  props,
  emits,
  setup(props: MdPreviewProps, ctx) {
    // ID不允许响应式（解构会失去响应式能力），这会扰乱eventbus

    const { noKatex, noMermaid, noHighlight } = props;
    const rootRef = ref<HTMLDivElement>();
    // provide 部分prop
    const { editorId } = useProvidePreview(props, rootRef);
    // 插入扩展的外链
    // useExpansionPreview(props);

    useExpose(props, ctx, {
      editorId
    });

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
          ref={rootRef}
        >
          <ContentPreview
            modelValue={props.modelValue}
            onChange={(value) => {
              props.onChange?.(value);
              ctx.emit('onChange', value);
              ctx.emit('update:modelValue', value);
            }}
            onHtmlChanged={(html) => {
              props.onHtmlChanged?.(html);
              ctx.emit('onHtmlChanged', html);
            }}
            onGetCatalog={(list) => {
              props.onGetCatalog?.(list);
              ctx.emit('onGetCatalog', list);
            }}
            mdHeadingId={props.mdHeadingId}
            noMermaid={noMermaid}
            sanitize={props.sanitize}
            noKatex={noKatex}
            formatCopiedText={props.formatCopiedText}
            noHighlight={noHighlight}
            noImgZoomIn={props.noImgZoomIn}
            previewOnly
            sanitizeMermaid={props.sanitizeMermaid}
            codeFoldable={props.codeFoldable}
            autoFoldThreshold={props.autoFoldThreshold}
            onRemount={() => {
              props.onRemount?.();
              ctx.emit('onRemount');
            }}
          />
        </div>
      );
    };
  }
});

export default MdPreview;
