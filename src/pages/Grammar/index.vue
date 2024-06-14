<template>
  <div class="container">
    <div class="doc">
      <IzPreviewContent :editorId="editorId" :modelValue="mdText" />
      <IzCatalog :editorId="editorId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import mdEN from '../../../public/grammar-en-US.md';
import mdCN from '../../../public/grammar-zh-CN.md';
import IzCatalog from '@/layouts/Catalog/index.vue';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';

const store = useStore();

const editorId = 'grammar-preview';

const mdText = ref(store.state.lang === 'en-US' ? mdEN : mdCN);
const queryMd = () => {
  mdText.value = store.state.lang === 'en-US' ? mdEN : mdCN;
};
watch(() => store.state.lang, queryMd);
</script>

<script lang="ts">
export default {
  name: 'DemoPage'
};
</script>
