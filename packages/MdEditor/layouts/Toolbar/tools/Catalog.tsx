import { ComputedRef, defineComponent, inject, PropType } from 'vue';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { CHANGE_CATALOG_VISIBLE } from '~/static/event-name';
import { StaticTextDefaultValue } from '~/type';
import bus from '~/utils/event-bus';

const ToolbarCatalog = defineComponent({
  name: 'ToolbarCatalog',
  props: {
    catalogVisible: {
      type: Boolean as PropType<boolean>,
      default: undefined
    }
  },
  setup(props) {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');

    return () => (
      <button
        class={[
          `${prefix}-toolbar-item`,
          props.catalogVisible && `${prefix}-toolbar-active`,
          disabled?.value && `${prefix}-disabled`
        ]}
        title={ult.value.toolbarTips?.catalog}
        disabled={disabled?.value}
        onClick={() => {
          bus.emit(editorId, CHANGE_CATALOG_VISIBLE);
        }}
        key="bar-catalog"
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
