import {
  defineComponent,
  reactive,
  cloneVNode,
  useSlots,
  watch,
  ref,
  Teleport,
  computed
} from 'vue';
import './index.less';

const enterClass = 'animated ';
const leaveClass = '';

export default defineComponent({
  name: 'IzDropdown',
  setup() {
    const slots = useSlots();
    const triggerRef = ref<HTMLElement>();

    const state = reactive({
      visible: false
    });

    watch(
      () => state.visible,
      () => {
        console.log(state.visible, triggerRef.value);
      }
    );

    const to = document.body;

    return () => {
      const DropdownTrigger = cloneVNode((slots.default as Function)()[0], {
        ref: triggerRef,
        onMouseenter() {
          state.visible = true;
        },
        onMouseleave() {
          state.visible = false;
        }
      });

      return (
        <>
          {DropdownTrigger}
          <Teleport to={to}>
            <div class="dropdown-content">{(slots.content as Function)()}</div>
          </Teleport>
        </>
      );
    };
  }
});
