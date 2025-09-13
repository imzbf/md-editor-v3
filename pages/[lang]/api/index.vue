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
import { DESCRIPTION_CN, DESCRIPTION_EN, KEYWORDS_CN, KEYWORDS_EN, SITE_NAME_CN, SITE_NAME_EN } from '~/config';
import IzCatalog from '@/layouts/Catalog/index.vue';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';
import mdEN from '@/public/api-en-US.md';
import mdCN from '@/public/api-zh-CN.md';
import { useStore } from '@/store';
import { replaceTemplate } from '@/utils';
const store = useStore();

const editorId = 'doc-preview';

const mdText = ref(replaceTemplate(store.lang === 'en-US' ? mdEN : mdCN, {}));
const queryMd = () => {
  mdText.value = replaceTemplate(store.lang === 'en-US' ? mdEN : mdCN, {});
};
watch(() => store.lang, queryMd);

useHead({
  title: store.lang === 'en-US' ? `API - ${SITE_NAME_EN}` : `API - ${SITE_NAME_CN}`,
  meta: [
    {
      name: 'keywords',
      content: store.lang === 'en-US' ? KEYWORDS_EN : KEYWORDS_CN,
    },
    {
      name: 'description',
      content: store.lang === 'en-US' ? DESCRIPTION_EN : DESCRIPTION_CN,
    },
  ],
});
</script>

<script lang="ts">
export default {
  name: 'DocPage',
};
</script>
