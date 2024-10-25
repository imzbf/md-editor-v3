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
import { replaceTemplate } from '@/utils';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';
import IzCatalog from '@/layouts/Catalog/index.vue';
import mdEN from '@/public/api-en-US.md';
import mdCN from '@/public/api-zh-CN.md';

const store = useStore();

const editorId = 'doc-preview';

const mdText = ref(replaceTemplate(store.lang === 'en-US' ? mdEN : mdCN, {}));
const queryMd = () => {
  mdText.value = replaceTemplate(store.lang === 'en-US' ? mdEN : mdCN, {});
};
watch(() => store.lang, queryMd);

useHead({
  title:
    store.lang === 'en-US'
      ? 'API - MdEditorV3 Documentation'
      : 'API - MdEditorV3 使用文档',
  meta: [
    {
      name: 'keywords',
      content:
        store.lang === 'en-US'
          ? 'MD Editor, md-editor-v3, Markdown Editor, Vue3 Markdown, Vue TSX, Markdown Component, Markdown preview, Vue3 Editor'
          : 'MD Editor, md-editor-v3, Markdown 编辑器, Vue3 Markdown, Vue TSX, Markdown 组件, Markdown preview, Vue3 编辑器',
    },
    {
      name: 'description',
      content:
        store.lang === 'en-US'
          ? 'md-editor-v3 is a Markdown editor component developed based on Vue 3 and TSX, supporting real-time preview and rich Markdown features. Review the detailed development documentation and usage examples.'
          : 'md-editor-v3 是一个基于 Vue 3 和 TSX 开发的 Markdown 编辑器组件，支持实时预览和丰富的 Markdown 功能。查阅详细的开发文档与使用示例。',
    },
  ],
});
</script>

<script lang="ts">
export default {
  name: 'DocPage',
};
</script>
