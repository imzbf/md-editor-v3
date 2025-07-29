import { defineComponent, PropType, reactive, ref, watch, computed } from 'vue';
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

const TableShape = defineComponent({
  name: 'TableShape',
  props,
  setup(props) {
    const hoverPosition = reactive<HoverData>({
      x: -1,
      y: -1
    });

    const tableShapeStr = computed(() => {
      return JSON.stringify(props.tableShape);
    });

    const initShape = () => {
      const shape: number[] = [...JSON.parse(tableShapeStr.value)];

      if (!shape[2] || shape[2] < shape[0]) {
        shape[2] = shape[0];
      }

      if (!shape[3] || shape[3] < shape[3]) {
        shape[3] = shape[1];
      }

      return shape;
    };

    const tableShape = ref(initShape());

    watch([tableShapeStr], () => {
      tableShape.value = initShape();
    });

    return () => (
      <div
        class={`${prefix}-table-shape`}
        onMouseleave={() => {
          tableShape.value = initShape();
          hoverPosition.x = -1;
          hoverPosition.y = -1;
        }}
      >
        {new Array(tableShape.value[1]).fill('').map((_, rowIndex) => (
          <div class={`${prefix}-table-shape-row`} key={`table-shape-row-${rowIndex}`}>
            {new Array(tableShape.value[0]).fill('').map((_, colIndex) => (
              <div
                class={`${prefix}-table-shape-col`}
                key={`table-shape-col-${colIndex}`}
                onMouseenter={() => {
                  hoverPosition.x = rowIndex;
                  hoverPosition.y = colIndex;

                  if (
                    colIndex + 1 === tableShape.value[0] &&
                    colIndex + 1 < tableShape.value[2]
                  ) {
                    tableShape.value[0]++;
                  } else if (
                    colIndex + 2 < tableShape.value[0] &&
                    tableShape.value[0] > props.tableShape[0]
                  ) {
                    tableShape.value[0]--;
                  }

                  if (
                    rowIndex + 1 === tableShape.value[1] &&
                    rowIndex + 1 < tableShape.value[3]
                  ) {
                    tableShape.value[1]++;
                  } else if (
                    rowIndex + 2 < tableShape.value[1] &&
                    tableShape.value[1] > props.tableShape[1]
                  ) {
                    tableShape.value[1]--;
                  }
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
