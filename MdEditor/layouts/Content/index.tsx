import { defineComponent, Teleport, inject, PropType, ref, ComputedRef } from 'vue';
import { HeadList, SettingType, PreviewThemes, MarkedHeading } from '../../type';
import {
  useAutoGenrator,
  useAutoScroll,
  useHistory,
  useMarked,
  useMermaid,
  usePasteUpload
} from './composition';
import { prefix } from '../../config';

export type EditorContentProps = Readonly<{
  value: string;
  hljs: Record<string, any>;
  onChange: (v: string) => void;
  setting: SettingType;
  onHtmlChanged: (h: string) => void;
  onGetCatalog: (list: HeadList[]) => void;
  markedHeading: MarkedHeading;
  // mermaid实例
  mermaid?: any;
  // mermaid script链接
  mermaidJs: string;
  // 不使用该功能
  noMermaid?: boolean;
  sanitize: (html: string) => string;
  placeholder: string;
  // katex实例
  katex?: any;
  // katex script链接
  katexJs: string;
  katexCss: string;
  noKatex?: boolean;
  extensions?: Array<any>;
}>;

export default defineComponent({
  name: 'MDEditorContent',
  props: {
    value: {
      type: String as PropType<string>,
      default: ''
    },
    hljs: {
      type: Object,
      default: null
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
    markedHeading: {
      type: Function as PropType<MarkedHeading>,
      default: () => (text: string, level: string) =>
        `<h${level} id="${text}"><a href="#${text}">${text}</a></h${level}>`
    },
    mermaid: {
      type: Object
    },
    mermaidJs: {
      type: String as PropType<string>,
      default: ''
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
    katex: {
      type: Object
    },
    // katex script链接
    katexJs: {
      type: String as PropType<string>,
      default: ''
    },
    // katex css链接
    katexCss: {
      type: String as PropType<string>,
      default: ''
    },
    // 不使用该函数功能
    noKatex: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    extensions: {
      type: Array as PropType<Array<any>>
    }
  },
  setup(props) {
    const highlight = inject('highlight') as ComputedRef<{ js: string; css: string }>;
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
    const { html, highlightLoad } = useMarked(props, mermaidData);
    // 自动滚动
    useAutoScroll(props, html, textAreaRef, previewRef, htmlRef);
    // 自动监听生成md内容
    const { selectedText } = useAutoGenrator(props, textAreaRef);
    // 历史记录
    useHistory(props, textAreaRef);
    // 粘贴上传
    usePasteUpload(textAreaRef);

    return () => {
      return (
        <>
          <div class={[`${prefix}-content`]}>
            {!previewOnly && (
              <div class={`${prefix}-input-wrapper`}>
                <textarea
                  id={`${editorId}-textarea`}
                  ref={textAreaRef}
                  value={props.value}
                  onInput={(e) => {
                    // 先清空保存的选中内容，防止异常现象
                    selectedText.value = '';

                    // 触发更新
                    props.onChange((e.target as HTMLTextAreaElement).value);
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
                class={`${prefix}-preview-wrapper`}
                ref={previewRef}
                key="content-preview-wrapper"
              >
                <div
                  id={`${prefix}-preview`}
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
          {props.hljs === null && (
            <Teleport to="head">
              <link rel="stylesheet" href={highlight.value.css} />
              <script src={highlight.value.js} onLoad={highlightLoad} />
            </Teleport>
          )}
        </>
      );
    };
  }
});
