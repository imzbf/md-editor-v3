<template>
  <NuxtLoadingIndicator />
</template>

<script setup lang="ts">
import { DESCRIPTION_EN, KEYWORDS_EN, SITE_NAME_EN } from '~/config';

useHead({
  title: `Redirect - ${SITE_NAME_EN}`,
  meta: [
    {
      name: 'keywords',
      content: KEYWORDS_EN,
    },
    {
      name: 'description',
      content: DESCRIPTION_EN,
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
