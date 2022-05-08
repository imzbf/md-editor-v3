import { defineComponent, PropType } from 'vue';
import Editor from '../../MdEditor';
import { Theme } from '../App';
import mdText from '../data.md';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>,
    previewTheme: String as PropType<string>,
    codeCssName: String as PropType<string>
  },
  setup(props) {
    return () => (
      <div class="doc">
        <div class="container">
          <Editor
            theme={props.theme}
            previewTheme={props.previewTheme}
            codeCssName={props.codeCssName}
            modelValue={mdText}
            previewOnly
            showCodeRowNumber
          />
        </div>
      </div>
    );
  }
});
