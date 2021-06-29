import { defineComponent, ref, computed } from 'vue';
import { prefix } from '../../Editor';

export default defineComponent({
  name: 'MDEditorContent',
  setup() {
    const content = ref<string>('');

    return () => (
      <div class={`${prefix}-content`}>
        <div class={[`${prefix}-input-wrapper`]}>
          <textarea
            value={content.value}
            onInput={({ target }: Event) =>
              (content.value = (target as HTMLTextAreaElement).value)
            }
          />
        </div>
        <div class={`${prefix}-preview-wrapper`} innerHTML={content.value}></div>
      </div>
    );
  }
});
