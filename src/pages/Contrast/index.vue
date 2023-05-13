<template>
  <div class="container">
    <div class="doc">
      <IzPreviewContent :editorId="editorId" :modelValue="mdText" />
      <IzCatalog :editorId="editorId" />
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'ContrastPage' };
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import mdEN from '../../../public/contrast-en-US-3.md';
import mdCN from '../../../public/contrast-zh-CN-3.md';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';
import IzCatalog from '@/layouts/Catalog/index.vue';

const store = useStore();

const editorId = 'doc-contrast';

const mdText = ref(store.state.lang === 'en-US' ? mdEN : mdCN);
const queryMd = () => {
  mdText.value = store.state.lang === 'en-US' ? mdEN : mdCN;
};
watch(() => store.state.lang, queryMd);
</script>
