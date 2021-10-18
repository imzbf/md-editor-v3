import { defineComponent, Teleport, inject, PropType, ref, ComputedRef } from 'vue';
import {
  HeadList,
  prefix,
  SettingType,
  PreviewThemes,
  MarkedHeading
} from '../../Editor';
import { useAutoGenrator, useAutoScroll, useHistory, useMarked } from './composition';

export type EditorContentProps = Readonly<{
  value: string;
  hljs: Record<string, any>;
  onChange: (v: string) => void;
  setting: SettingType;
  onHtmlChanged: (h: string) => void;
  onGetCatalog: (list: HeadList[]) => void;
  markedHeading: MarkedHeading;
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

    // 翻译md
    const { html, highlightLoad } = useMarked(props);
    // 自动滚动
    useAutoScroll(props, html, textAreaRef, previewRef, htmlRef);
    // 自动监听生成md内容
    const { selectedText } = useAutoGenrator(props, textAreaRef);
    // 历史记录
    !previewOnly && useHistory(props, textAreaRef);

    return () => {
      return (
        <>
          <div class={[`${prefix}-content`]}>
            {!previewOnly && (
              <div class={[`${prefix}-input-wrapper`]}>
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
                />
              </div>
            )}
            {props.setting.preview && (
              <div
                ref={previewRef}
                class={[
                  `${prefix}-preview`,
                  `${previewTheme?.value}-theme`,
                  showCodeRowNumber && `${prefix}-scrn`
                ]}
                innerHTML={html.value}
              />
            )}
            {props.setting.htmlPreview && (
              <>
                <div ref={htmlRef} class={`${prefix}-html`}>
                  {html.value}
                </div>
              </>
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
