import { LooseRequired } from '@vue/shared';
import markdownit from 'markdown-it';
import { Component, ExtractPropTypes, SetupContext, VNode } from 'vue';
import { Extension } from '@codemirror/state';
import { KeyBinding, EditorView } from '@codemirror/view';
import { editorProps, mdPreviewProps } from './props';
import { IconName } from './components/Icon/Icon';
import { ToolDirective } from './utils/content-help';

declare global {
  interface Window {
    hljs: any;
    prettier: any;
    prettierPlugins: any;
    Cropper: any;
    screenfull: any;
    mermaid: any;
    katex: any;
  }
}

export interface ToolbarTips {
  bold?: string;
  underline?: string;
  italic?: string;
  strikeThrough?: string;
  title?: string;
  sub?: string;
  sup?: string;
  quote?: string;
  unorderedList?: string;
  orderedList?: string;
  task?: string;
  codeRow?: string;
  code?: string;
  link?: string;
  image?: string;
  table?: string;
  mermaid?: string;
  katex?: string;
  revoke?: string;
  next?: string;
  save?: string;
  prettier?: string;
  pageFullscreen?: string;
  fullscreen?: string;
  preview?: string;
  previewOnly?: string;
  htmlPreview?: string;
  catalog?: string;
  github?: string;
  '-'?: string;
  '='?: string;
}

export interface StaticTextDefaultValue {
  toolbarTips?: ToolbarTips;
  titleItem?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  };
  imgTitleItem?: {
    link: string;
    upload: string;
    clip2upload: string;
  };
  linkModalTips?: {
    linkTitle?: string;
    imageTitle?: string;
    descLabel?: string;
    descLabelPlaceHolder?: string;
    urlLabel?: string;
    urlLabelPlaceHolder?: string;
    buttonOK?: string;
  };
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  copyCode?: {
    text?: string;
    successTips?: string;
    failTips?: string;
  };
  mermaid?: {
    // 流程图
    flow?: string;
    // 时序图
    sequence?: string;
    // 甘特图
    gantt?: string;
    // 类图
    class?: string;
    // 状态图
    state?: string;
    // 饼图
    pie?: string;
    // 关系图
    relationship?: string;
    // 旅程图
    journey?: string;
  };
  katex?: {
    inline: string;
    block: string;
  };
  footer?: {
    markdownTotal: string;
    scrollAuto: string;
  };
}

export interface StaticTextDefault {
  'zh-CN': StaticTextDefaultValue;
  'en-US': StaticTextDefaultValue;
}

export type StaticTextDefaultKey = keyof StaticTextDefault;

export type ToolbarNames = keyof ToolbarTips | number;

export type Footers = '=' | 'markdownTotal' | 'scrollSwitch' | number;

export interface SettingType {
  pageFullscreen: boolean;
  fullscreen: boolean;
  preview: boolean;
  htmlPreview: boolean;
  previewOnly: boolean;
}

export type Themes = 'light' | 'dark';

/**
 * 预览主题
 *
 * @list ['default', 'github', 'vuepress', 'mk-cute', 'smart-blue', 'cyanosis']
 */
export type PreviewThemes = string;

export interface HeadList {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  active?: boolean;
}

export type MdHeadingId = (text: string, level: number, index: number) => string;

export interface MermaidTemplate {
  /**
   * 流程图
   */
  flow?: string;
  /**
   * 时序图
   */
  sequence?: string;
  /**
   * 甘特图
   */
  gantt?: string;
  /**
   * 类图
   */
  class?: string;
  /**
   * 状态图
   */
  state?: string;
  /**
   * 饼图
   */
  pie?: string;
  /**
   * 关系图
   */
  relationship?: string;
  /**
   * 旅程图
   */
  journey?: string;
}

export interface MarkdownItConfigPlugin {
  type: string;
  plugin: markdownit.PluginWithParams;
  options: any;
}

export interface ConfigOption {
  /**
   * 编辑器内部依赖库
   */
  editorExtensions: {
    highlight?: {
      instance?: any;
      js?: string;
      css?: CodeCss;
    };
    prettier?: {
      prettierInstance?: any;
      parserMarkdownInstance?: any;

      standaloneJs?: string;
      parserMarkdownJs?: string;
    };
    cropper?: {
      instance?: any;
      js?: string;
      css?: string;
    };
    screenfull?: {
      instance?: any;
      js?: string;
    };
    mermaid?: {
      instance?: any;
      js?: string;
    };
    katex?: {
      instance?: any;
      js?: string;
      css?: string;
    };
  };

  /**
   * 对应editorExtensions中的cdn链接标签属性
   *
   * 不要尝试在editorExtensionsAttrs定义script的src\onload\id，link的rel\href\id
   * 它们会被默认值覆盖
   */
  editorExtensionsAttrs: {
    highlight?: {
      js?: Partial<HTMLElementTagNameMap['script']>;
      css?: CodeCssAttrs;
    };
    prettier?: {
      standaloneJs?: Partial<HTMLElementTagNameMap['script']>;
      parserMarkdownJs?: Partial<HTMLElementTagNameMap['script']>;
    };
    cropper?: {
      js?: Partial<HTMLElementTagNameMap['script']>;
      css?: Partial<HTMLElementTagNameMap['link']>;
    };
    screenfull?: {
      js?: Partial<HTMLElementTagNameMap['script']>;
    };
    mermaid?: {
      js?: Partial<HTMLElementTagNameMap['script']>;
    };
    katex?: {
      js?: Partial<HTMLElementTagNameMap['script']>;
      css?: Partial<HTMLElementTagNameMap['link']>;
    };
  };
  editorConfig: {
    /**
     * 自定义提示语言
     */
    languageUserDefined?: { [key: string]: StaticTextDefaultValue };
    /**
     * 自定义内部mermaid模块
     */
    mermaidTemplate?: MermaidTemplate;
    /**
     * 输入渲染延迟（ms）
     */
    renderDelay?: number;
    /**
     * 内部的弹窗、下拉框等内联zIndex
     * @default 20000
     */
    zIndex?: number;
  };
  /**
   * 根据主题和内部默认的codeMirror扩展自定义新的扩展
   *
   * @params theme 当前主题
   * @params innerExtensions 当前主题下的扩展列表
   * [keymap, minimalSetup, markdown, EditorView.lineWrapping, EditorView.updateListener, EditorView.domEventHandlers, oneDark??oneLight]
   * [快捷键, 最低配置, markdown识别, 横向自动换行, 更新事件, dom监听事件, oneDark主题(暗夜模式下), oneLight(默认模式下)]
   *
   * @params keyBindings md-editor-v3内置的快捷键
   */
  codeMirrorExtensions: (
    theme: Themes,
    extensions: Array<Extension>,
    keyBindings: Array<KeyBinding>,
    options: {
      editorId: string;
    }
  ) => Array<Extension>;
  /**
   * 自定义markdown-it核心库扩展、属性等
   */
  markdownItConfig: (
    md: markdownit,
    options: {
      editorId: string;
    }
  ) => void;
  /**
   * 挑选编辑器已预设的markdownIt的扩展
   *
   * @param plugins markdownIt的扩展，带编辑器已设定的属性
   * @returns plugins
   */
  markdownItPlugins: (
    plugins: Array<MarkdownItConfigPlugin>,
    options: {
      editorId: string;
    }
  ) => Array<MarkdownItConfigPlugin>;
  /**
   * mermaid配置项
   *
   * @param base
   * @returns
   */
  mermaidConfig: (base: any) => any;
  /**
   * katex配置
   *
   * @param baseConfig
   * @returns
   */
  katexConfig: (baseConfig: any) => any;
}

/**
 * 扩展编辑器内部功能，包括marked和一些内部依赖实例，如highlight、cropper等
 */
export type Config = (options: Partial<ConfigOption>) => void;

/**
 * 编辑器操作潜在的错误
 */
export interface InnerError {
  name: 'Cropper' | 'fullscreen' | 'prettier' | 'overlength';
  message: string;
  data: any;
}

export interface CodeCss {
  [key: string]: {
    light: string;
    dark: string;
  };
}

export interface CodeCssAttrs {
  [key: string]: {
    light: Partial<HTMLElementTagNameMap['link']>;
    dark: Partial<HTMLElementTagNameMap['link']>;
  };
}

export type UpdateSetting = (k: keyof SettingType, v?: boolean) => void;

export type ChangeEvent = (v: string) => void;
export type SaveEvent = (v: string, h: Promise<string>) => void;

export type UploadImgCallBackParam =
  | string[]
  | Array<{ url: string; alt: string; title: string }>;
export type UploadImgCallBack = (urls: UploadImgCallBackParam) => void;
export type UploadImgEvent = (files: Array<File>, callBack: UploadImgCallBack) => void;

export type HtmlChangedEvent = (h: string) => void;
export type GetCatalogEvent = (list: HeadList[]) => void;
export type ErrorEvent = (err: InnerError) => void;

export interface ExposeEvent {
  pageFullscreen(status: boolean): void;
  fullscreen(status: boolean): void;
  preview(status: boolean): void;
  previewOnly(status: boolean): void;
  htmlPreview(status: boolean): void;
  catalog(status: boolean): void;
}

export type DOMEventHandlers = {
  [e in keyof HTMLElementEventMap]?: (
    event: HTMLElementEventMap[e],
    view: EditorView
  ) => boolean | void;
};

export interface InsertParam {
  // 插入的内容
  targetValue: string;
  // 是否选中插入的内容
  select?: boolean;
  // 选中位置的开始偏移量
  deviationStart?: number;
  // 选中位置的结束偏移量
  deviationEnd?: number;
}
/**
 * 插入的内容的构造函数
 */
export type InsertContentGenerator = (selectedText: string) => InsertParam;

/**
 * 插入内容的通用函数类型
 */
export type Insert = (generate: InsertContentGenerator) => void;

export type FocusOption =
  | 'start'
  | 'end'
  | {
      // 选中的开始位置，默认光标位置
      rangeAnchor?: number;
      // 选中的结束位置，默认光标位置
      rangeHead?: number;
      // 光标的位置
      cursorPos: number;
    };

export interface ExposeParam {
  /**
   * 添加事件监听
   *
   * @param eventName 事件名称
   * @param callBack 事件回调函数
   */
  on<E extends keyof ExposeEvent, C extends ExposeEvent[E]>(
    eventName: E,
    callBack: C
  ): void;

  /**
   * 切换页面内全屏
   *
   * @param status 是否页面全屏
   */
  togglePageFullscreen(status?: boolean): void;

  /**
   * 切换屏幕全屏
   *
   * @param status 是否屏幕全屏
   */
  toggleFullscreen(status?: boolean): void;

  /**
   * 切换是否显示预览
   *
   * @param status 是否显示预览
   */
  togglePreview(status?: boolean): void;

  togglePreviewOnly(status?: boolean): void;

  /**
   * 切换是否显示html预览
   *
   * @param status html预览状态
   */
  toggleHtmlPreview(status?: boolean): void;

  /**
   * 切换是否显示目录
   *
   * @param status 是否显示目录，不设置默认相反
   */
  toggleCatalog(status?: boolean): void;

  /**
   * 触发保存
   */
  triggerSave(): void;

  /**
   * 手动向文本框插入内容
   *
   * @param {Function} generate 构造插入内容方法
   * 构造方法提供「当前选中」的内容为入参
   * 返回「待插入内容」和插入的属性
   * 入参 selectedText 当前选中的内容
   *
   * targetValue     待插入内容
   * select         插入后是否自动选中内容
   * deviationStart 插入后选中位置的开始偏移量
   * deviationEnd   插入后选中位置的结束偏移量
   *
   */
  insert: Insert;

  /**
   * 手动聚焦
   *
   * @param options 聚焦时光标的位置，不提供默认上次失焦时的位置
   */
  focus(options?: FocusOption): void;
  /**
   * 手动重新渲染
   */
  rerender(): void;
  /**
   * 获取当前选中的文本
   */
  getSelectedText(): string | undefined;
  /**
   * 重置已经存在的历史记录
   */
  resetHistory(): void;
  /**
   * codemirror事件
   *
   * @param handlers
   */
  domEventHandlers(handlers: DOMEventHandlers): void;
  /**
   * 执行内部插入命令
   *
   * @param direct
   */
  execCommand(direct: ToolDirective): void;
  /**
   * 获取编辑器实例
   */
  getEditorView(): EditorView | undefined;
}

export type ExposePreviewParam = Pick<ExposeParam, 'rerender'>;

export type EditorProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof editorProps>>>
>;

export type MdPreviewProps = Readonly<
  LooseRequired<Readonly<ExtractPropTypes<typeof mdPreviewProps>>>
>;

export type EditorEmits = Array<
  | 'onChange'
  | 'onSave'
  | 'onUploadImg'
  | 'onHtmlChanged'
  | 'onGetCatalog'
  | 'onError'
  | 'update:modelValue'
  | 'onBlur'
  | 'onFocus'
  | 'onInput'
  | 'onDrop'
  | 'oninputBoxWidthChange'
>;

export type EditorContext = SetupContext<EditorEmits>;

/**
 * 自定义图标的数据类型
 */
export type CustomIcon = {
  [key in IconName]?: {
    component: Component | VNode | string;
    props?: {
      [key: string | number | symbol]: any;
    };
  };
} & {
  copy?: string;
  'collapse-tips'?: string;
};
