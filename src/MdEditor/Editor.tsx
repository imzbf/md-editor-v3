import { CSSProperties, defineComponent, onMounted, PropType, reactive } from 'vue';
import config from './config';
import { useStyle } from './capi';
import ToolBar from './components/Toolbar';

import './styles/index.less';

export const prefix: string = 'md-editor';

const props = {
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
    default: () => ({
      height: '300px'
    })
  },
  // 页面跳转是否清除组件影响，这样会移除向页面添加的内容以及监听事件
  clearEffect: {
    type: Boolean,
    default: false
  }
};

let IconFontScript: HTMLScriptElement;

export default defineComponent({
  name: 'MDEditor',
  props,
  setup(props) {
    const data = reactive({
      iconLoaded: false
    });

    const style = useStyle(props);

    onMounted(() => {
      // 放到mounted中执行，防止ssr报错
      IconFontScript = document.createElement('script');
      IconFontScript.id = config.iconScriptId;
      IconFontScript.src = config.iconfontUrl;
      IconFontScript.addEventListener('load', () => {
        data.iconLoaded = true;
      });
      document.head.appendChild(IconFontScript);
    });

    return () => (
      <div class={[prefix, props.editorClass]} style={style.editor}>
        <ToolBar />
      </div>
    );
  }
});
