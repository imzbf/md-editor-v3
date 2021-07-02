import { defineComponent, ref, computed, onMounted, Teleport, inject } from 'vue';
import { prefix } from '../../Editor';
import marked from 'marked';

declare global {
  interface Window {
    hljs: any;
  }
}

export default defineComponent({
  name: 'MDEditorContent',
  setup() {
    const highlight = inject('highlight') as { js: string; css: string };
    const text = ref<string>('');

    const html = computed((): string => {
      return marked(text.value);
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
            <textarea
              value={text.value}
              onInput={({ target }: Event) =>
                (text.value = (target as HTMLTextAreaElement).value)
              }
            />
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
