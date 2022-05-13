<script setup lang="ts">
import { onMounted } from 'vue';
import './style.less';

onMounted(() => {
  if (import.meta.env.MODE === 'preview') {
    const hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?1563bc52cb27ffbc7b5b46cdfc327ce0';
    document.head.appendChild(hm);
  }
});
</script>

<template>
  <router-view />
</template>
