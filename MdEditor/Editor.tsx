import { defineComponent, PropType, provide, reactive, Teleport } from 'vue';
import config from './config';
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
  html: boolean;
}

export type PropsType = Readonly<{
  modelValue: string;
  // TODO 后续开发
  theme: 'light' | 'dark';
  editorClass: string;
  // 项目中的highlight对象
  hljs: Record<string, any>;
  // 外部链接
  highlightJs: string;
  // 外部链接
  highlightCss: string;
  // 历史记录限制长度
  historyLength: number;
  onChange: (v: string) => void;
  onSave: (v: string) => void;
  onUploadImg: (files: FileList, callBack: (urls: string[]) => void) => void;
  pageFullScreen: boolean;
  preview: boolean;
  html: boolean;
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
    >,
    default: () => () => {}
  },
  pageFullScreen: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  preview: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  html: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

export default defineComponent({
  name: 'MDEditor',
  props,
  setup(props, context) {
    useKeyBoard(props as PropsType, context);

    // 注入高亮src
    provide('highlight', {
      js: props.highlightJs,
      css: props.highlightCss
    });

    // 注入历史设置
    provide('historyLength', props.historyLength);

    bus.on({
      name: 'uploadImage',
      callback(files: FileList, callBack: (urls: string[]) => void) {
        props.onUploadImg && props.onUploadImg(files, callBack);
      }
    });

    const setting = reactive<SettingType>({
      pageFullScreen: props.pageFullScreen,
      fullscreen: false,
      preview: props.preview,
      html: props.preview ? false : props.html
    });

    const updateSetting = (v: any, k: keyof typeof setting) => {
      setting[k] = v;
      if (k === 'preview' && setting.preview) {
        setting.html = false;
      } else if (k === 'html' && setting.html) {
        setting.preview = false;
      }
    };

    return () => (
      <div
        class={[
          prefix,
          props.editorClass,
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
