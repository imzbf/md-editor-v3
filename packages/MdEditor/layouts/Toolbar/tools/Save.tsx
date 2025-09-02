import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { ON_SAVE } from '~/static/event-name';
import { StaticTextDefaultValue } from '~/type';
import bus from '~/utils/event-bus';

const ToolbarSave = defineComponent({
  name: 'ToolbarSave',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, disabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.save}
        disabled={disabled?.value}
        onClick={() => {
          bus.emit(editorId, ON_SAVE);
        }}
      >
        <Icon name="save" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>{ult.value.toolbarTips?.save}</div>
        )}
      </button>
    );
  }
});

export default ToolbarSave;
