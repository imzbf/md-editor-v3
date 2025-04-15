import { defineComponent, ref, inject } from 'vue';
import { prefix } from '~/config';
import MdCatalog from '~~/MdCatalog';
import { FocusOption } from '~/type';
import { useAutoScroll, useCodeMirror, useResize } from './composition';
import { contentProps as props, ContentProps } from './props';
import ContentPreview from './ContentPreview';
import { createSmoothScroll } from '@vavt/util';

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
            <div
              class={`${prefix}-input-wrapper`}
              style={inputWrapperStyle}
              ref={inputWrapperRef}
            />
            {/* 拖拽入口需要保持props.setting变化时就挂载 */}
            {(props.setting.htmlPreview || props.setting.preview) && (
              <div
                class={`${prefix}-resize-operate`}
                style={resizeOperateStyle}
                ref={resizeRef}
              />
            )}
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
          </div>
          {props.catalogVisible && (
            <MdCatalog
              theme={props.theme}
              class={`${prefix}-catalog-editor ${prefix}-catalog-${props.catalogLayout}`}
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
            />
          )}
        </div>
      );
    };
  }
});
