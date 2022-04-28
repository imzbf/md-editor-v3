import { defineComponent, PropType } from 'vue';
import './index.less';
import { Theme } from '../App';

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
          <p class="header-actions">
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
          </p>
        </section>
      </header>
    );
  }
});
