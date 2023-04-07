import { ExtractPropTypes, PropType } from 'vue';
import { LooseRequired } from '@vue/shared';
import { HeadList, SettingType, MarkedHeadingId } from '~/type';

export const contentProps = {
  value: {
    type: String as PropType<string>,
    default: ''
  },
  onChange: {
    type: Function as PropType<(v: string) => void>,
    default: () => {}
  },
  setting: {
    type: Object as PropType<SettingType>,
    default: () => ({})
  },
  onHtmlChanged: {
    type: Function as PropType<(h: string) => void>,
    default: () => {}
  },
  onGetCatalog: {
    type: Function as PropType<(list: HeadList[]) => void>,
    default: () => {}
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
  scrollAuto: {
    type: Boolean as PropType<boolean>
  },
  formatCopiedText: {
    type: Function as PropType<(text: string) => string>,
    default: (text: string) => text
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
  noHighlight: {
    type: Boolean as PropType<boolean>
  }
};

export type ContentProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof contentProps>>>
>;
