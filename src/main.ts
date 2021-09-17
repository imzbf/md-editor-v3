import { createApp } from 'vue';
import App from './App';
import router from './router';
import 'nprogress/nprogress.css';

createApp(App).use(router).mount('#app');
