import { defineComponent, inject, ref, ComputedRef } from 'vue';
import { PreviewThemes } from '../../type';
import {
  useAutoGenrator,
  useAutoScroll,
  useHistory,
  useMarked,
  useMermaid,
  usePasteUpload,
  userZoom,
  useAttach
} from './composition';
import { prefix } from '../../config';
import bus from '../../utils/event-bus';
import { omit } from '../../utils';
import { contentProps, ContentProps } from './props';

export default defineComponent({
  name: 'MDEditorContent',
  props: contentProps(),
  setup(props: ContentProps) {
    // 输入状态，在输入中文等时，暂停保存
    const completeStatus = ref(true);
    // 仅预览
    const previewOnly = inject('previewOnly') as boolean;
    // 是否显示行号
    const showCodeRowNumber = inject('showCodeRowNumber') as boolean;
    // 预览主题
    const previewTheme = inject<ComputedRef<PreviewThemes>>('previewTheme');

    const editorId = inject('editorId') as string;

    // 输入框
    const textAreaRef = ref<HTMLTextAreaElement>();
    // 预览框
    const previewRef = ref<HTMLDivElement>();
    // html代码预览框
    const htmlRef = ref<HTMLDivElement>();
    // mermaid图表
    const mermaidData = useMermaid(props);
    // markdown => html
    const { html } = useMarked(props, mermaidData);
    // 自动滚动
    useAutoScroll(props, html, textAreaRef, previewRef, htmlRef);
    // 自动监听生成md内容
    useAutoGenrator(props, textAreaRef);
    // 历史记录
    useHistory(props, textAreaRef, completeStatus);
    // 粘贴上传
    usePasteUpload(props, textAreaRef);
    // 图片点击放大
    userZoom(props, html);

    // 附带的设置
    useAttach(textAreaRef);

    return () => {
      // 原生属性
      const attrs = omit(props, [
        'formatCopiedText',
        'markedHeadingId',
        'noKatex',
        'noMermaid',
        'onChange',
        'onGetCatalog',
        'onHtmlChanged',
        'sanitize',
        'scrollAuto',
        'setting',
        'autoDetectCode'
      ]);

      return (
        <>
          <div class={`${prefix}-content`}>
            {!previewOnly && (
              <div class={`${prefix}-input-wrapper`}>
                <textarea
                  {...attrs}
                  id={`${editorId}-textarea`}
                  ref={textAreaRef}
                  onBlur={() => {
                    // 失焦自动保存当前选中内容
                    bus.emit(editorId, 'selectTextChange');
                  }}
                  onKeydown={() => {
                    bus.emit(editorId, 'saveHistoryPos', true);
                  }}
                  onCompositionstart={() => {
                    completeStatus.value = false;
                  }}
                  onInput={(e) => {
                    // 触发更新
                    props.onChange((e.target as HTMLTextAreaElement).value);
                  }}
                  onCompositionend={() => {
                    completeStatus.value = true;
                  }}
                  class={[
                    props.setting.preview || props.setting.htmlPreview
                      ? ''
                      : 'textarea-only'
                  ]}
                />
              </div>
            )}

            {props.setting.preview && (
              <div
                id={`${editorId}-preview-wrapper`}
                class={`${prefix}-preview-wrapper`}
                ref={previewRef}
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
            )}

            {props.setting.htmlPreview && (
              <div
                class={`${prefix}-preview-wrapper`}
                ref={htmlRef}
                key="html-preview-wrapper"
              >
                <div class={`${prefix}-html`}>{html.value}</div>
              </div>
            )}
          </div>
        </>
      );
    };
  }
});
