import { PropType, CSSProperties, VNode } from 'vue';
import { CompletionSource } from '@codemirror/autocomplete';
import {
  StaticTextDefaultKey,
  ToolbarNames,
  PreviewThemes,
  MdHeadingId,
  Themes,
  Footers,
  ChangeEvent,
  SaveEvent,
  UploadImgEvent,
  HtmlChangedEvent,
  GetCatalogEvent,
  ErrorEvent,
  EditorEmits,
  CustomIcon
} from './type';

import { allToolbar, allFooter } from './config';

export const mdHeadingId: MdHeadingId = (text) => text;

export const mdPreviewProps = {
  /**
   * markdown content.
   *
   * @default ''
   */
  modelValue: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   * input回调事件
   */
  onChange: {
    type: Function as PropType<ChangeEvent>,
    default: undefined
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
   * 预设语言名称
   *
   * @default 'zh-CN'
   */
  language: {
    type: String as PropType<StaticTextDefaultKey | string>,
    default: 'zh-CN'
  },
  /**
   * html变化事件
   */
  onHtmlChanged: {
    type: Function as PropType<HtmlChangedEvent>,
    default: undefined
  },
  /**
   * 获取目录结构
   */
  onGetCatalog: {
    type: Function as PropType<GetCatalogEvent>,
    default: undefined
  },
  /**
   * 编辑器唯一标识
   *
   * @default 'md-editor-v3'
   * @deprecated 5.x版本开始使用 id 替换
   */
  editorId: {
    type: String as PropType<string>,
    default: undefined
  },
  /**
   * 5.x版本开始 editorId 的替换
   *
   * @default 'md-editor-v3'
   */
  id: {
    type: String as PropType<string>,
    default: undefined
  },
  /**
   * 预览中代码是否显示行号
   *
   * @default true
   */
  showCodeRowNumber: {
    type: Boolean as PropType<boolean>,
    default: true
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
  mdHeadingId: {
    type: Function as PropType<MdHeadingId>,
    default: mdHeadingId
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
   * 不使用该mermaid
   *
   * @default false
   */
  noMermaid: {
    type: Boolean as PropType<boolean>,
    default: false
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
   * 代码主题
   *
   * @default 'atom'
   */
  codeTheme: {
    type: String as PropType<string>,
    default: 'atom'
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
  noHighlight: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 是否关闭编辑器默认的放大缩小功能
   */
  noImgZoomIn: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 自定义的图标
   */
  customIcon: {
    type: Object as PropType<CustomIcon>,
    default: {}
  },
  sanitizeMermaid: {
    type: Function as PropType<(h: string) => Promise<string>>,
    default: (h: string) => Promise.resolve(h)
  },
  /**
   * 是否开启折叠代码功能
   * 不开启会使用div标签替代details标签
   *
   * @default true
   */
  codeFoldable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   * 触发自动折叠代码的行数阈值
   *
   * @default 30
   */

  autoFoldThreshold: {
    type: Number as PropType<number>,
    default: 30
  },
  /**
   * 内容重新挂载事件
   *
   * 相比起onHtmlChanged，onRemount会在重新挂载后触发
   */
  onRemount: {
    type: Function as PropType<() => void>,
    default: undefined
  }
};

export const editorProps = {
  ...mdPreviewProps,

  /**
   * input回调事件
   */
  onSave: {
    type: Function as PropType<SaveEvent>,
    default: undefined
  },
  /**
   * 上传图片事件
   */
  onUploadImg: {
    type: Function as PropType<UploadImgEvent>,
    default: undefined
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
   * @4.0.0开始移除该设置，使用组件MdPreview替换
   *
   * @default false
   */
  // previewOnly: {
  //   type: Boolean as PropType<boolean>,
  //   default: false
  // },

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
   * 一个tab等于空格数
   *
   * @default 2
   */
  tabWidth: {
    type: Number as PropType<number>,
    default: 2
  },

  /**
   * 表格预设格子数
   *
   * 也可以是[6, 4, 10, 8]
   *
   * @default [6, 4]
   */
  tableShape: {
    type: Array as PropType<Array<number>>,
    default: [6, 4]
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
   * 自定义的工具栏列表
   */
  defToolbars: {
    type: [String, Object] as PropType<string | VNode>,
    default: undefined
  },
  /**
   * 内部错误捕获
   */
  onError: {
    type: Function as PropType<ErrorEvent>,
    default: undefined
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
    type: [String, Object] as PropType<string | VNode>,
    default: undefined
  },

  /**
   * 是否禁用上传图片
   *
   * @default false
   */
  noUploadImg: {
    type: Boolean as PropType<boolean>,
    default: false
  },

  /**
   * 文本区域自动获得焦点
   *
   * @default false
   */
  autoFocus: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 禁用文本区域
   *
   * @default false
   */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 文本区域为只读
   *
   * @default false
   */
  readOnly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 文本区域允许的最大字符数
   */
  maxLength: {
    type: Number as PropType<number>,
    default: undefined
  },
  /**
   * 是否启用自动识别粘贴代码类别
   * 目前支持 vscode 复制的代码识别
   *
   * @default false
   */
  autoDetectCode: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 输入框失去焦点时触发事件
   */
  onBlur: {
    type: Function as PropType<(event: FocusEvent) => void>,
    default: undefined
  },
  /**
   * 输入框获得焦点时触发事件
   */
  onFocus: {
    type: Function as PropType<(event: FocusEvent) => void>,
    default: undefined
  },
  /**
   * @codemirror/autocomplete匹配关键词的方法列表
   *
   * 它会被像下面这样嵌入编辑器
   *
   * import { autocompletion } from '@codemirror/autocomplete';
   * autocompletion({
   *   override: [...completions]
   * })
   */
  completions: {
    type: Array as PropType<Array<CompletionSource>>,
    default: undefined
  },
  /**
   * 是否在工具栏下面显示对应的文字名称
   *
   * @default false
   */
  showToolbarName: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * 字符输入事件
   */
  onInput: {
    type: Function as PropType<(event: Event) => void>,
    default: undefined
  },
  onDrop: {
    type: Function as PropType<(event: DragEvent) => void>,
    default: undefined
  },
  /**
   * 输入框的默认宽度
   *
   * @example '100px'/'50%'
   * @default '50%
   */
  inputBoxWidth: {
    type: String as PropType<string>,
    default: '50%'
  },
  /**
   * 输入框宽度变化事件
   */
  oninputBoxWidthChange: {
    type: Function as PropType<(width: string) => void>,
    default: undefined
  },
  /**
   * 替换粘贴的图片链接
   *
   * @param t 图片链接
   * @returns
   */
  transformImgUrl: {
    type: Function as PropType<(t: string) => string | Promise<string>>,
    default: (t: string) => t
  },
  /**
   * 内置的目录显示的状态
   *
   * 'fixed': 悬浮在内容上方
   * 'flat': 展示在右侧
   *
   * \>=5.3.0
   *
   * @default 'fixed'
   */
  catalogLayout: {
    type: String as PropType<'fixed' | 'flat'>,
    default: 'fixed'
  }
};

export const mdPreviewEmits: EditorEmits = [
  'onHtmlChanged',
  'onGetCatalog',
  'onChange',
  'update:modelValue'
];

export const editorEmits: EditorEmits = [
  ...mdPreviewEmits,
  'onSave',
  'onUploadImg',
  'onError',
  'onBlur',
  'onFocus',
  'onInput',
  'onDrop',
  'oninputBoxWidthChange',
  'onRemount'
];
