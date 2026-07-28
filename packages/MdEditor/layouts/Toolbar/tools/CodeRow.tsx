import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarCodeRow = defineComponent({
  name: 'ToolbarCodeRow',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.codeRow}
        aria-label={ult.value.toolbarTips?.codeRow}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'codeRow' });
        }}
        type="button"
      >
        <Icon name="code-row" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.codeRow}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarCodeRow;
