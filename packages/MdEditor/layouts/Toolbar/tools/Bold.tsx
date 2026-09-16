import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarBold = defineComponent({
  name: 'ToolbarBold',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.bold}
        aria-label={ult.value.toolbarTips?.bold}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'bold' });
        }}
        type="button"
      >
        <Icon name="bold" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>{ult.value.toolbarTips?.bold}</div>
        )}
      </button>
    );
  }
});

export default ToolbarBold;
