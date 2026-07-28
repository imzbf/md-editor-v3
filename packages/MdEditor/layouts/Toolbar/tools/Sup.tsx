import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarSup = defineComponent({
  name: 'ToolbarSup',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.sup}
        aria-label={ult.value.toolbarTips?.sup}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'sup' });
        }}
        type="button"
      >
        <Icon name="sup" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>{ult.value.toolbarTips?.sup}</div>
        )}
      </button>
    );
  }
});

export default ToolbarSup;
