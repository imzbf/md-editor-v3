<template>
  <normal-toolbar title="mark" @on-click="markHandler">
    <template #trigger>
      <svg class="md-editor-icon" aria-hidden="true">
        <use xlink:href="#icon-mark"></use>
      </svg>
    </template>
  </normal-toolbar>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
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
      targetValue: `@${selectedText}@`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0
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
