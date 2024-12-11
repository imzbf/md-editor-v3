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
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: undefined
  }
};

type CheckboxProps = Readonly<LooseRequired<Readonly<ExtractPropTypes<typeof props>>>>;

export default defineComponent({
  name: `${prefix}-checkbox`,
  props,
  setup(props: CheckboxProps) {
    return () => {
      return (
        <div
          class={[
            `${prefix}-checkbox`,
            props.checked && `${prefix}-checkbox-checked`,
            props.disabled && `${prefix}-disabled`
          ]}
          onClick={() => {
            if (!props.disabled) {
              props.onChange(!props.checked);
            }
          }}
        ></div>
      );
    };
  }
});
