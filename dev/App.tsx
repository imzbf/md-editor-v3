import { defineComponent, ref, watch } from 'vue';
import Header from './Header';
import Preview from './Preview';
import PreviewOnly from './PreviewOnly';

// import VueTemplate from './VueTemplate.vue';

import './style.less';

export type Theme = 'dark' | 'light';

export default defineComponent({
  setup() {
    const theme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'light');
    const previewTheme = ref<string>(localStorage.getItem('previewTheme') || 'default');
    const codeTheme = ref<string>(localStorage.getItem('codeTheme') || 'atom');
    const lang = ref<string>(localStorage.getItem('lang') || 'zh-CN');

    watch([theme, previewTheme, codeTheme, lang], () => {
      localStorage.setItem('theme', theme.value);
      localStorage.setItem('previewTheme', previewTheme.value);
      localStorage.setItem('codeTheme', codeTheme.value);
      localStorage.setItem('lang', lang.value);
    });

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
          {/* <PreviewOnly
            theme={theme.value}
            previewTheme={previewTheme.value}
            codeTheme={codeTheme.value}
          /> */}
        </div>
      </div>
    );
  }
});
