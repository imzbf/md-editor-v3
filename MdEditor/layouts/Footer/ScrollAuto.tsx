import { defineComponent, inject, ComputedRef, PropType } from 'vue';
import { prefix } from '../../config';
import { StaticTextDefaultValue } from '../../type';
import Checkbox from '../../components/Checkbox';

export default defineComponent({
  props: {
    scrollAuto: {
      type: Boolean as PropType<boolean>
    },
    onScrollAutoChange: {
      type: Function as PropType<(v: boolean) => void>,
      default: () => () => {}
    }
  },
  setup(props) {
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;

    return () => (
      <div class={`${prefix}-footer-item`}>
        <label
          class={`${prefix}-footer-label`}
          onClick={() => {
            props.onScrollAutoChange(!props.scrollAuto);
          }}
        >
          {ult.value.footer?.scrollAuto}
        </label>
        <Checkbox checked={props.scrollAuto} onChange={props.onScrollAutoChange} />
      </div>
    );
  }
});
