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
import pack from '@/package.json';

import mdEN from '@/public/demo-en-US.md';
import mdCN from '@/public/demo-zh-CN.md';
import IzCatalog from '@/layouts/Catalog/index.vue';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';
import { replaceTemplate } from '@/utils';
import {
  DESCRIPTION_CN,
  DESCRIPTION_EN,
  KEYWORDS_CN,
  KEYWORDS_EN,
  SITE_NAME_CN,
  SITE_NAME_EN,
} from '~/config';
const store = useStore();

const editorId = 'demo-preview';

const mdText = ref(
  replaceTemplate(store.lang === 'en-US' ? mdEN : mdCN, {
    EDITOR_VERSION: pack.dependencies['md-editor-v3'].replace('^', ''),
  })
);
const queryMd = () => {
  mdText.value = replaceTemplate(store.lang === 'en-US' ? mdEN : mdCN, {
    EDITOR_VERSION: pack.dependencies['md-editor-v3'].replace('^', ''),
  });
};
watch(() => store.lang, queryMd);

useHead({
  title:
    store.lang === 'en-US'
      ? `Example - ${SITE_NAME_EN}`
      : `示例 - ${SITE_NAME_CN}`,
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
  name: 'DemoPage',
};
</script>
