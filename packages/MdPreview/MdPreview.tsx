import { defineComponent, onBeforeUnmount, ref } from 'vue';
import { useEditorId, useProvidePreview } from '~/composition';
import { prefix } from '~/config';

import ContentPreview from '~/layouts/Content/ContentPreview';
import { mdPreviewProps as props, mdPreviewEmits as emits } from '~/props';
import { HeadList, MdPreviewProps } from '~/type';
import bus from '~/utils/event-bus';
import { useExpose } from './composition/useExpose';

const MdPreview = defineComponent({
  name: 'MdPreview',
  props,
  emits,
  setup(props: MdPreviewProps, ctx) {
    // ID不允许响应式（解构会失去响应式能力），这会扰乱eventbus

    const { noKatex, noMermaid, noHighlight } = props;
    const rootRef = ref<HTMLDivElement>();

    const editorId = useEditorId(props);

    // provide 部分prop
    useProvidePreview(props, {
      rootRef,
      editorId
    });
    // 插入扩展的外链
    // useExpansionPreview(props);

    useExpose(props, ctx, {
      editorId
    });

    // 卸载组件前清空全部事件监听
    onBeforeUnmount(() => {
      bus.clear(editorId);
    });

    const handleChange = (value: string) => {
      props.onChange?.(value);
      ctx.emit('onChange', value);
      ctx.emit('update:modelValue', value);
    };

    const handleHtmlChanged = (html: string) => {
      props.onHtmlChanged?.(html);
      ctx.emit('onHtmlChanged', html);
    };

    const handleGetCatalog = (list: HeadList[]) => {
      props.onGetCatalog?.(list);
      ctx.emit('onGetCatalog', list);
    };

    const handleRemount = () => {
      props.onRemount?.();
      ctx.emit('onRemount');
    };

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
            onChange={handleChange}
            onHtmlChanged={handleHtmlChanged}
            onGetCatalog={handleGetCatalog}
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
            onRemount={handleRemount}
            noEcharts={props.noEcharts}
            previewComponent={props.previewComponent}
          />
        </div>
      );
    };
  }
});

export default MdPreview;
