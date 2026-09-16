import { ComputedRef, computed, defineComponent, inject, ref } from 'vue';
import TableShape from '../TableShape';
import Dropdown from '~/components/Dropdown';
import Icon from '~/components/Icon';
import { prefix } from '~/config';
import { StaticTextDefaultValue } from '~/type';
import { emitReplace } from '~/utils/replace';

const ToolbarTable = defineComponent({
  name: 'ToolbarTable',

  setup() {
    const editorId = inject('editorId') as string;
    const ult = inject('usedLanguageText') as ComputedRef<StaticTextDefaultValue>;
    const contentDisabled = inject<ComputedRef<boolean>>('contentDisabled');
    const showToolbarName = inject<ComputedRef<boolean>>('showToolbarName');
    const tableShape = inject('tableShape') as ComputedRef<Array<number>>;

    const wrapperId = `${editorId}-toolbar-wrapper`;
    const visible = ref(false);

    const handleDropdownChange = (value: boolean) => {
      visible.value = value;
    };

    const handleSelected = (selectedShape: { x: number; y: number }) => {
      if (contentDisabled?.value) {
        return;
      }

      emitReplace(editorId, { direct: 'table', params: { selectedShape } });
    };

    const overlayContent = computed(() => (
      <TableShape tableShape={tableShape.value} onSelected={handleSelected} />
    ));

    return () => (
      <Dropdown
        relative={`#${wrapperId}`}
        visible={visible.value}
        onChange={handleDropdownChange}
        disabled={contentDisabled?.value}
        key="bar-table"
        overlay={overlayContent.value}
      >
        <button
          class={[
            `${prefix}-toolbar-item`,
            contentDisabled?.value && `${prefix}-disabled`
          ]}
          title={ult.value.toolbarTips?.table}
          aria-label={ult.value.toolbarTips?.table}
          disabled={contentDisabled?.value}
          type="button"
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
