import { createApp } from 'vue';
import App from './App.vue';

import './config'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*');
  });
