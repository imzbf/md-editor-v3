import { defineComponent, ref } from 'vue';
import Header from './Header';
import Preview from './Preview';
import PreviewOnly from './PreviewOnly';

import './style.less';

export type Theme = 'dark' | 'light';

export default defineComponent({
  setup() {
    const theme = ref<Theme>('light');
    const previewTheme = ref<string>('default');
    const codeCssName = ref<string>('kimbie');

    return () => (
      <div class={['app', theme.value === 'dark' && 'theme-dark']}>
        <Header
          theme={theme.value}
          onChange={(v: Theme) => (theme.value = v)}
          onPreviewChange={(pt: string) => {
            previewTheme.value = pt;
          }}
          onCodeCssNameChange={(ct: string) => {
            codeCssName.value = ct;
          }}
        />
        <div class="page-body">
          <Preview
            theme={theme.value}
            previewTheme={previewTheme.value}
            codeCssName={codeCssName.value}
          />
          <PreviewOnly
            theme={theme.value}
            previewTheme={previewTheme.value}
            codeCssName={codeCssName.value}
          />
        </div>
      </div>
    );
  }
});
