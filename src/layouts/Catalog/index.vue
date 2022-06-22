<template>
  <div class="catalog">
    <div class="affix">
      <md-catalog
        :editor-id="props.editorId"
        :theme="store.state.theme"
        :scroll-element="scrollElement"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IzCatalog'
};
</script>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const props = defineProps({
  editorId: {
    type: String as PropType<string>,
    default: ''
  }
});

const scrollElement = document.documentElement;
</script>
