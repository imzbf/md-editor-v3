import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { REPLACE } from '~/static/event-name';
import { StaticTextDefaultValue } from '~/type';
import eventBus from '~/utils/event-bus';

const ToolbarUnderline = defineComponent({
  name: 'ToolbarUnderline',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[`${prefix}-toolbar-item`, disabled?.value && `${prefix}-disabled`]}
        title={ult.value.toolbarTips?.underline}
        disabled={disabled?.value}
        onClick={() => {
          eventBus.emit(editorId, REPLACE, 'underline');
        }}
        type="button"
      >
        <Icon name="underline" />
        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.underline}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarUnderline;
