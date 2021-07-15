import { defineComponent, ref } from 'vue';
import Header from './Header';
import Preview from './Preview';
import './style.less';

export type Theme = 'dark' | 'light';

export default defineComponent({
  setup() {
    const theme = ref<Theme>('light');

    return () => (
      <div class={['doc', theme.value === 'dark' && 'theme-dark']}>
        <Header />
        <Preview theme={theme.value} onChange={(v: Theme) => (theme.value = v)} />
      </div>
    );
  }
});
