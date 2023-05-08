/* eslint-disable vue/require-default-prop */
import { defineComponent, PropType } from 'vue';
import { MdPreview } from '~~/index';
import { Theme } from '../App';
import mdText from '../data.md';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>,
    previewTheme: String as PropType<string>,
    codeTheme: String as PropType<string>
  },
  setup(props) {
    return () => (
      <div class="doc">
        <div class="container">
          <MdPreview
            theme={props.theme}
            previewTheme={props.previewTheme}
            codeTheme={props.codeTheme}
            modelValue={mdText}
            showCodeRowNumber
          />
        </div>
      </div>
    );
  }
});
