import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store';

import 'nprogress/nprogress.css';
import 'md-editor-v3/lib/style.css';

createApp(App).use(store).use(router).mount('#app');
