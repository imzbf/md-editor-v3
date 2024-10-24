<template>
  <!-- {{ DropdownTrigger }} -->
  <DropdownTrigger
    v-if="teleportTo"
    ref="triggerRef"
    @mouseenter="setVisible(true)"
    @mouseleave="setVisible(false)"
  />
  <slot v-else />
  <!-- {{ ddd }} -->
  <Teleport :to="teleportTo" v-if="teleportTo">
    <div
      :class="state.class"
      :style="state.style"
      ref="contentRef"
      @mouseenter="setVisible(true)"
      @mouseleave="setVisible(false)"
    >
      <!-- {(slots.content as Function)()} -->
      <slot name="content" />
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import {
  reactive,
  cloneVNode,
  useSlots,
  watch,
  ref,
  h,
  Teleport,
  type CSSProperties,
} from 'vue';
import { debounce } from '@vavt/util';
import './index.less';

// const IzDropdown = defineComponent(() => {
const slots = useSlots();
const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();

const teleportTo = ref<HTMLElement>();

const state = reactive<{
  visible: boolean;
  style: CSSProperties;
  class: string[];
}>({
  visible: false,
  style: {
    top: 0,
    left: 0,
  },
  class: ['dropdown-content', 'animated'],
});

const resetClass = (visible = true) => {
  state.class = ['dropdown-content', visible ? 'dropdown-active' : ''];
};

const changeVisibility = (visible = true) => {
  state.class = [
    'dropdown-content',
    'dropdown-active',
    'animated',
    visible ? 'dropdown-enter' : 'dropdown-leave',
  ];

  setTimeout(() => {
    resetClass(visible);
  }, 300);
};

const setVisible = debounce((visible = true) => {
  state.visible = visible as boolean;
});

watch(
  () => state.visible,
  (visible) => {
    if (visible) {
      const offsetValue = getOffset(triggerRef.value as HTMLElement);
      const triggerWidth = triggerRef.value?.offsetWidth || 0;
      const triggerHeight = triggerRef.value?.offsetHeight || 0;

      const contentWidth = contentRef.value?.offsetWidth || 0;

      state.style.left =
        offsetValue.left + triggerWidth / 2 - contentWidth / 2 + 'px';
      state.style.top = offsetValue.top + triggerHeight + 'px';
      changeVisibility(true);
    } else {
      changeVisibility(false);
    }
  }
);

const DropdownTrigger = ref();

onMounted(() => {
  teleportTo.value = document.body;

  DropdownTrigger.value = cloneVNode(slots.default!()[0]);
});

// return () => {
// const DropdownTrigger = cloneVNode(slots.default()[0], {
//   ref: triggerRef,
//   onMouseenter() {
//     setVisible(true);
//   },
//   onMouseleave() {
//     setVisible(false);
//   },
// });

// const ddd = slots.default()[0];

// console.log('slots', slots.default()[0], DropdownTrigger);

// return (

// );
// };
// });
</script>
