import { defineComponent, onMounted } from 'vue';
import './index.less';
import copy from 'copy-to-clipboard';
import usage from './data/usage';

export default defineComponent({
  setup() {
    const initCopyEntry = () => {
      document.querySelectorAll('.doc-usage pre ').forEach((pre: Element) => {
        const copyButton = pre.querySelector('.copy-button') as HTMLSpanElement;

        copyButton.addEventListener('click', () => {
          copy((pre.querySelector('code') as HTMLElement).innerText);

          copyButton.innerText = '已复制！';
          setTimeout(() => {
            copyButton.innerText = '复制代码';
          }, 1500);
        });
      });
    };

    onMounted(() => {
      initCopyEntry();
    });

    return () => (
      <div class="doc">
        <div class="container">
          <div class="doc-usage" innerHTML={usage}></div>
        </div>
      </div>
    );
  }
});
