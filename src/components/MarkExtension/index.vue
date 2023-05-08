<template>
  <NormalToolbar title="mark" @onClick="markHandler">
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-mark"></use>
      </svg>
    </template>
  </NormalToolbar>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { NormalToolbar } from 'md-editor-v3';
import type { InsertContentGenerator } from 'md-editor-v3';

const props = defineProps({
  onInsert: {
    type: Function as PropType<(generator: InsertContentGenerator) => void>,
    default: () => () => null
  }
});

const markHandler = () => {
  const generator: InsertContentGenerator = (selectedText) => {
    return {
      targetValue: `==${selectedText}==`,
      select: true,
      deviationStart: 2,
      deviationEnd: -2
    };
  };

  props.onInsert(generator);
};
</script>

<script lang="ts">
export default {
  name: 'MarkExtension'
};
</script>
