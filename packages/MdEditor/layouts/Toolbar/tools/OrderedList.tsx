import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarOrderedList = defineComponent({
  name: 'ToolbarOrderedList',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.orderedList}
        aria-label={ult.value.toolbarTips?.orderedList}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'orderedList' });
        }}
        type="button"
      >
        <Icon name="ordered-list" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.orderedList}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarOrderedList;
