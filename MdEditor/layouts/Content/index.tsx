import {
  defineComponent,
  computed,
  onMounted,
  Teleport,
  inject,
  PropType,
  watch,
  nextTick,
  ref,
  watchEffect
} from 'vue';
import { prefix } from '../../Editor';
import marked from 'marked';
import copy from 'copy-to-clipboard';

declare global {
  interface Window {
    hljs: any;
  }
}

// 向页面代码块注入复制按钮
const initCopyEntry = () => {
  document.querySelectorAll(`.${prefix}-preview-wrapper pre`).forEach((pre: Element) => {
    const copyButton = document.createElement('span');
    copyButton.setAttribute('class', 'copy-button');
    copyButton.innerText = '复制代码';
    copyButton.addEventListener('click', () => {
      copy((pre.querySelector('code') as HTMLElement).innerText);
    });
    pre.appendChild(copyButton);
  });
};

export default defineComponent({
  name: 'MDEditorContent',
  props: {
    value: {
      type: String as PropType<string>,
      default: ''
    },
    hljs: {
      type: Object,
      default: null
    },
    onChange: {
      type: Function as PropType<(e: Event) => void>,
      default: () => () => {}
    }
  },
  setup(props) {
    const highlightInited = ref<boolean>(props.hljs !== null);
    const highlight = inject('highlight') as { js: string; css: string };

    if (props.hljs) {
      // 提供了hljs，在创建阶段即完成设置
      marked.setOptions({
        highlight(code) {
          return props.hljs.highlightAuto(code).value;
        }
      });
    }

    onMounted(() => {
      initCopyEntry();
    });

    const html = computed(() => {
      if (highlightInited.value) {
        return marked(props.value);
      } else {
        return '';
      }
    });

    const highlightLoad = () => {
      marked.setOptions({
        highlight(code) {
          return window.hljs.highlightAuto(code).value;
        }
      });

      highlightInited.value = true;
      nextTick(initCopyEntry);
    };

    watch(
      () => props.value,
      () => {
        nextTick(initCopyEntry);
      }
    );

    return () => (
      <>
        <div class={`${prefix}-content`}>
          <div class={[`${prefix}-input-wrapper`]}>
            <textarea value={props.value} onInput={props.onChange} />
          </div>
          <div class={`${prefix}-preview-wrapper`} innerHTML={html.value}></div>
        </div>
        {props.hljs === null && (
          <Teleport to={document.head}>
            <link rel="stylesheet" href={highlight.css} />
            <script src={highlight.js} onLoad={highlightLoad} />
          </Teleport>
        )}
      </>
    );
  }
});
