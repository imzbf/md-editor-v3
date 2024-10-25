<template>
  <NuxtLoadingIndicator />
</template>

<script setup lang="ts">
useHead({
  title: 'Redirect - MdEditorV3 Documentation',
  meta: [
    {
      name: 'keywords',
      content:
        'MD Editor, md-editor-v3, Markdown Editor, Vue3 Markdown, Vue TSX, Markdown Component, Markdown preview, Vue3 Editor',
    },
    {
      name: 'description',
      content:
        'md-editor-v3 is a Markdown editor component developed based on Vue 3 and TSX, supporting real-time preview and rich Markdown features. Review the detailed development documentation and usage examples.',
    },
  ],
});

// passing 'to' as a string
onMounted(async () => {
  await navigateTo(`/${navigator.language === 'zh-CN' ? 'zh-CN' : 'en-US'}`);
});

// ... or as a route object
// await navigateTo({ path: '/search' })

// // ... or as a route object with query parameters
// await navigateTo({
//   path: '/search',
//   query: {
//     page: 1,
//     sort: 'asc'
//   }
// })
</script>
