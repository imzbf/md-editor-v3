import { defineComponent, inject, PropType, ref, ComputedRef } from 'vue';
import {
  HeadList,
  SettingType,
  PreviewThemes,
  MarkedHeadingId,
  MermaidTemplate
} from '../../type';
import {
  useAutoGenrator,
  useAutoScroll,
  useHistory,
  useMarked,
  useMermaid,
  usePasteUpload,
  userZoom
} from './composition';
import { prefix } from '../../config';
import bus from '../../utils/event-bus';

export type EditorContentProps = Readonly<{
  value: string;
  onChange: (v: string) => void;
  setting: SettingType;
  onHtmlChanged: (h: string) => void;
  onGetCatalog: (list: HeadList[]) => void;
  markedHeadingId: MarkedHeadingId;
  // 不使用该功能
  noMermaid?: boolean;
  sanitize: (html: string) => string;
  placeholder: string;
  noKatex?: boolean;
  mermaidTemplate?: MermaidTemplate;
  scrollAuto?: boolean;
}>;

export default defineComponent({
  name: 'MDEditorContent',
  props: {
    value: {
      type: String as PropType<string>,
      default: ''
    },
    onChange: {
      type: Function as PropType<(v: string) => void>,
      default: () => () => {}
    },
    setting: {
      type: Object as PropType<SettingType>,
      default: () => ({})
    },
    onHtmlChanged: {
      type: Function as PropType<(h: string) => void>,
      default: () => () => {}
    },
    onGetCatalog: {
      type: Function as PropType<(list: HeadList[]) => void>,
      default: () => () => {}
    },
    markedHeadingId: {
      type: Function as PropType<MarkedHeadingId>,
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
    placeholder: {
      type: String as PropType<string>,
      default: ''
    },
    // 不使用该函数功能
    noKatex: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    mermaidTemplate: {
      type: Object as PropType<MermaidTemplate>,
      default: () => ({})
    },
    scrollAuto: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props) {
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
    usePasteUpload(textAreaRef);
    // 图片点击放大
    userZoom(html);

    return () => {
      return (
        <>
          <div class={`${prefix}-content`}>
            {!previewOnly && (
              <div class={`${prefix}-input-wrapper`}>
                <textarea
                  id={`${editorId}-textarea`}
                  ref={textAreaRef}
                  value={props.value}
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
                  placeholder={props.placeholder}
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
                <div
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
