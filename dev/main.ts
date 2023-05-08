import { createApp } from 'vue';
import App from './App';
// import App from './VueTemplate.vue';

import { MdEditor } from '~~/index';

createApp(App).use(MdEditor).mount('#app');
