import { createApp } from 'vue';
import App from './App';
import router from './router';
import 'nprogress/nprogress.css';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(router).mount('#app');
