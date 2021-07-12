import {
  CSSProperties,
  defineComponent,
  PropType,
  provide,
  reactive,
  Teleport
} from 'vue';
import config from './config';
import { useKeyBoard } from './capi';
import ToolBar from './layouts/Toolbar';
import Content from './layouts/Content';
import bus from './utils/event-bus';

import './styles/index.less';

export const prefix = 'md';

export type PropsType = Readonly<{
  value: string;
  'onUpdate:value': () => void;
  theme: 'light' | 'dark';
  editorClass: string;
  editorStyle: string | CSSProperties;
  hljs: Record<string, any>;
  highlightJs: string;
  highlightCss: string;
  onChange: (v: string) => void;
  onSave: (v: string) => void;
  onUploadImg: (files: FileList, callBack: (urls: string[]) => void) => void;
  historyLength: number;
}>;

export interface SettingType {
  pageFullScreen: boolean;
  fullscreen: boolean;
  column: boolean;
}

const props = {
  value: {
    type: String as PropType<string>,
    default: ''
  },
  'onUpdate:value': {
    type: Function as PropType<() => void>
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
  onChange: {
    type: Function as PropType<(v: string) => void>,
    default: () => () => {}
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
  historyLength: {
    type: Number as PropType<number>,
    default: 10
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
      pageFullScreen: false,
      fullscreen: false,
      column: true
    });

    const updateSetting = (v: any, k: keyof typeof setting) => {
      setting[k] = v;
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
          value={props.value}
          onChange={props.onChange}
          setting={setting}
        />
        <Teleport to={document.head}>
          <script src={config.iconfontUrl} />
        </Teleport>
      </div>
    );
  }
});
