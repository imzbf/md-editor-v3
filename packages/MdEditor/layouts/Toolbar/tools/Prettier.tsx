import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarPrettier = defineComponent({
  name: 'ToolbarPrettier',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.prettier}
        aria-label={ult.value.toolbarTips?.prettier}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'prettier' });
        }}
        type="button"
      >
        <Icon name="prettier" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.prettier}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarPrettier;
