import { defineComponent, reactive } from 'vue';
import Editor from '../MdEditor';
import { mdText } from './data';
export default defineComponent({
  setup() {
    const md = reactive({
      text: mdText
    });
    return () => (
      <>
        <Editor
          value={md.text}
          onChange={({ target }) => (md.text = (target as HTMLTextAreaElement).value)}
        />
      </>
    );
  }
});
