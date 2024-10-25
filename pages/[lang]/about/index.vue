<template>
  <div class="container">
    <div class="doc">
      <IzPreviewContent editorId="md-about" :modelValue="mdText" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '@/store';
import IzPreviewContent from '@/layouts/PreviewContent/index.vue';

import mdEN from '@/public/about-en-US.md';
import mdCN from '@/public/about-zh-CN.md';

const store = useStore();

const mdText = ref(store.lang === 'en-US' ? mdEN : mdCN);
const queryMd = () => {
  mdText.value = store.lang === 'en-US' ? mdEN : mdCN;
};
watch(() => store.lang, queryMd);

useHead({
  title:
    store.lang === 'en-US'
      ? 'About - MdEditorV3 Documentation'
      : '关于 - MdEditorV3 使用文档',
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
  name: 'AboutPage',
};
</script>
