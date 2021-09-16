import { defineComponent, PropType } from 'vue';
import './index.less';
import { Theme } from '../../App';
import Navigation from '../Navigation';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>,
    onChange: {
      type: Function as PropType<(v: Theme) => void>,
      default: () => {}
    }
  },
  setup(props) {
    return () => (
      <header class="page-header">
        <section class="container">
          <h1 class="project-name">md-editor-v3</h1>
          <p class="project-desc">
            Markdown编辑器，基于vue3，使用jsx和typescript语法开发，支持切换主题、prettier美化文本等。
          </p>
          <Navigation />
          {/* <p class="header-actions">
            <button class="btn btn-header">
              <a
                href="https://github.com/imzbf/md-editor-v3"
                target="_blank"
                title="md-editor-v3"
              >
                GitHub源码
              </a>
            </button>
            <button class="btn btn-header" onClick={() => props.onChange('light')}>
              默认模式
            </button>
            <button class="btn btn-header" onClick={() => props.onChange('dark')}>
              暗黑模式
            </button>
          </p> */}
        </section>
      </header>
    );
  }
});
