import { defineComponent, PropType } from 'vue';
import { prefix } from './config';
import { getSlot } from './utils/vue-tsx';
import Dropdown from './components/Dropdown';

export default defineComponent({
  name: 'DropdownToolbar',
  props: {
    title: {
      type: String as PropType<string>,
      default: ''
    },
    visible: {
      type: Boolean as PropType<boolean>
    },
    // 展示在工具栏的内容，通常是个图标
    trigger: {
      type: [String, Object] as PropType<string | JSX.Element>
    },
    onChange: {
      type: Function as PropType<(visible: boolean) => void>,
      default: () => () => {}
    },
    // 下拉框中的内容
    overlay: {
      type: [String, Object] as PropType<string | JSX.Element>
    }
  },
  setup(props, ctx) {
    return () => {
      const Trigger = getSlot({ props, ctx }, 'trigger');
      const Overlay = getSlot({ props, ctx }, 'overlay');

      return (
        <Dropdown visible={props.visible} onChange={props.onChange} overlay={Overlay}>
          <div class={`${prefix}-toolbar-item`} title={props.title || ''}>
            {Trigger}
          </div>
        </Dropdown>
      );
    };
  }
});
