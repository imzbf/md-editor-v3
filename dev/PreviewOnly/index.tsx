import { defineComponent, PropType, ref } from 'vue';
import { ExposePreviewParam, MdPreview, prefix } from '~~/index';
import { Theme } from '../App';
import mdText from '../data.md';

// import '~/styles/preview.less';

const editorId = 'preview-only-test';

const PreviewOnlyTest = defineComponent({
  name: 'PreviewOnlyTest',
  props: {
    theme: {
      type: String as PropType<Theme>,
      default: 'light'
    },
    previewTheme: {
      type: String as PropType<string>,
      default: undefined
    },
    codeTheme: {
      type: String as PropType<string>,
      default: undefined
    },
    lang: {
      type: String as PropType<string>,
      default: 'zh-CN'
    }
  },
  setup(props) {
    const previewRef = ref<ExposePreviewParam>();

    const value = ref(mdText);

    const onRemount = () => {
      document
        .querySelectorAll(`#${editorId} .${prefix}-preview .${prefix}-code`)
        .forEach((codeBlock: Element) => {
          const tools = codeBlock.querySelectorAll('.extra-code-tools');
          tools.forEach((item) => {
            item.addEventListener('click', (e) => {
              e.preventDefault();

              const activeCode =
                codeBlock.querySelector('input:checked + pre code') ||
                codeBlock.querySelector('pre code');

              const codeText = (activeCode as HTMLElement).textContent;

              console.log(codeText);
            });
          });
        });
    };

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
            id={editorId}
            ref={previewRef}
            theme={props.theme}
            previewTheme={props.previewTheme}
            codeTheme={props.codeTheme}
            language={props.lang}
            modelValue={value.value}
            onChange={(v) => (value.value = v)}
            showCodeRowNumber
            onRemount={onRemount}
          />
        </div>
      </div>
    );
  }
});

export default PreviewOnlyTest;
