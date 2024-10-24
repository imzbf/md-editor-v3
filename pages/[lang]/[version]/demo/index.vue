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
import { useStore } from '@/store';
import { version as EDITOR_VERSION } from '../../../../package.json';

import mdEN from '../../../public/demo-en-US.md';
import mdCN from '../../../public/demo-zh-CN.md';
import { replaceTemplate } from '@/utils';
import IzCatalog from '@/layouts/Catalog/index.vue';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';

const store = useStore();

const editorId = 'demo-preview';

const mdText = ref(
  replaceTemplate(store.lang === 'en-US' ? mdEN : mdCN, {
    EDITOR_VERSION,
  })
);
const queryMd = () => {
  mdText.value = replaceTemplate(store.lang === 'en-US' ? mdEN : mdCN, {
    EDITOR_VERSION,
  });
};
watch(() => store.lang, queryMd);
</script>

<script lang="ts">
export default {
  name: 'DemoPage',
};
</script>
