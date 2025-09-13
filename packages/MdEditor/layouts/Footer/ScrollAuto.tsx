import { defineComponent, inject, ComputedRef, PropType } from 'vue';
import Checkbox from '~/components/Checkbox';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';

const props = {
  scrollAuto: {
    type: Boolean as PropType<boolean>
  },
  onScrollAutoChange: {
    type: Function as PropType<(v: boolean) => void>,
    default: () => {}
  }
};

export default defineComponent({
  props,
  setup(props) {
    const ult = inject<ComputedRef<StaticTextDefaultValue>>('usedLanguageText');
    const disabled = inject<ComputedRef<boolean>>('disabled');

    return () => (
      <div class={[`${prefix}-footer-item`, disabled?.value && `${prefix}-disabled`]}>
        <label
          class={`${prefix}-footer-label`}
          onClick={() => {
            if (disabled?.value) return;
            props.onScrollAutoChange(!props.scrollAuto);
          }}
        >
          {ult?.value.footer?.scrollAuto}
        </label>
        <Checkbox
          checked={props.scrollAuto}
          onChange={props.onScrollAutoChange}
          disabled={disabled?.value}
        />
      </div>
    );
  }
});
