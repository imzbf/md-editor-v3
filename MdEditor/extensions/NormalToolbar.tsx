import { defineComponent, PropType, SetupContext } from 'vue';
import { prefix } from '../config';
import { getSlot } from '../utils/vue-tsx';

export default defineComponent({
  name: 'NormalToolbar',
  props: {
    title: {
      type: String as PropType<string>,
      default: ''
    },
    // 展示在工具栏的内容，通常是个图标
    trigger: {
      type: [String, Object] as PropType<string | JSX.Element>
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>
    }
  },
  emits: ['onClick'],
  setup(props, ctx: SetupContext) {
    return () => {
      const Trigger = getSlot({ props, ctx }, 'trigger');

      return (
        <div
          class={`${prefix}-toolbar-item`}
          title={props.title}
          onClick={(e) => {
            if (props.onClick instanceof Function) {
              props.onClick(e);
            } else {
              ctx.emit('onClick', e);
            }
          }}
        >
          {Trigger}
        </div>
      );
    };
  }
});
