import { defineComponent, PropType, CSSProperties } from 'vue';

export default defineComponent({
  props: {
    propA: String as PropType<'a' | 'b' | 'c'>,
    propB: [String, Object] as PropType<string | CSSProperties>,
    propC: [Array] as PropType<Array<'a' | 'b' | 'c'>>,
    trigger: {
      type: [Array] as PropType<Array<'hover' | 'click'>>
    }
  },
  setup() {
    return () => <div></div>;
  }
});
