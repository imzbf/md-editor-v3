import { defineComponent, ref } from 'vue';
import Header from './Header';
import Preview from './Preview';
import Editor from '../MdEditor';

import './style.less';

export type Theme = 'dark' | 'light';

export default defineComponent({
  setup() {
    const theme = ref<Theme>('light');

    return () => (
      <div class={['app', theme.value === 'dark' && 'theme-dark']}>
        <Header theme={theme.value} onChange={(v: Theme) => (theme.value = v)} />
        <div class="page-body">
          <div
            style={{
              width: '200px',
              padding: '10px',
              border: '1px solid #666'
            }}
          >
            <Editor.Catalog editorId="md-prev" scrollElement={document.documentElement} />
          </div>
          <Preview theme={theme.value} />
        </div>
      </div>
    );
  }
});
