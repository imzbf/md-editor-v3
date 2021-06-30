import { defineComponent, reactive, watchEffect } from 'vue';
import Dropdown from './MdEditor/components/Dropdown';
import Editor from './MdEditor';

export default defineComponent({
  setup() {
    return () => (
      <>
        <Editor />
        <Dropdown trigger={[]} />
      </>
    );
  }
});
