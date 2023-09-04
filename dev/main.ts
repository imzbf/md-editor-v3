import { createApp } from 'vue';
import App from './App';

import '~/styles/style.less';

import { MdEditor } from '~~/index';

createApp(App).use(MdEditor).mount('#app');
