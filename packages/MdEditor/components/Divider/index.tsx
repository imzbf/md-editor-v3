import { defineComponent } from 'vue';
import { prefix } from '~/config';

export default defineComponent({
  setup() {
    return () => <div class={`${prefix}-divider`}></div>;
  }
});
