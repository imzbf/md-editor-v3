import { draggingScroll } from '@vavt/util';
import {
  computed,
  defineComponent,
  inject,
  ref,
  watch,
  nextTick,
  ComputedRef
} from 'vue';
import { prefix } from '~/config';
import { useBarRender } from './composition';
import { toolbarProps as props } from './props';

export default defineComponent({
  name: 'MDEditorToolbar',
  props,
  setup(props) {
    // 获取Id
    const editorId = inject('editorId') as string;
    const showToolbarName = inject('showToolbarName') as ComputedRef<boolean>;
    // wrapper ID
    const wrapperId = `${editorId}-toolbar-wrapper`;

    const wrapperRef = ref<HTMLDivElement>();

    // 监控左边的操作栏
    const toolbarLeftRef = ref<HTMLDivElement>();
    // end

    const { barRender } = useBarRender();

    // 通过'='分割左右
    const splitedbar = computed(() => {
      const excluedBars = props.toolbars.filter(
        (barItem) => !props.toolbarsExclude.includes(barItem)
      );
      const moduleSplitIndex = excluedBars.indexOf('=');

      // 左侧部分
      const barLeft =
        moduleSplitIndex === -1
          ? excluedBars
          : excluedBars.slice(0, moduleSplitIndex + 1);

      const barRight =
        moduleSplitIndex === -1
          ? []
          : excluedBars.slice(moduleSplitIndex, Number.MAX_SAFE_INTEGER);

      return [barLeft, barRight];
    });

    watch(
      () => props.toolbars,
      () => {
        void nextTick(() => {
          if (wrapperRef.value) {
            draggingScroll(wrapperRef.value);
          }
        });
      },
      { immediate: true }
    );

    return () => {
      const LeftBar = splitedbar.value[0].map((barItem) => barRender(barItem));
      const RightBar = splitedbar.value[1].map((barItem) => barRender(barItem));

      return (
        <>
          {props.toolbars.length > 0 && (
            <div class={`${prefix}-toolbar-wrapper`} ref={wrapperRef} id={wrapperId}>
              <div
                class={[`${prefix}-toolbar`, showToolbarName.value && `${prefix}-stn`]}
              >
                <div class={`${prefix}-toolbar-left`} ref={toolbarLeftRef}>
                  {LeftBar}
                </div>
                <div class={`${prefix}-toolbar-right`}>{RightBar}</div>
              </div>
            </div>
          )}
        </>
      );
    };
  }
});
