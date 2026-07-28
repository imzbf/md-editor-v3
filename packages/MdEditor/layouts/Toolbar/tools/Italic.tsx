import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarItalic = defineComponent({
  name: 'ToolbarItalic',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.italic}
        aria-label={ult.value.toolbarTips?.italic}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'italic' });
        }}
        type="button"
      >
        <Icon name="italic" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>{ult.value.toolbarTips?.italic}</div>
        )}
      </button>
    );
  }
});

export default ToolbarItalic;
