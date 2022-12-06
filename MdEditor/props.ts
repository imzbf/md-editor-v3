import { PropType, CSSProperties, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import {
  StaticTextDefaultKey,
  ToolbarNames,
  PreviewThemes,
  MarkedHeadingId,
  Themes,
  Footers,
  ChangeEvent,
  SaveEvent,
  UploadImgEvent,
  HtmlChangedEvent,
  GetCatalogEvent,
  ErrorEvent
} from './type';

import { allToolbar, allFooter, defaultEditorId } from './config';

export const editorProps = () => ({
  /**
   * 主题
   *
   * @default 'light'
   */
  modelValue: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   * 主题，支持light和dark
   *
   * @default 'light'
   */
  theme: {
    type: String as PropType<Themes>,
    default: 'light'
  },
  /**
   * 外层类名
   *
   * @default ''
   */
  class: {
    type: String,
    default: ''
  },
  /**
   * 历史记录最长条数
   *
   * @default 10
   */
  historyLength: {
    type: Number as PropType<number>,
    default: 10
  },
  /**
   * input回调事件
   */
  onChange: {
    type: Function as PropType<ChangeEvent>
  },
  /**
   * input回调事件
   */
  onSave: {
    type: Function as PropType<SaveEvent>
  },
  /**
   * 上传图片事件
   */
  onUploadImg: {
    type: Function as PropType<UploadImgEvent>
  },
  /**
   * 是否页面内全屏
   *
   * @default false
   */
  pageFullscreen: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 是否展开预览
   *
   * @default true
   */
  preview: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   * 是否展开html预览
   *
   * @default false
   */
  htmlPreview: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 仅预览模式，不显示toolbar和编辑框
   *
   * @default false
   */
  previewOnly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 预设语言名称
   *
   * @default 'zh-CN'
   */
  language: {
    type: String as PropType<StaticTextDefaultKey | string>,
    default: 'zh-CN'
  },
  /**
   * 工具栏选择显示
   *
   * @default allToolbar
   */
  toolbars: {
    type: Array as PropType<Array<ToolbarNames>>,
    default: allToolbar
  },
  /**
   * 工具栏选择不显示
   *
   * @default []
   */
  toolbarsExclude: {
    type: Array as PropType<Array<ToolbarNames>>,
    default: []
  },
  /**
   * 格式化md
   *
   * @default true
   */
  noPrettier: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * html变化事件
   */
  onHtmlChanged: {
    type: Function as PropType<HtmlChangedEvent>
  },
  /**
   * 获取目录结构
   */
  onGetCatalog: {
    type: Function as PropType<GetCatalogEvent>
  },
  /**
   * 编辑器唯一标识
   *
   * @default 'md-editor-v3'
   */
  editorId: {
    type: String as PropType<string>,
    default: defaultEditorId
  },
  /**
   * 一个tab等于空格数
   *
   * @default 2
   */
  tabWidth: {
    type: Number as PropType<number>,
    default: 2
  },
  /**
   * 预览中代码是否显示行号
   *
   * @default false
   */
  showCodeRowNumber: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 预览内容样式
   *
   * @default 'default'
   */
  previewTheme: {
    type: String as PropType<PreviewThemes>,
    default: 'default'
  },
  /**
   * 编辑器样式
   */
  style: {
    type: Object as PropType<CSSProperties | string>,
    default: () => ({})
  },
  /**
   * 标题的id生成方式
   *
   * @default (text: string) => text
   */
  markedHeadingId: {
    type: Function as PropType<MarkedHeadingId>,
    default: markedHeadingId
  },
  /**
   * 表格预设格子数
   *
   * @default [6, 4]
   */
  tableShape: {
    type: Array as PropType<Array<number>>,
    default: () => [6, 4]
  },
  /**
   * 不使用该mermaid
   *
   * @default false
   */
  noMermaid: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *
   * 不能保证文本正确的情况，在marked编译md文本后通过该方法处理
   * 推荐DOMPurify、sanitize-html
   *
   * @default (text: string) => text
   */
  sanitize: {
    type: Function as PropType<(html: string) => string>,
    default: (html: string) => html
  },
  /**
   * 空提示
   *
   * @default ''
   */
  placeholder: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   * 不使用katex
   *
   * @default false
   */
  noKatex: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 自定义的工具栏列表
   */
  defToolbars: {
    type: [String, Object] as PropType<string | JSX.Element>
  },
  /**
   * 内部错误捕获
   */
  onError: {
    type: Function as PropType<ErrorEvent>
  },
  /**
   * 代码主题
   *
   * @default 'atom'
   */
  codeTheme: {
    type: String as PropType<string>,
    default: 'atom'
  },
  /**
   * 页脚列表显示顺序
   */
  footers: {
    type: Array as PropType<Array<Footers>>,
    default: allFooter
  },
  /**
   * 是否默认激活输入框和预览框同步滚动
   *
   * @default true
   */
  scrollAuto: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   * 自定义的也叫工具组件列表
   */
  defFooters: {
    type: [String, Object] as PropType<string | JSX.Element>
  },
  /**
   * 不插入iconfont链接
   *
   * @default false
   */
  noIconfont: {
    type: Boolean as PropType<boolean>
  },
  /**
   * 复制代码格式化方法
   *
   * @default (text) => text
   */
  formatCopiedText: {
    type: Function as PropType<(text: string) => string>,
    default: (text: string) => text
  },
  /**
   * 是否禁用上传图片
   *
   * @default false
   */
  noUploadImg: {
    type: Boolean as PropType<boolean>
  },
  /**
   * 某些预览主题的代码模块背景是暗色系
   * 将这个属性设置为true，会自动在该主题下的light模式下使用暗色系的代码风格
   *
   * @default true
   */
  codeStyleReverse: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   * 需要自动调整的预览主题
   *
   * @default ['default', 'mk-cute']
   */
  codeStyleReverseList: {
    type: Array as PropType<Array<string>>,
    default: ['default', 'mk-cute']
  },

  /**
   * 文本区域自动获得焦点
   *
   * @default false
   */
  autoFocus: {
    type: Boolean as PropType<boolean>
  },
  /**
   * 禁用文本区域
   *
   * @default false
   */
  disabled: {
    type: Boolean as PropType<boolean>
  },
  /**
   * 文本区域为只读
   *
   * @default false
   */
  readOnly: {
    type: Boolean as PropType<boolean>
  },
  /**
   * 文本区域允许的最大字符数
   */
  maxLength: {
    type: Number as PropType<number>
  }
});

export const markedHeadingId: MarkedHeadingId = (text) => text;

export type EditorProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<ReturnType<typeof editorProps>>>>
>;
