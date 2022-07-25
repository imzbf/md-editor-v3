import { PropType, CSSProperties, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import {
  StaticTextDefaultKey,
  ToolbarNames,
  HeadList,
  PreviewThemes,
  MarkedHeadingId,
  Themes,
  InnerError,
  Footers
} from './type';

import { allToolbar, allFooter } from './config';

export const editorProps = () => ({
  modelValue: {
    type: String as PropType<string>,
    default: ''
  },
  // 主题，支持light和dark
  theme: {
    type: String as PropType<Themes>,
    default: 'light'
  },
  // 外层扩展类名
  class: {
    type: String,
    default: ''
  },
  historyLength: {
    type: Number as PropType<number>,
    default: 10
  },
  onChange: {
    type: Function as PropType<(v: string) => void>
  },
  onSave: {
    type: Function as PropType<(v: string) => void>
  },
  onUploadImg: {
    type: Function as PropType<
      (files: Array<File>, callBack: (urls: string[]) => void) => void
    >
  },
  pageFullScreen: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  preview: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  htmlPreview: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  previewOnly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  language: {
    type: String as PropType<StaticTextDefaultKey | string>,
    default: 'zh-CN'
  },
  // 工具栏选择显示
  toolbars: {
    type: Array as PropType<Array<ToolbarNames>>,
    default: allToolbar
  },
  // 工具栏选择不显示
  toolbarsExclude: {
    type: Array as PropType<Array<ToolbarNames>>,
    default: []
  },
  noPrettier: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // html变化事件
  onHtmlChanged: {
    type: Function as PropType<(h: string) => void>
  },
  onGetCatalog: {
    type: Function as PropType<(list: HeadList[]) => void>
  },
  editorId: {
    type: String as PropType<string>,
    default: 'md-editor-v3'
  },
  tabWidth: {
    type: Number as PropType<number>,
    default: 2
  },
  // 预览中代码是否显示行号
  showCodeRowNumber: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 预览内容样式
  previewTheme: {
    type: String as PropType<PreviewThemes>,
    default: 'default'
  },
  style: {
    type: Object as PropType<CSSProperties | string>,
    default: () => ({})
  },
  markedHeadingId: {
    type: Function as PropType<MarkedHeadingId>,
    default: markedHeadingId
  },
  // 表格预设格子数
  tableShape: {
    type: Array as PropType<Array<number>>,
    default: () => [6, 4]
  },
  // 不使用该功能
  noMermaid: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  // 不能保证文本正确的情况，在marked编译md文本后通过该方法处理
  // 推荐DOMPurify、sanitize-html
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
  defToolbars: {
    type: [String, Object] as PropType<string | JSX.Element>
  },
  onError: {
    type: Function as PropType<(err: InnerError) => void>
  },
  codeTheme: {
    type: String as PropType<string>,
    default: 'atom'
  },
  footers: {
    type: Array as PropType<Array<Footers>>,
    default: allFooter
  },
  scrollAuto: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  defFooters: {
    type: [String, Object] as PropType<string | JSX.Element>
  },
  noIconfont: {
    type: Boolean as PropType<boolean>
  },
  formatCopiedText: {
    type: Function as PropType<(text: string) => string>,
    default: (text: string) => text
  }
});

export const markedHeadingId: MarkedHeadingId = (text) => text;

export type EditorProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<ReturnType<typeof editorProps>>>>
>;
