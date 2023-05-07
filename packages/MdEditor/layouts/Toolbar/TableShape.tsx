import { defineComponent, PropType, reactive, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { prefix } from '~/config';

interface HoverData {
  x: number;
  y: number;
}

const props = {
  tableShape: {
    type: Array as PropType<Array<number>>,
    default: () => [6, 4]
  },
  onSelected: {
    type: Function as PropType<(data: HoverData) => void>,
    default: () => {}
  }
};

type TableShapeProps = Readonly<LooseRequired<Readonly<ExtractPropTypes<typeof props>>>>;

const TableShape = defineComponent({
  name: 'TableShape',
  props,
  setup(props: TableShapeProps) {
    const hoverPosition = reactive<HoverData>({
      x: -1,
      y: -1
    });

    return () => (
      <div
        class={`${prefix}-table-shape`}
        onMouseleave={() => {
          hoverPosition.x = -1;
          hoverPosition.y = -1;
        }}
      >
        {new Array(props.tableShape[1]).fill('').map((_, rowIndex) => (
          <div class={`${prefix}-table-shape-row`} key={`table-shape-row-${rowIndex}`}>
            {new Array(props.tableShape[0]).fill('').map((_, colIndex) => (
              <div
                class={`${prefix}-table-shape-col`}
                key={`table-shape-col-${colIndex}`}
                onMouseenter={() => {
                  hoverPosition.x = rowIndex;
                  hoverPosition.y = colIndex;
                }}
                onClick={() => {
                  props.onSelected(hoverPosition);
                }}
              >
                <div
                  class={[
                    `${prefix}-table-shape-col-default`,
                    rowIndex <= hoverPosition.x &&
                      colIndex <= hoverPosition.y &&
                      `${prefix}-table-shape-col-include`
                  ]}
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
});

export default TableShape;
