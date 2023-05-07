import { defineComponent } from 'vue';
import { prefix } from '~/config';

import './index.less';

export default defineComponent({
  setup() {
    return () => <div class={`${prefix}-divider`}></div>;
  }
});
