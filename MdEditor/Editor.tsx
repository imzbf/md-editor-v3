import { computed, defineComponent, PropType, provide, reactive, Teleport } from 'vue';
import config, { staticTextDefault } from './config';
import { useKeyBoard } from './capi';
import ToolBar from './layouts/Toolbar';
import Content from './layouts/Content';
import bus from './utils/event-bus';

import './styles/index.less';

declare global {
  interface Window {
    hljs: any;
    prettier: any;
    prettierPlugins: any;
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
  revoke?: string;
  next?: string;
  save?: string;
  prettier?: string;
  pageFullscreen?: string;
  fullscreen?: string;
  preview?: string;
  htmlPreview?: string;
  github?: string;
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
  linkModalTips?: {
    title?: string;
    descLable?: string;
    descLablePlaceHolder?: string;
    urlLable?: string;
    UrlLablePlaceHolder?: string;
    buttonOK?: string;
    buttonUpload?: string;
  };
}

export interface StaticTextDefault {
  'zh-CN': StaticTextDefaultValue;
  'en-US': StaticTextDefaultValue;
}

export type StaticTextDefaultKey = keyof StaticTextDefault;

export type ToolbarNames = keyof ToolbarTips;

export interface SettingType {
  pageFullScreen: boolean;
  fullscreen: boolean;
  preview: boolean;
  htmlPreview: boolean;
}

export type PropsType = Readonly<{
  modelValue: string;
  // 内置两种主题，不受外部影响
  theme?: 'light' | 'dark';
  editorClass?: string;
  // 项目中的highlight对象
  hljs?: Record<string, any>;
  // 外部链接
  highlightJs?: string;
  // 外部链接
  highlightCss?: string;
  // 历史记录限制长度
  historyLength?: number;
  onChange?: (v: string) => void;
  onSave?: (v: string) => void;
  onUploadImg?: (files: FileList, callBack: (urls: string[]) => void) => void;
  // 浏览器内全屏
  pageFullScreen?: boolean;
  preview?: boolean;
  htmlPreview?: boolean;
  // 语言设置，默认只支持了中英文
  language?: StaticTextDefaultKey | string;
  // 语言扩展，以标准的形式定义内容，设置language为key值即可替换
  languageUserDefined?: Array<{ [key: string]: StaticTextDefaultValue }>;
  // 工具栏选择显示（隐藏项目，功能仍存在，待考究）
  toolbars?: Array<ToolbarNames>;
  // prettier 是否开启
  prettier?: boolean;
  // prettier CDN链接
  prettierCDN?: string; // 'https://unpkg.com/prettier@2.3.2/standalone.js'
  prettierMDCDN?: string; // 'https://unpkg.com/prettier@2.3.2/parser-markdown.js'
  // 编辑器名称
  editorName?: string;
}>;

export const prefix = 'md';

const props = {
  modelValue: {
    type: String as PropType<string>,
    default: ''
  },
  // 主题，支持light和dark
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light'
  },
  // 外层扩展类名
  editorClass: {
    type: String,
    default: ''
  },
  // TODO 后续设定可行性-外层扩展样式
  // editorStyle: {
  //   type: [Object, String] as PropType<CSSProperties | string>,
  //   default: (): CSSProperties => ({
  //     height: '500px'
  //   })
  // },
  // 如果项目中有使用highlight.js或者没有外网访问权限，可以直接传递实例hljs并且手动导入css
  hljs: {
    type: Object,
    default: null
  },
  // 可以手动提供highlight.js的cdn链接
  highlightJs: {
    type: String as PropType<string>,
    default: 'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.0.1/highlight.min.js'
  },
  highlightCss: {
    type: String as PropType<string>,
    default:
      'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.0.1/styles/atom-one-dark.min.css'
  },
  historyLength: {
    type: Number as PropType<number>,
    default: 10
  },
  onChange: {
    type: Function as PropType<(v: string) => void>
  },
  onSave: {
    type: Function as PropType<(v: string) => void>,
    default: () => () => {}
  },
  onUploadImg: {
    type: Function as PropType<
      (files: FileList, callBack: (urls: string[]) => void) => void
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
  language: {
    type: String as PropType<StaticTextDefaultKey | string>,
    default: 'zh-CN'
  },
  // 语言扩展，以标准的形式定义内容，设置language为key值即可替换
  languageUserDefined: {
    type: Array as PropType<Array<{ [key: string]: StaticTextDefaultValue }>>,
    default: () => []
  },
  // 工具栏选择显示
  toolbars: {
    type: Array as PropType<Array<ToolbarNames>>,
    default: [
      'bold',
      'underline',
      'italic',
      'strikeThrough',
      'title',
      'sub',
      'sup',
      'quote',
      'unorderedList',
      'orderedList',
      'codeRow',
      'code',
      'link',
      'image',
      'table',
      'revoke',
      'next',
      'save',
      'prettier',
      'pageFullscreen',
      'fullscreen',
      'preview',
      'htmlPreview',
      'github'
    ]
  },
  prettier: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  prettierCDN: {
    type: String as PropType<string>,
    default: 'https://unpkg.com/prettier@2.3.2/standalone.js'
  },
  prettierMDCDN: {
    type: String as PropType<string>,
    default: 'https://unpkg.com/prettier@2.3.2/parser-markdown.js'
  },
  editorName: {
    type: String as PropType<string>,
    default: 'editor'
  }
};

export default defineComponent({
  name: 'MDEditor',
  props,
  setup(props, context) {
    useKeyBoard(props, context);

    // 注入高亮src
    provide('highlight', {
      js: props.highlightJs,
      css: props.highlightCss
    });

    // 注入历史设置
    provide('historyLength', props.historyLength);

    // 注入语言设置
    const usedLanguageText = computed(() => {
      const allText: any = {
        ...staticTextDefault,
        ...props.languageUserDefined
      };

      if (allText[props.language]) {
        return allText[props.language];
      } else {
        return staticTextDefault['zh-CN'];
      }
    });

    provide('usedLanguageText', usedLanguageText.value);
    // -end-

    // 注入工具栏
    provide('toolbars', props.toolbars);

    // 注入名称
    provide('editorName', props.editorName);

    bus.on({
      name: 'uploadImage',
      callback(files: FileList, cb: () => void) {
        const insertHanlder = (urls: Array<string>) => {
          urls.forEach((url) => {
            // 利用事件循环机制，保证两次插入分开进行
            setTimeout(() => {
              bus.emit('replace', 'image', {
                desc: '',
                url
              });
            }, 0);
          });

          cb && cb();
        };

        if (props.onUploadImg) {
          props.onUploadImg(files, insertHanlder);
        } else {
          context.emit('onUploadImg', files, insertHanlder);
        }
      }
    });

    const setting = reactive<SettingType>({
      pageFullScreen: props.pageFullScreen,
      fullscreen: false,
      preview: props.preview,
      htmlPreview: props.preview ? false : props.htmlPreview
    });

    const updateSetting = (v: any, k: keyof typeof setting) => {
      setting[k] = v;
      if (k === 'preview' && setting.preview) {
        setting.htmlPreview = false;
      } else if (k === 'htmlPreview' && setting.htmlPreview) {
        setting.preview = false;
      }
    };

    return () => (
      <div
        id={`${prefix}-${props.editorName}`}
        class={[
          prefix,
          props.editorClass,
          props.theme === 'dark' && `${prefix}-dark`,
          setting.fullscreen || setting.pageFullScreen ? `${prefix}-fullscreen` : ''
        ]}
      >
        <ToolBar setting={setting} updateSetting={updateSetting} />
        <Content
          hljs={props.hljs}
          value={props.modelValue}
          onChange={(value: string) => {
            if (props.onChange) {
              props.onChange(value);
            } else {
              context.emit('update:modelValue', value);
            }
          }}
          setting={setting}
        />
        <Teleport to={document.head}>
          <script src={config.iconfontUrl} />
        </Teleport>
        {props.prettier && (
          <Teleport to={document.head}>
            <script src={props.prettierCDN} />
            <script src={props.prettierMDCDN} />
          </Teleport>
        )}
      </div>
    );
  }
});
