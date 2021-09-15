import { defineComponent, onMounted, PropType, ref } from 'vue';
import Editor from '../../MdEditor';
import { Theme } from '../App';
import axios from 'axios';

import { version } from '../../package.json';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>
  },
  setup(props) {
    const mdText = ref();

    onMounted(() => {
      axios
        .get('doc.md')
        .then(({ data }) => {
          mdText.value = (data as string).replaceAll('${EDITOR_VERSION}', version);
        })
        .catch((e) => {
          console.log(e);

          mdText.value = '文档读取失败！';
        });
    });
    return () => (
      <div class="doc">
        <div class="container">
          <Editor
            theme={props.theme}
            modelValue={mdText.value}
            previewOnly
            showCodeRowNumber
          />
        </div>
      </div>
    );
  }
});
