import { computed, defineComponent, PropType, reactive } from 'vue';
import './index.less';
import { Theme } from '../../App';
import Navigation from '../Navigation';
import { useStore } from 'vuex';
import { Dropdown, Menu } from 'ant-design-vue';
export default defineComponent({
  props: {
    theme: String as PropType<Theme>,
    onChange: {
      type: Function as PropType<(v: Theme) => void>,
      default: () => {}
    }
  },
  setup() {
    const store = useStore();

    const data = reactive({
      previewThemevisible: false,
      codeThemevisible: false,
      previewThemes: [
        'default',
        'github',
        'vuepress',
        'mk-cute',
        'smart-blue',
        'cyanosis'
      ],
      codeCssNames: [
        'atom',
        'a11y',
        'github',
        'gradient',
        'kimbie',
        'paraiso',
        'qtcreator',
        'stackoverflow'
      ]
    });

    const texts = computed(() => {
      return store.state.lang === 'zh-CN'
        ? {
            desc: 'Markdown编辑器Vue3版本，使用jsx和typescript语法开发，支持切换主题、prettier美化文本等。',
            defaultTheme: '默认模式',
            darkTheme: '暗黑模式',
            previewBtn: '预览主题',
            codeBtn: '代码主题'
          }
        : {
            desc: 'Markdown Editor for Vue3, developed by jsx and typescript, support different themes、beautify content by prettier.',
            defaultTheme: 'Default Theme',
            darkTheme: 'Dark Theme',
            previewBtn: 'Preview Style',
            codeBtn: 'Code Style'
          };
    });

    return () => (
      <header class="page-header">
        <section class="container">
          <h1 class="project-name">md-editor-v3</h1>
          <p class="project-desc">{texts.value.desc}</p>
          <Navigation />
          <p class="header-actions">
            <button
              class="btn btn-header"
              onClick={() => store.commit('changeTheme', 'light')}
            >
              {texts.value.defaultTheme}
            </button>
            <button
              class="btn btn-header"
              onClick={() => store.commit('changeTheme', 'dark')}
            >
              {texts.value.darkTheme}
            </button>
            <Dropdown
              placement="bottomCenter"
              getPopupContainer={() => {
                return document.querySelector('.docs-page') as HTMLElement;
              }}
              overlay={
                <Menu theme={store.state.theme}>
                  {data.previewThemes.map((item) => {
                    return (
                      <Menu.Item
                        onClick={() => {
                          store.commit('changePreviewTheme', item);
                        }}
                      >
                        {item}
                      </Menu.Item>
                    );
                  })}
                </Menu>
              }
              visible={data.previewThemevisible}
              onVisibleChange={(visible) => {
                data.previewThemevisible = visible;
              }}
            >
              <button class="btn btn-header">{texts.value.previewBtn}</button>
            </Dropdown>
            <Dropdown
              placement="bottomCenter"
              getPopupContainer={() => {
                return document.querySelector('.docs-page') as HTMLElement;
              }}
              overlay={
                <Menu theme={store.state.theme}>
                  {data.codeCssNames.map((item) => {
                    return (
                      <Menu.Item
                        onClick={() => {
                          store.commit('changeCodeTheme', item);
                        }}
                      >
                        {item}
                      </Menu.Item>
                    );
                  })}
                </Menu>
              }
              visible={data.codeThemevisible}
              onVisibleChange={(visible) => {
                data.codeThemevisible = visible;
              }}
            >
              <button class="btn btn-header">{texts.value.codeBtn}</button>
            </Dropdown>
          </p>
        </section>
      </header>
    );
  }
});
