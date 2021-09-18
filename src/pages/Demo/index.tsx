import { defineComponent, onMounted, PropType, ref } from 'vue';
import Editor, { HeadList } from 'md-editor-v3';
import { Theme } from '../../App';
import axios from 'axios';
import { version } from '../../../package.json';
import Catalog from '@/components/Catalog';
import { Affix } from 'ant-design-vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PageDemo',
  props: {
    theme: String as PropType<Theme>
  },
  setup() {
    const mdText = ref();
    const catalogList = ref<Array<HeadList>>([]);

    onMounted(() => {
      axios
        .get('/demo.md')
        .then(({ data }) => {
          mdText.value = (data as string).replace(/\$\{EDITOR_VERSION\}/g, version);
        })
        .catch((e) => {
          console.log(e);

          mdText.value = '文档读取失败！';
        });
    });

    const store = useStore();

    return () => (
      <div class="container">
        <div class="doc">
          <div class="content">
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
          <div class="catalog">
            <Affix offsetTop={16}>
              <Catalog heads={catalogList.value} />
            </Affix>
          </div>
        </div>
      </div>
    );
  }
});
