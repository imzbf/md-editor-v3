import {
  defineComponent,
  ref,
  computed,
  onMounted,
  Teleport,
  inject,
  PropType
} from 'vue';
import { prefix } from '../../Editor';
import marked from 'marked';

declare global {
  interface Window {
    hljs: any;
  }
}

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
    });

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
