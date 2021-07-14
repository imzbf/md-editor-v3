import { computed, defineComponent, PropType, provide, reactive, Teleport } from 'vue';
import config, {
  StaticTextDefaultKey,
  StaticTextDefaultValue,
  staticTextDefault
} from './config';
import { useKeyBoard } from './capi';
import ToolBar from './layouts/Toolbar';
import Content from './layouts/Content';
import bus from './utils/event-bus';

import './styles/index.less';

export const prefix = 'md';

export interface SettingType {
  pageFullScreen: boolean;
  fullscreen: boolean;
  preview: boolean;
  htmlPreview: boolean;
}

export type PropsType = Readonly<{
  modelValue: string;
  // TODO 后续开发
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
}>;

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
        id={prefix}
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
      </div>
    );
  }
});
