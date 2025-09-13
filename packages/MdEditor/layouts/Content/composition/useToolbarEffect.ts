import { ComputedRef, ref, watch } from 'vue';
import { ToolbarNames } from '~/type';

const arraysEqual = (prev: ToolbarNames[], curr: ToolbarNames[]) => {
  if (prev === curr) return true;
  if (prev.length !== curr.length) return false;
  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== curr[i]) return false;
  }
  return true;
};

export const useToolbarEffect = (
  effect: () => void,
  deps: ComputedRef<ToolbarNames[]>
) => {
  const prev = ref<ToolbarNames[]>(deps.value);

  watch([deps], () => {
    if (!prev.value || !arraysEqual(prev.value, deps.value)) {
      prev.value = deps.value;
      effect();
    }
  });
};
