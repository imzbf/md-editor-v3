import { defineComponent, onMounted, PropType, ref } from 'vue';
import Editor from '../../MdEditor';
import { Theme } from '../App';
import axios from 'axios';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>
  },
  setup(props) {
    const mdText = ref();

    onMounted(() => {
      axios
        .get('https://imbf.cc/ui-api/article/97aac9f3')
        .then((res) => {
          const { data } = res;

          if (data && data.code === 0) {
            mdText.value = data.data?.articleContent;
          } else {
            throw new Error();
          }
        })
        .catch((e) => {
          console.log(e);

          mdText.value = '文档读取失败！';
        });
    });
    return () => (
      <div class="doc">
        <div class="container">
          <Editor theme={props.theme} modelValue={mdText.value} previewOnly />
        </div>
      </div>
    );
  }
});
