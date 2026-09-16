import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarQuote = defineComponent({
  name: 'ToolbarQuote',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.quote}
        aria-label={ult.value.toolbarTips?.quote}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'quote' });
        }}
        type="button"
      >
        <Icon name="quote" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>{ult.value.toolbarTips?.quote}</div>
        )}
      </button>
    );
  }
});

export default ToolbarQuote;
