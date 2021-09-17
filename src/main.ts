import { createApp } from 'vue';
import App from './App';
import router from './router';
import 'nprogress/nprogress.css';
import store from './store';

createApp(App).use(store).use(router).mount('#app');
