import { defineComponent } from 'vue';
import { prefix } from '~/config';

export default defineComponent({
  name: `${prefix}-divider`,
  setup() {
    return () => <div class={`${prefix}-divider`}></div>;
  }
});
