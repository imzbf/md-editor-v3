import { defineComponent } from 'vue';
import Editor from '../MdEditor';

export default defineComponent({
  setup() {
    return () => (
      <>
        <Editor />
      </>
    );
  }
});
