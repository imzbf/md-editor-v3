import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarTask = defineComponent({
  name: 'ToolbarTask',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, contentDisabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.task}
        aria-label={ult.value.toolbarTips?.task}
        disabled={contentDisabled?.value}
        onClick={() => {
          emitReplace(editorId, { direct: 'task' });
        }}
        type="button"
      >
        <Icon name="task" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>{ult.value.toolbarTips?.task}</div>
        )}
      </button>
    );
  }
});

export default ToolbarTask;
