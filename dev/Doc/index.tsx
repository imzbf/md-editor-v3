import { defineComponent } from 'vue';
import './index.less';

import usage from './data/usage';

export default defineComponent({
  setup() {
    return () => (
      <div class="doc">
        <div class="container">
          <div class="doc-usage" innerHTML={usage}></div>
        </div>
      </div>
    );
  }
});
