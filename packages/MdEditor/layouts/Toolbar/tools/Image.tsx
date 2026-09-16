import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarImage = defineComponent({
  name: 'ToolbarImage',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.image}
        aria-label={ult.value.toolbarTips?.image}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'image' });
        }}
        type="button"
      >
        <Icon name="image" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>{ult.value.toolbarTips?.image}</div>
        )}
      </button>
    );
  }
});

export default ToolbarImage;
