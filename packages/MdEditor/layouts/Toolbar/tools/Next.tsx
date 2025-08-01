import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { CTRL_SHIFT_Z } from '~/static/event-name';
import { StaticTextDefaultValue } from '~/type';
import bus from '~/utils/event-bus';

const ToolbarNext = defineComponent({
  name: 'ToolbarNext',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, disabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.next}
        disabled={disabled?.value}
        onClick={() => {
          bus.emit(editorId, CTRL_SHIFT_Z);
        }}
      >
        <Icon name="next" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>{ult.value.toolbarTips?.next}</div>
        )}
      </button>
    );
  }
});

export default ToolbarNext;
