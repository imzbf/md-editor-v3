import { defineComponent, PropType } from 'vue';
import { prefix } from '../../config';
import './style.less';

export default defineComponent({
  props: {
    checked: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    onChange: {
      type: Function as PropType<(checked: boolean) => void>,
      default: () => () => {}
    }
  },
  setup(props) {
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
