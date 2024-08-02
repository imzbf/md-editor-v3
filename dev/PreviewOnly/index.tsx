/* eslint-disable vue/require-default-prop */
import { defineComponent, PropType, ref } from 'vue';
import { ExposePreviewParam, MdPreview } from '~~/index';
import { Theme } from '../App';
import mdText from '../data.md';

import '~/styles/preview.less';

export default defineComponent({
  props: {
    theme: String as PropType<Theme>,
    previewTheme: String as PropType<string>,
    codeTheme: String as PropType<string>
  },
  setup(props) {
    const previewRef = ref<ExposePreviewParam>();

    const value = ref(mdText);

    return () => (
      <div class="doc">
        <button
          onClick={() => {
            previewRef.value?.rerender();
          }}
        >
          按钮
        </button>
        <div class="container">
          <MdPreview
            ref={previewRef}
            theme={props.theme}
            previewTheme={props.previewTheme}
            codeTheme={props.codeTheme}
            modelValue={value.value}
            onChange={(v) => (value.value = v)}
            showCodeRowNumber
          />
        </div>
      </div>
    );
  }
});
