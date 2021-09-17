import { defineComponent, PropType, reactive, ref } from 'vue';
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
      previewThemevisible: false
    });

    const HeaderContainer = ref();

    return () => (
      <header class="page-header">
        <section class="container" ref={HeaderContainer}>
          <h1 class="project-name">md-editor-v3</h1>
          <p class="project-desc">
            Markdown编辑器，基于vue3，使用jsx和typescript语法开发，支持切换主题、prettier美化文本等。
          </p>
          <Navigation />
          <p class="header-actions">
            <button
              class="btn btn-header"
              onClick={() => store.commit('changeTheme', 'light')}
            >
              默认模式
            </button>
            <button
              class="btn btn-header"
              onClick={() => store.commit('changeTheme', 'dark')}
            >
              暗黑模式
            </button>
            <Dropdown
              trigger="click"
              placement="bottomCenter"
              getPopupContainer={() => {
                return HeaderContainer.value;
              }}
              overlay={
                <Menu theme={store.state.theme}>
                  <Menu.Item
                    onClick={() => {
                      store.commit('changePreviewTheme', 'default');
                    }}
                  >
                    默认主题
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      store.commit('changePreviewTheme', 'github');
                    }}
                  >
                    Github主题
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      store.commit('changePreviewTheme', 'vuepress');
                    }}
                  >
                    Vuepress主题
                  </Menu.Item>
                </Menu>
              }
              visible={data.previewThemevisible}
              onVisibleChange={(visible) => {
                data.previewThemevisible = visible;
              }}
            >
              <button class="btn btn-header">切换预览主题</button>
            </Dropdown>
          </p>
        </section>
      </header>
    );
  }
});
