<template>
  <NormalToolbar title="普通扩展">
    {{ props.language }}
  </NormalToolbar>
</template>

<script lang="ts">
export default {
  name: 'NormalTest'
};
</script>

<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { NormalToolbar } from '~~/index';

const props = defineProps({
  theme: {
    type: String
  },
  language: {
    type: String
  },
  insert: {
    type: Function
  }
});
</script>
