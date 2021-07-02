import {
  defineComponent,
  computed,
  onMounted,
  Teleport,
  inject,
  PropType,
  watch,
  nextTick
} from 'vue';
import { prefix } from '../../Editor';
import marked from 'marked';
import copy from 'copy-to-clipboard';

declare global {
  interface Window {
    hljs: any;
  }
}

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
    onChange: {
      type: Function as PropType<(e: Event) => void>,
      default: () => () => {}
    }
  },
  setup(props) {
    const highlight = inject('highlight') as { js: string; css: string };

    const html = computed((): string => {
      return marked(props.value);
    });

    onMounted(() => {
      window.addEventListener('load', () => {
        marked.setOptions({
          highlight(code) {
            return window.hljs.highlightAuto(code).value;
          }
        });
      });
      nextTick(initCopyEntry);
    });

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
        <Teleport to={document.head}>
          <link rel="stylesheet" href={highlight.css} />
          <script src={highlight.js} />
        </Teleport>
      </>
    );
  }
});
