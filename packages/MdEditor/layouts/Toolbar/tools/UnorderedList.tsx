import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarUnorderedList = defineComponent({
  name: 'ToolbarUnorderedList',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.unorderedList}
        aria-label={ult.value.toolbarTips?.unorderedList}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'unorderedList' });
        }}
        type="button"
      >
        <Icon name="unordered-list" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.unorderedList}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarUnorderedList;
