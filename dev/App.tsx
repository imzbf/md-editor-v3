import { defineComponent, reactive } from 'vue';
import Editor from '../MdEditor';
import { mdText } from './data';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default defineComponent({
  setup() {
    const md = reactive({
      text: mdText
    });
    return () => (
      <>
        <Editor
          hljs={hljs}
          value={md.text}
          onChange={({ target }) => (md.text = (target as HTMLTextAreaElement).value)}
        />
      </>
    );
  }
});
