import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import Editor, { HeadList } from 'md-editor-v3';
import { Theme } from '../../App';
import axios from '@/utils/request';
import { version } from '../../../package.json';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PageAbout',
  props: {
    theme: String as PropType<Theme>
  },
  setup() {
    const mdText = ref();
    const catalogList = ref<Array<HeadList>>([]);
    const store = useStore();

    const queryMd = () => {
      axios
        .get(`/about-${store.state.lang}.md`)
        .then(({ data }) => {
          mdText.value = (data as string).replace(/\$\{EDITOR_VERSION\}/g, version);
        })
        .catch((e) => {
          console.error(e);

          mdText.value = '文档读取失败！';
        });
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
              onGetCatalog={(arr) => {
                catalogList.value = arr;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
});
