import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

import './style.less';

export type Theme = 'dark' | 'light';

export default defineComponent({
  name: 'App',
  mounted() {
    if (import.meta.env.MODE === 'preview') {
      const hm = document.createElement('script');
      hm.src = 'https://hm.baidu.com/hm.js?1563bc52cb27ffbc7b5b46cdfc327ce0';
      document.head.appendChild(hm);
    }
  },
  render() {
    return <RouterView />;
  }
});
