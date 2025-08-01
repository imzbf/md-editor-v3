import { ComputedRef, defineComponent, inject, PropType, ref } from 'vue';
import Dropdown from '~/components/Dropdown';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { REPLACE } from '~/static/event-name';
import { StaticTextDefaultValue } from '~/type';
import bus from '~/utils/event-bus';
import TableShape from '../TableShape';

const ToolbarTable = defineComponent({
  name: 'ToolbarTable',
  props: {
    tableShape: {
      type: Array as PropType<Array<number>>,
      default: () => [6, 4]
    }
  },
  setup(props) {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const disabled = inject<ComputedRef<boolean>>('disabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');
    const wrapperId = `${editorId}-toolbar-wrapper`;
    const visible = ref(false);

    return () => (
      <Dropdown
        relative={`#${wrapperId}`}
        visible={visible.value}
        onChange={(v) => {
          visible.value = v;
        }}
        disabled={disabled?.value}
        key="bar-table"
        overlay={
          <TableShape
            tableShape={props.tableShape}
            onSelected={(selectedShape) => {
              if (disabled?.value) return;
              bus.emit(editorId, REPLACE, 'table', { selectedShape });
            }}
          />
        }
      >
        <button
          class={[`${prefix}-toolbar-item`, disabled?.value && `${prefix}-disabled`]}
          title={ult.value.toolbarTips?.table}
          disabled={disabled?.value}
        >
          <Icon name="table" />
          {showToolbarName?.value && (
            <div class={`${prefix}-toolbar-item-name`}>
              {ult.value.toolbarTips?.table}
            </div>
          )}
        </button>
      </Dropdown>
    );
  }
});

export default ToolbarTable;
