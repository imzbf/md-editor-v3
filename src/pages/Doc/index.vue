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
import { iconfontSvgUrl, iconfontClassUrl } from 'md-editor-v3';
import { replaceTemplate } from '@/utils';
import mdEN from '../../../public/doc-en-US.md';
import mdCN from '../../../public/doc-zh-CN.md';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';
import IzCatalog from '@/layouts/Catalog/index.vue';

const store = useStore();

const editorId = 'doc-preview';

const mdText = ref(
  replaceTemplate(store.state.lang === 'en-US' ? mdEN : mdCN, {
    iconfontSvgUrl,
    iconfontClassUrl
  })
);
const queryMd = () => {
  mdText.value = replaceTemplate(store.state.lang === 'en-US' ? mdEN : mdCN, {
    iconfontSvgUrl,
    iconfontClassUrl
  });
};
watch(() => store.state.lang, queryMd);
</script>

<script lang="ts">
export default {
  name: 'DocPage'
};
</script>
