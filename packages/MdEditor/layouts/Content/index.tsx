import { createSmoothScroll } from '@vavt/util';
import { defineComponent, ref, inject, ComputedRef, computed } from 'vue';
import CustomScrollbar from '~/components/CustomScrollbar';
import { prefix } from '~/config';
import { FocusOption, SettingType, Themes } from '~/type';
import MdCatalog from '~~/MdCatalog';
import { useAutoScroll, useCodeMirror, useFollowCatalog, useResize } from './composition';
import ContentPreview from './ContentPreview';
import { contentProps as props, ContentProps } from './props';

const smoothScroll = createSmoothScroll();

const PREVIEW_SCROLLBAR_STYLE = { flex: 1 };

export default defineComponent({
  name: 'MDEditorContent',
  props,
  setup(props: ContentProps, ctx) {
    const editorId = inject('editorId') as string;
    const catalogVisible = inject('catalogVisible') as ComputedRef<boolean>;
    const theme = inject('theme') as ComputedRef<Themes>;
    const setting = inject('setting') as ComputedRef<SettingType>;

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

    const handleCatalogClick = (
      e: MouseEvent,
      toc: { line?: number; [key: string]: any }
    ) => {
      // 如果没有预览区域，就将目录与编辑器同步滚动
      if (!setting.value.preview && toc.line !== undefined) {
        e.preventDefault();
        const view = codeMirrorUt.value?.view;

        if (view) {
          const line = view.state.doc.line(toc.line + 1);

          const top = view.lineBlockAt(line.from)?.top;

          const scroller = view.scrollDOM;
          smoothScroll(scroller, top); // 滚动到目标行
        }
      }
    };

    // 优化：缓存同步模式
    const syncWith = computed(() => (!setting.value.preview ? 'editor' : 'preview'));

    // 优化：提取 ContentPreview 的事件处理器
    const handleHtmlChanged = (html_: string) => {
      html.value = html_;
      props.onHtmlChanged(html_);
    };

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
            {/* 拖拽入口需要保持setting变化时就挂载 */}
            {(setting.value.htmlPreview || setting.value.preview) && (
              <div
                class={`${prefix}-resize-operate`}
                style={resizeOperateStyle}
                ref={resizeRef}
              />
            )}
            <CustomScrollbar style={PREVIEW_SCROLLBAR_STYLE}>
              <ContentPreview
                modelValue={props.modelValue}
                onChange={props.onChange}
                onHtmlChanged={handleHtmlChanged}
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
                previewComponent={props.previewComponent}
              />
            </CustomScrollbar>
          </div>
          {catalogVisible.value && (
            <CustomScrollbar
              class={`${prefix}-catalog-${props.catalogLayout}`}
              onMouseenter={onMouseenter}
              onMouseleave={onMouseleave}
            >
              <MdCatalog
                theme={theme.value}
                class={`${prefix}-catalog-editor`}
                editorId={editorId}
                mdHeadingId={props.mdHeadingId}
                key="internal-catalog"
                scrollElementOffsetTop={2}
                syncWith={syncWith.value}
                onClick={handleCatalogClick}
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
