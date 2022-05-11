import type { marked, Renderer } from 'marked';

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
    title?: string;
    descLable?: string;
    descLablePlaceHolder?: string;
    urlLable?: string;
    UrlLablePlaceHolder?: string;
    buttonOK?: string;
  };
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  copyCode?: {
    text?: string;
    tips?: string;
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
}

export interface StaticTextDefault {
  'zh-CN': StaticTextDefaultValue;
  'en-US': StaticTextDefaultValue;
}

export type StaticTextDefaultKey = keyof StaticTextDefault;

export type ToolbarNames = keyof ToolbarTips | number;

export interface SettingType {
  pageFullScreen: boolean;
  fullscreen: boolean;
  preview: boolean;
  htmlPreview: boolean;
}

export type Themes = 'light' | 'dark';

export type PreviewThemes = string; // 'default' | 'github' | 'vuepress';

export interface HeadList {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

// marked heading方法
// export type MarkedHeading = (
//   text: string,
//   level: 1 | 2 | 3 | 4 | 5 | 6,
//   raw: string,
//   // marked@2.1.3
//   slugger: {
//     seen: { [slugValue: string]: number };
//     slug(
//       value: string,
//       options?: {
//         dryrun: boolean;
//       }
//     ): string;
//   }
// ) => string;

export type MarkedHeadingId = (text: string, level: number) => string;

// export type MarkedImage = (href: string, title: string, desc: string) => string;

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

export interface ConfigOption {
  /**
   * 覆盖编辑器默认的renderer属性
   * @see https://marked.js.org/using_pro#renderer
   */
  markedRenderer?: (renderer: Renderer) => Renderer;
  /**
   * 自定义 marked 扩展
   * @see https://marked.js.org/using_pro#extensions
   */
  markedExtensions?: Array<marked.TokenizerExtension & marked.RendererExtension>;
  /**
   * 自定义 marked option，不推荐在这么覆盖renderer，这会导致内部逻辑混乱！
   * @see https://marked.js.org/using_advanced#options
   */
  markedOptions?: marked.MarkedOptions;
  /**
   * 编辑器内部依赖库
   */
  editorExtensions?: {
    highlight?: {
      instance?: any;
      js?: string;
      css?: CodeCss;
    };
    prettier?: {
      standaloneJs?: string;
      parserMarkdownJs?: string;
    };
    cropper?: {
      instance?: any;
      js?: string;
      css?: string;
    };
    iconfont?: string;
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
  editorConfig?: {
    /**
     * 自定义提示语言
     */
    languageUserDefined?: { [key: string]: StaticTextDefaultValue };
    /**
     * 自定义内部mermaid模块
     */
    mermaidTemplate?: MermaidTemplate;
  };
}

/**
 * 扩展编辑器内部功能，包括marked和一些内部依赖实例，如highlight、cropper等
 */
export type Config = (options: ConfigOption) => void;

/**
 * 编辑器操作潜在的错误
 */
export interface InnerError {
  name: string;
  message: string;
}

export interface CodeCss {
  [key: string]: {
    light: string;
    dark: string;
  };
}
