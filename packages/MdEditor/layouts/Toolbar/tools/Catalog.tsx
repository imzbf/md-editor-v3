import { ComputedRef, defineComponent, inject } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { CHANGE_CATALOG_VISIBLE } from '~/static/event-name';
import { StaticTextDefaultValue } from '~/type';
import bus from '~/utils/event-bus';

const ToolbarCatalog = defineComponent({
  name: 'ToolbarCatalog',
  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');
    const catalogVisible = inject('catalogVisible') as ComputedRef<boolean>;

    return () => (
      <button
        class={[
          `${prefix}-toolbar-item`,
          catalogVisible.value && `${prefix}-toolbar-active`,
          disabled?.value && `${prefix}-disabled`
        ]}
        title={ult.value.toolbarTips?.catalog}
        aria-label={ult.value.toolbarTips?.catalog}
        disabled={disabled?.value}
        onClick={() => {
          bus.emit(editorId, CHANGE_CATALOG_VISIBLE);
        }}
        key="bar-catalog"
        type="button"
      >
        <Icon name="catalog" />

        {showToolbarName?.value && (
          <div class={`${prefix}-toolbar-item-name`}>
            {ult.value.toolbarTips?.catalog}
          </div>
        )}
      </button>
    );
  }
});

export default ToolbarCatalog;
