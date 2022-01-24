import { defineComponent } from 'vue';

import './index.less';

import { prefix } from '../../config';

export default defineComponent({
  setup() {
    return () => <div class={`${prefix}-divider`}></div>;
  }
});
