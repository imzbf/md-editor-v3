import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import Editor from 'md-editor-v3';
import { Theme } from '../../App';

import mdEN from '../../../public/about-en-US.md';
import mdCN from '../../../public/about-zh-CN.md';

import { version } from '../../../package.json';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PageAbout',
  props: {
    theme: String as PropType<Theme>
  },
  setup() {
    const mdText = ref();
    const store = useStore();

    const queryMd = () => {
      mdText.value = (store.state.lang === 'en-US' ? mdEN : mdCN).replace(
        /\$\{EDITOR_VERSION\}/g,
        version
      );
    };

    onMounted(queryMd);
    watch(() => store.state.lang, queryMd);

    return () => (
      <div class="container">
        <div class="doc">
          <div class="content" style={{ width: '100%' }}>
            <Editor
              theme={store.state.theme}
              modelValue={mdText.value}
              previewTheme={store.state.previewTheme}
              previewOnly
              showCodeRowNumber
            />
          </div>
        </div>
      </div>
    );
  }
});
