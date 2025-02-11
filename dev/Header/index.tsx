/* eslint-disable vue/require-default-prop */
import { defineComponent, PropType } from 'vue';
import './index.less';
import { Theme } from '../App';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>,
    onChange: {
      type: Function as PropType<(v: Theme) => void>,
      default: () => {}
    },
    onPreviewChange: {
      type: Function as PropType<(v: string) => void>,
      default: () => {}
    },
    onCodeThemeChange: {
      type: Function as PropType<(v: string) => void>,
      default: () => {}
    },
    onLangChange: {
      type: Function as PropType<(v: string) => void>,
      default: () => {}
    }
  },
  setup(props) {
    return () => (
      <header class="page-header">
        <section class="container">
          <p class="header-actions">
            <button class="btn btn-header" onClick={() => props.onChange('light')}>
              亮模式
            </button>
            <button class="btn btn-header" onClick={() => props.onChange('dark')}>
              暗模式
            </button>
            <button class="btn btn-header" onClick={() => props.onLangChange('zh-CN')}>
              中文
            </button>
            <button class="btn btn-header" onClick={() => props.onLangChange('en-US')}>
              英文
            </button>
            <button class="btn btn-header" onClick={() => props.onLangChange('ko-KR')}>
              한국어
            </button>
          </p>
          <p class="header-actions">
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('default')}
            >
              default
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('cyanosis')}
            >
              cyanosis
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('github')}
            >
              github
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('mk-cute')}
            >
              mk-cute
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('smart-blue')}
            >
              smart-blue
            </button>
            <button
              class="btn btn-header"
              onClick={() => props.onPreviewChange('vuepress')}
            >
              vuepress
            </button>
          </p>
          <p class="header-actions">
            {[
              'a11y',
              'atom',
              'github',
              'gradient',
              'kimbie',
              'paraiso',
              'qtcreator',
              'stackoverflow'
            ].map((item) => {
              return (
                <button
                  class="btn btn-header"
                  onClick={() => props.onCodeThemeChange(item)}
                  key={item}
                >
                  {item}
                </button>
              );
            })}
          </p>
        </section>
      </header>
    );
  }
});
