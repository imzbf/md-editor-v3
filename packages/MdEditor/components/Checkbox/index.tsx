import { defineComponent, PropType } from 'vue';
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

export default defineComponent({
  name: `${prefix}-checkbox`,
  props,
  setup(props) {
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
