import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarUnderline = defineComponent({
  name: 'ToolbarUnderline',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.underline}
        aria-label={ult.value.toolbarTips?.underline}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'underline' });
        }}
        type="button"
      >
        <Icon name="underline" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.underline}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarUnderline;
