import { defineComponent, ref } from 'vue';
import Header from './Header';
import Preview from './Preview';

import './style.less';

export type Theme = 'dark' | 'light';

export default defineComponent({
  setup() {
    const theme = ref<Theme>('dark');

    return () => (
      <div class={['app', theme.value === 'dark' && 'theme-dark']}>
        <Header theme={theme.value} onChange={(v: Theme) => (theme.value = v)} />
        <div class="page-body">
          <Preview theme={theme.value} />
        </div>
      </div>
    );
  }
});
