import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import Editor, { HeadList } from 'md-editor-v3';
import { Theme } from '../../App';
import mdEN from '../../../public/doc-en-US.md';
import mdCN from '../../../public/doc-zh-CN.md';
import { replaceVersion } from '@/utils';
import { Affix } from 'ant-design-vue';
import { useStore } from 'vuex';

const Catalog = Editor.Catalog;

export default defineComponent({
  props: {
    theme: String as PropType<Theme>
  },
  setup() {
    const mdText = ref(replaceVersion(mdEN));
    const store = useStore();

    const queryMd = () => {
      mdText.value = replaceVersion(store.state.lang === 'en-US' ? mdEN : mdCN);
    };

    watch(() => store.state.lang, queryMd);

    return () => (
      <div class="container">
        <div class="doc">
          <div class="content">
            <Editor
              editorId="doc-preview"
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
                editorId="doc-preview"
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
