import { defineComponent, PropType, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { prefix } from '~/config';

const props = {
  checked: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  onChange: {
    type: Function as PropType<(checked: boolean) => void>,
    default: () => {}
  }
};

type CheckboxProps = Readonly<LooseRequired<Readonly<ExtractPropTypes<typeof props>>>>;

export default defineComponent({
  props,
  setup(props: CheckboxProps) {
    return () => {
      return (
        <div
          class={[`${prefix}-checkbox`, props.checked && `${prefix}-checkbox-checked`]}
          onClick={() => {
            props.onChange(!props.checked);
          }}
        ></div>
      );
    };
  }
});
