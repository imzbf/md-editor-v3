import { defineComponent, inject, ComputedRef, PropType } from 'vue';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props) {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;

    const countWords = (text: string) => {
      return text.trim().split(/\s+/).length;
    };

    return () => (
      <div class={`${prefix}-footer-item`}>
        <label
          class={`${prefix}-footer-label`}
        >{`${ult.value.footer?.markdownTotal}:`}</label>
        <span>{countWords(props.modelValue)}</span>
      </div>
    );
  }
});
