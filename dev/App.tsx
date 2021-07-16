import { defineComponent, onMounted, ref } from 'vue';
import Header from './Header';
import Preview from './Preview';
import Doc from './Doc';

import './style.less';

export type Theme = 'dark' | 'light';

export default defineComponent({
  setup() {
    const theme = ref<Theme>('light');

    return () => (
      <div class={['app', theme.value === 'dark' && 'theme-dark']}>
        <Header theme={theme.value} onChange={(v: Theme) => (theme.value = v)} />
        <div class="page-body">
          <Preview theme={theme.value} onChange={(v: Theme) => (theme.value = v)} />
          <Doc />
        </div>
      </div>
    );
  }
});
