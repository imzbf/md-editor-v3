/* eslint-disable vue/require-default-prop */
import { defineComponent, PropType } from 'vue';

const previewComponent = defineComponent({
  name: 'PreviewComponent',
  props: {
    html: {
      type: String as PropType<string>
    },
    id: {
      type: String as PropType<string>
    },
    class: {
      type: [String, Array, Object] as PropType<
        string | Array<string> | Record<string, boolean>
      >
    }
  },
  setup(props) {
    return () => <div id={props.id} class={props.class} innerHTML={props.html}></div>;
  }
});

export default previewComponent;
