import { cloneVNode, defineComponent, PropType, ref } from 'vue';
// import { createPopper } from '@popperjs/core';
import { getSlot } from '~/utils/vue-tsx';

const Popper = defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props) {
    const triggerRef = ref();

    return () => {
      const slotDefault = getSlot({ props });
      const title = getSlot({ props }, 'title');

      // 触发器
      const trigger = cloneVNode(
        slotDefault instanceof Array ? slotDefault[0] : slotDefault,
        {
          ref: triggerRef
        }
      );

      return [trigger, title];
    };
  }
});

export default Popper;
