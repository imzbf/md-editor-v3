import { defineComponent, PropType } from 'vue';
import { prefix } from '../../config';
import './style.less';

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>
    },
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
          id={props.id}
          class={[`${prefix}-checkbox`, props.checked && `${prefix}-checkbox-checked`]}
          onClick={() => {
            props.onChange(!props.checked);
          }}
        ></div>
      );
    };
  }
});
