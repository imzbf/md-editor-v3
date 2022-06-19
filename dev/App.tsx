import { defineComponent, ref } from 'vue';
import Header from './Header';
import Preview from './Preview';
import PreviewOnly from './PreviewOnly';

// import VueTemplate from './VueTemplate.vue';

import './style.less';

export type Theme = 'dark' | 'light';

export default defineComponent({
  setup() {
    const theme = ref<Theme>('light');
    const previewTheme = ref<string>('default');
    const codeTheme = ref<string>('kimbie');
    const lang = ref<string>('zh-CN');

    return () => (
      <div class={['app', theme.value === 'dark' && 'theme-dark']}>
        <Header
          theme={theme.value}
          onChange={(v: Theme) => (theme.value = v)}
          onPreviewChange={(pt: string) => {
            previewTheme.value = pt;
          }}
          onCodeThemeChange={(ct: string) => {
            codeTheme.value = ct;
          }}
          onLangChange={(l) => {
            lang.value = l;
          }}
        />
        <div class="page-body">
          {/* <VueTemplate /> */}
          <Preview
            theme={theme.value}
            previewTheme={previewTheme.value}
            codeTheme={codeTheme.value}
            lang={lang.value}
          />
          <PreviewOnly
            theme={theme.value}
            previewTheme={previewTheme.value}
            codeTheme={codeTheme.value}
          />
        </div>
      </div>
    );
  }
});
