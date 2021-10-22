import { defineComponent, nextTick, onMounted, PropType, ref, watch } from 'vue';
import Editor, { HeadList } from 'md-editor-v3';
import { Theme } from '../../App';
import axios from '@/utils/request';
import { version } from '../../../package.json';
import { useStore } from 'vuex';
import { debounce } from '@/utils';

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
              markedHeading={(text, level) => {
                const keyText = text.replace(' ', '-');
                return `<h${level} id="${keyText}"><a href="#${keyText}">${text}</a></h${level}>`;
              }}
              onGetCatalog={(arr) => {
                catalogList.value = arr;

                nextTick(() => {
                  debounce(() => {
                    const selector = decodeURIComponent(location.hash).replace(' ', '-');

                    if (selector) {
                      const targetHeadDom = document.querySelector(selector);
                      if (targetHeadDom) {
                        const scrollLength =
                          (targetHeadDom as HTMLHeadElement).offsetTop + 414;

                        window.scrollTo({
                          top: scrollLength,
                          behavior: 'smooth'
                        });
                      }
                    }
                  })();
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
});
