import {
  defineComponent,
  PropType,
  CSSProperties,
  SetupContext,
  EmitsOptions,
  cloneVNode
} from 'vue';
import { getSlot } from '../../utils/vue-tsx';

export default defineComponent({
  props: {
    propA: String as PropType<'a' | 'b' | 'c'>,
    propB: [String, Object] as PropType<string | CSSProperties>,
    propC: [Array] as PropType<Array<'a' | 'b' | 'c'>>,
    trigger: {
      type: [Array] as PropType<Array<'hover' | 'click'>>
    }
  },
  setup(props, ctx: SetupContext<EmitsOptions>) {
    return () => {
      const slotDefault = getSlot({ ctx });
      console.log('slotDefault', slotDefault);

      if (slotDefault) {
        // (slotDefault[0].el as HTMLElement).addEventListener('click', () => {
        //   console.log(123);
        // });
      }

      return slotDefault;
    };
  }
});
