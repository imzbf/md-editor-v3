<script setup lang="ts">
import { MdEditor, MdPreview, MdCatalog } from 'md-editor-v3';
import { ref } from 'vue';

const text = ref(
  '# md-editor-v3\n\n## Nuxt\n\nEdit this Markdown to update the preview.'
);
const previewId = 'article-preview';
</script>

<template>
  <main>
    <h1>Markdown editor</h1>
    <MdEditor id="article-editor" v-model="text" />
    <h2>Article preview</h2>
    <div class="article">
      <MdPreview :id="previewId" :modelValue="text" />
      <aside aria-label="Article contents">
        <MdCatalog :editorId="previewId" scrollElement="html" />
      </aside>
    </div>
  </main>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
.article {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 24px;
  align-items: start;
}
.article aside {
  position: sticky;
  top: 24px;
}
@media (max-width: 720px) {
  .article {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
