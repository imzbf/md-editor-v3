import { createSmoothScroll } from '@vavt/util';
import { defineComponent, ref, inject } from 'vue';
import CustomScrollbar from '~/components/CustomScrollbar';
import { prefix } from '~/config';
import { FocusOption } from '~/type';
import MdCatalog from '~~/MdCatalog';
import { useAutoScroll, useCodeMirror, useFollowCatalog, useResize } from './composition';
import ContentPreview from './ContentPreview';
import { contentProps as props, ContentProps } from './props';

const smoothScroll = createSmoothScroll();

export default defineComponent({
  name: 'MDEditorContent',
  props,
  setup(props: ContentProps, ctx) {
    const editorId = inject('editorId') as string;
    const html = ref<string>('');

    const contentRef = ref<HTMLDivElement>();
    const resizeRef = ref<HTMLDivElement>();

    // 输入框
    const { inputWrapperRef, codeMirrorUt, resetHistory } = useCodeMirror(props);
    const { inputWrapperStyle, resizeOperateStyle } = useResize(
      props,
      contentRef,
      resizeRef
    );
    // 自动滚动
    useAutoScroll(props, html, codeMirrorUt);

    // 跟随目录
    const { onCatalogActive, onMouseenter, onMouseleave } = useFollowCatalog();

    ctx.expose({
      getSelectedText() {
        return codeMirrorUt.value?.getSelectedText();
      },
      focus(options: FocusOption) {
        codeMirrorUt.value?.focus(options);
      },
      resetHistory,
      getEditorView() {
        return codeMirrorUt.value?.view;
      }
    });

    return () => {
      return (
        <div class={`${prefix}-content`}>
          <div class={`${prefix}-content-wrapper`} ref={contentRef}>
            <CustomScrollbar
              alwaysShowTrack
              scrollTarget={`#${editorId} .cm-scroller`}
              style={inputWrapperStyle}
            >
              <div class={`${prefix}-input-wrapper`} ref={inputWrapperRef} />
            </CustomScrollbar>
            {/* 拖拽入口需要保持props.setting变化时就挂载 */}
            {(props.setting.htmlPreview || props.setting.preview) && (
              <div
                class={`${prefix}-resize-operate`}
                style={resizeOperateStyle}
                ref={resizeRef}
              />
            )}
            <CustomScrollbar style={{ flex: 1 }}>
              <ContentPreview
                modelValue={props.modelValue}
                onChange={props.onChange}
                setting={props.setting}
                onHtmlChanged={(html_) => {
                  html.value = html_;
                  props.onHtmlChanged(html_);
                }}
                onGetCatalog={props.onGetCatalog}
                mdHeadingId={props.mdHeadingId}
                noMermaid={props.noMermaid}
                sanitize={props.sanitize}
                noKatex={props.noKatex}
                formatCopiedText={props.formatCopiedText}
                noHighlight={props.noHighlight}
                noImgZoomIn={props.noImgZoomIn}
                sanitizeMermaid={props.sanitizeMermaid}
                codeFoldable={props.codeFoldable}
                autoFoldThreshold={props.autoFoldThreshold}
                onRemount={props.onRemount}
              />
            </CustomScrollbar>
          </div>
          {props.catalogVisible && (
            <CustomScrollbar
              class={`${prefix}-catalog-${props.catalogLayout}`}
              onMouseenter={onMouseenter}
              onMouseleave={onMouseleave}
            >
              <MdCatalog
                theme={props.theme}
                class={`${prefix}-catalog-editor`}
                editorId={editorId}
                mdHeadingId={props.mdHeadingId}
                key="internal-catalog"
                scrollElementOffsetTop={2}
                syncWith={!props.setting.preview ? 'editor' : 'preview'}
                onClick={(e, toc) => {
                  // 如果没有预览区域，就将目录与编辑器同步滚动
                  if (!props.setting.preview && toc.line !== undefined) {
                    e.preventDefault();
                    const view = codeMirrorUt.value?.view;

                    if (view) {
                      const line = view.state.doc.line(toc.line + 1);

                      const top = view.lineBlockAt(line.from)?.top;

                      const scroller = view.scrollDOM;
                      smoothScroll(scroller, top); // 滚动到目标行
                    }
                  }
                }}
                catalogMaxDepth={props.catalogMaxDepth}
                onActive={onCatalogActive}
              />
            </CustomScrollbar>
          )}
        </div>
      );
    };
  }
});
