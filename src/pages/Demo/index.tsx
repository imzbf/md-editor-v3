import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import Editor from 'md-editor-v3';
import { Theme } from '../../App';
import mdEN from '../../../public/demo-en-US.md';
import mdCN from '../../../public/demo-zh-CN.md';
import { Affix } from 'ant-design-vue';
import { useStore } from 'vuex';
import { replaceVersion } from '@/utils';

const Catalog = Editor.Catalog;

export default defineComponent({
  name: 'PageDemo',
  props: {
    theme: String as PropType<Theme>
  },
  setup() {
    const mdText = ref(replaceVersion(mdEN));
    const store = useStore();

    const queryMd = () => {
      mdText.value = replaceVersion(store.state.lang === 'en-US' ? mdEN : mdCN);
    };

    onMounted(queryMd);
    watch(() => store.state.lang, queryMd);

    return () => (
      <div class="container">
        <div class="doc">
          <div class="content">
            <Editor
              editorId="demo-preview"
              theme={store.state.theme}
              language={store.state.lang}
              modelValue={mdText.value}
              previewTheme={store.state.previewTheme}
              previewOnly
              showCodeRowNumber
            />
          </div>
          <div class="catalog">
            <Affix offsetTop={16}>
              <Catalog
                editorId="demo-preview"
                theme={store.state.theme}
                scrollElement={document.documentElement}
              />
            </Affix>
          </div>
        </div>
      </div>
    );
  }
});
