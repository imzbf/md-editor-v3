import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'nprogress/nprogress.css';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

createApp(App).use(store).use(router).use(MdEditor).mount('#app');
