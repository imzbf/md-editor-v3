import { ExtractPropTypes, PropType } from 'vue';
import { CompletionSource } from '@codemirror/autocomplete';
import { LooseRequired } from '@vue/shared';
import { HeadList, SettingType, MdHeadingId, Themes } from '~/type';

export const contentPreviewProps = {
  modelValue: {
    type: String as PropType<string>,
    default: ''
  },
  setting: {
    type: Object as PropType<SettingType>,
    default: () => ({ preview: true })
  },
  onHtmlChanged: {
    type: Function as PropType<(h: string) => void>,
    default: () => {}
  },
  onGetCatalog: {
    type: Function as PropType<(list: HeadList[]) => void>,
    default: () => {}
  },
  mdHeadingId: {
    type: Function as PropType<MdHeadingId>,
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
  // 不使用该函数功能
  noKatex: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  formatCopiedText: {
    type: Function as PropType<(text: string) => string>,
    default: (text: string) => text
  },
  noHighlight: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  previewOnly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  noImgZoomIn: {
    type: Boolean as PropType<boolean>
  },
  sanitizeMermaid: {
    type: Function as PropType<(h: string) => Promise<string>>
  }
};

export const contentProps = {
  ...contentPreviewProps,
  updateModelValue: {
    type: Function as PropType<(v: string) => void>,
    default: () => {}
  },
  onChange: {
    type: Function as PropType<(v: string) => void>,
    default: () => {}
  },
  placeholder: {
    type: String as PropType<string>,
    default: ''
  },
  scrollAuto: {
    type: Boolean as PropType<boolean>
  },
  autofocus: {
    type: Boolean as PropType<boolean>
  },

  disabled: {
    type: Boolean as PropType<boolean>
  },
  readonly: {
    type: Boolean as PropType<boolean>
  },
  maxlength: {
    type: Number as PropType<number>
  },
  autoDetectCode: {
    type: Boolean as PropType<boolean>
  },
  /**
   * 输入框失去焦点时触发事件
   */
  onBlur: {
    type: Function as PropType<(event: FocusEvent) => void>,
    default: () => {}
  },
  /**
   * 输入框获得焦点时触发事件
   */
  onFocus: {
    type: Function as PropType<(event: FocusEvent) => void>,
    default: () => {}
  },
  noPrettier: {
    type: Boolean as PropType<boolean>
  },
  completions: {
    type: Array as PropType<Array<CompletionSource>>
  },
  catalogVisible: {
    type: Boolean as PropType<boolean>
  },
  theme: {
    type: String as PropType<Themes>,
    default: 'light'
  },
  onInput: {
    type: Function as PropType<(event: Event) => void>
  },
  onDrop: {
    type: Function as PropType<(event: DragEvent) => void>,
    default: () => {}
  },
  inputBoxWitdh: {
    type: String as PropType<string>
  },
  onInputBoxWitdhChange: {
    type: Function as PropType<(width: string) => void>
  }
};

export type ContentProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof contentProps>>>
>;
