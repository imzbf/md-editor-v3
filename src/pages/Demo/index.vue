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
import { version as EDITOR_VERSION } from '../../../package.json';

import mdEN from '../../../public/demo-en-US.md';
import mdCN from '../../../public/demo-zh-CN.md';
import { replaceTemplate } from '@/utils';
import IzCatalog from '@/layouts/Catalog/index.vue';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';

const store = useStore();

const editorId = 'demo-preview';

const mdText = ref(
  replaceTemplate(store.state.lang === 'en-US' ? mdEN : mdCN, {
    iconfontSvgUrl,
    iconfontClassUrl,
    EDITOR_VERSION
  })
);
const queryMd = () => {
  mdText.value = replaceTemplate(store.state.lang === 'en-US' ? mdEN : mdCN, {
    iconfontSvgUrl,
    iconfontClassUrl,
    EDITOR_VERSION
  });
};
watch(() => store.state.lang, queryMd);
</script>

<script lang="ts">
export default {
  name: 'DemoPage'
};
</script>
