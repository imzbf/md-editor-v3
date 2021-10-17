import { defineComponent, PropType, reactive, Teleport, watch } from 'vue';
import { Slugger } from 'marked';
import {
  allToolbar,
  highlightUrl,
  iconfontUrl,
  prettierUrl,
  cropperUrl,
  screenfullUrl
} from './config';
import { useKeyBoard, useProvide } from './capi';
import ToolBar from './layouts/Toolbar';
import Content from './layouts/Content';
import bus from './utils/event-bus';

import './styles/index.less';

import '@vavt/markdown-theme/css/all.css';

declare global {
  interface Window {
    hljs: any;
    prettier: any;
    prettierPlugins: any;
    Cropper: any;
    screenfull: any;
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
  linkModalTips?: {
    title?: string;
    descLable?: string;
    descLablePlaceHolder?: string;
    urlLable?: string;
    UrlLablePlaceHolder?: string;
    buttonOK?: string;
    buttonUpload?: string;
    buttonUploadClip?: string;
  };
  clipModalTips?: {
    title?: string;
    buttonUpload?: string;
  };
  copyCode?: {
    text?: string;
    tips?: string;
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

export const prefix = 'md';

export interface HeadList {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export type PreviewThemes = 'default' | 'github' | 'vuepress';

export type MarkedHeading = (
  text: string,
  level: 1 | 2 | 3 | 4 | 5 | 6,
  raw: string,
  slugger: Slugger
) => string;

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
  // 如果项目中有使用highlight.js或者没有外网访问权限，可以直接传递实例hljs并且手动导入css
  hljs: {
    type: Object,
    default: null
  },
  // 可以手动提供highlight.js的cdn链接
  highlightJs: {
    type: String as PropType<string>,
    default: highlightUrl.js
  },
  highlightCss: {
    type: String as PropType<string>,
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
  previewOnly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  language: {
    type: String as PropType<StaticTextDefaultKey | string>,
    default: 'zh-CN'
  },
  // 语言扩展，以标准的形式定义内容，设置language为key值即可替换
  languageUserDefined: {
    type: Object as PropType<{ [key: string]: StaticTextDefaultValue }>,
    default: () => ({})
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
  prettier: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  prettierCDN: {
    type: String as PropType<string>,
    default: prettierUrl.main
  },
  prettierMDCDN: {
    type: String as PropType<string>,
    default: prettierUrl.markdown
  },
  // html变化事件
  onHtmlChanged: {
    type: Function as PropType<(h: string) => void>
  },
  // 图片裁剪对象
  Cropper: {
    type: Function,
    default: null
  },
  cropperCss: {
    type: String as PropType<string>,
    default: cropperUrl.css
  },
  cropperJs: {
    type: String as PropType<string>,
    default: cropperUrl.js
  },
  iconfontJs: {
    type: String as PropType<string>,
    default: iconfontUrl
  },
  onGetCatalog: {
    type: Function as PropType<(list: HeadList[]) => void>
  },
  editorId: {
    type: String as PropType<string>,
    default: () => `mev-${Math.random().toString(36).substr(3)}`
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
  screenfull: {
    type: Object,
    default: null
  },
  screenfullJs: {
    type: String as PropType<string>,
    default: screenfullUrl
  },
  // 预览内容样式
  previewTheme: {
    type: String as PropType<PreviewThemes>,
    default: 'default'
  },
  markedHeading: {
    type: Function as PropType<MarkedHeading>,
    default: (text: string, level: string) =>
      `<h${level} id="${text}"><a href="#${text}">${text}</a></h${level}>`
  }
};

export default defineComponent({
  name: 'MdEditorV3',
  props,
  setup(props, context) {
    // 下面的内容不使用响应式（解构会失去响应式能力）
    // eslint-disable-next-line vue/no-setup-props-destructure
    const {
      hljs,
      previewOnly,
      iconfontJs,
      prettier,
      prettierCDN,
      prettierMDCDN,
      Cropper,
      cropperCss,
      cropperJs,
      editorId,
      screenfull,
      screenfullJs
    } = props;

    // 构建组件第一步先清空event-bus
    // 由于bus是单一实例，会导致重复创建编辑器时，残留旧的监听任务
    // 不在卸载组件时清空的原因是，vue新的内容挂载会在旧的内容卸载之前完成
    bus.clear(editorId);

    // 快捷键监听
    useKeyBoard(props, context);

    // ~~
    useProvide(props);

    // 监听上传图片
    !previewOnly &&
      bus.on(editorId, {
        name: 'uploadImage',
        callback(files: FileList, cb: () => void) {
          const insertHanlder = (urls: Array<string>) => {
            urls.forEach((url) => {
              // 利用事件循环机制，保证两次插入分开进行
              setTimeout(() => {
                bus.emit(editorId, 'replace', 'image', {
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

    // ----编辑器设置----
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

    const bodyOverflowHistory = document.body.style.overflow;
    const adjustBody = () => {
      if (setting.pageFullScreen || setting.fullscreen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = bodyOverflowHistory;
      }
    };

    // 变化是调整一次
    watch(() => [setting.pageFullScreen, setting.fullscreen], adjustBody);
    // 进入时若默认全屏，调整一次
    adjustBody();
    // ----end----
    return () => (
      <div
        id={editorId}
        class={[
          prefix,
          props.editorClass,
          props.theme === 'dark' && `${prefix}-dark`,
          setting.fullscreen || setting.pageFullScreen ? `${prefix}-fullscreen` : '',
          previewOnly && `${prefix}-previewOnly`
        ]}
      >
        {!previewOnly && (
          <ToolBar
            screenfull={screenfull}
            screenfullJs={screenfullJs}
            toolbars={props.toolbars}
            toolbarsExclude={props.toolbarsExclude}
            setting={setting}
            updateSetting={updateSetting}
          />
        )}
        <Content
          hljs={hljs}
          value={props.modelValue}
          onChange={(value: string) => {
            if (props.onChange) {
              props.onChange(value);
            } else {
              context.emit('update:modelValue', value);
            }
          }}
          setting={setting}
          onHtmlChanged={(html: string) => {
            if (props.onHtmlChanged) {
              props.onHtmlChanged(html);
            } else {
              context.emit('onHtmlChanged', html);
            }
          }}
          onGetCatalog={(list: HeadList[]) => {
            if (props.onGetCatalog) {
              props.onGetCatalog(list);
            } else {
              context.emit('onGetCatalog', list);
            }
          }}
          markedHeading={props.markedHeading}
        />
        {!previewOnly && (
          <Teleport to={document.head}>
            <script src={iconfontJs} />
          </Teleport>
        )}
        {prettier && !previewOnly && (
          <Teleport to={document.head}>
            <script src={prettierCDN} />
            <script src={prettierMDCDN} />
          </Teleport>
        )}
        {!previewOnly && Cropper === null && (
          <Teleport to={document.head}>
            <link href={cropperCss} rel="stylesheet" />
            <script src={cropperJs}></script>
          </Teleport>
        )}
      </div>
    );
  }
});
