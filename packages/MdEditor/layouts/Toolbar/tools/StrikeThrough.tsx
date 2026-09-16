import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarStrikeThrough = defineComponent({
  name: 'ToolbarStrikeThrough',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.strikeThrough}
        aria-label={ult.value.toolbarTips?.strikeThrough}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'strikeThrough' });
        }}
        type="button"
      >
        <Icon name="strike-through" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.strikeThrough}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarStrikeThrough;
