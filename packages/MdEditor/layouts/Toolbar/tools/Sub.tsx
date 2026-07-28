import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarSub = defineComponent({
  name: 'ToolbarSub',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.sub}
        aria-label={ult.value.toolbarTips?.sub}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'sub' });
        }}
        type="button"
      >
        <Icon name="sub" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>{ult.value.toolbarTips?.sub}</div>
        )}
      </button>
    );
  }
});

export default ToolbarSub;
