import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import Editor, { HeadList } from 'md-editor-v3';
import { Theme } from '../../App';
import mdEN from '../../../public/doc-en-US.md';
import mdCN from '../../../public/doc-zh-CN.md';
import { version } from '../../../package.json';
import { Affix } from 'ant-design-vue';
import { useStore } from 'vuex';

const Catalog = Editor.Catalog;

export default defineComponent({
  props: {
    theme: String as PropType<Theme>
  },
  setup() {
    const mdText = ref();
    const catalogList = ref<Array<HeadList>>([]);
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
          <div class="content">
            <Editor
              editorId="doc-preview"
              theme={store.state.theme}
              language={store.state.lang}
              modelValue={mdText.value}
              previewTheme={store.state.previewTheme}
              previewOnly
              showCodeRowNumber
              onGetCatalog={(arr: any[]) => {
                catalogList.value = arr;
              }}
            />
          </div>
          <div class="catalog">
            <Affix offsetTop={16}>
              {/* <Catalog heads={catalogList.value} /> */}
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
