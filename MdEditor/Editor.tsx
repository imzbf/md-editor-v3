import { CSSProperties, defineComponent, PropType, provide, Teleport } from 'vue';
import config from './config';
import { useKeyBoard, useStyle } from './capi';
import ToolBar from './layouts/Toolbar';
import Content from './layouts/Content';
import bus from './utils/event-bus';

import './styles/index.less';

export const prefix = 'md';

export type PropsType = Readonly<{
  value: string;
  theme: 'light' | 'dark';
  editorClass: string;
  editorStyle: string | CSSProperties;
  hljs: Record<string, any>;
  highlightJs: string;
  highlightCss: string;
  onChange: (v: string) => void;
  onSave: (v: string) => void;
}>;

const props = {
  value: {
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
  // 外层扩展样式
  editorStyle: {
    type: [Object, String] as PropType<CSSProperties | string>,
    default: (): CSSProperties => ({
      height: '500px'
    })
  },
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
    type: Function as PropType<(file: any, callBack: (url: string) => void) => void>,
    default: () => () => {}
  }
};

export default defineComponent({
  name: 'MDEditor',
  props,
  setup(props, context) {
    const style = useStyle(props);

    useKeyBoard(props as PropsType, context);

    // 注入高亮src
    provide('highlight', {
      js: props.highlightJs,
      css: props.highlightCss
    });

    bus.on({
      name: 'uploadImage',
      callback(files: FileList, callBack: (url: string) => void) {
        props.onUploadImg && props.onUploadImg(files, callBack);
      }
    });

    return () => (
      <div class={[prefix, props.editorClass]} style={style.editor}>
        <ToolBar />
        <Content hljs={props.hljs} value={props.value} onChange={props.onChange} />
        <Teleport to={document.head}>
          <script src={config.iconfontUrl} />
        </Teleport>
      </div>
    );
  }
});
