<script setup lang="ts">
import { MdEditor } from 'md-editor-v3';
import { ref } from 'vue';
import markdown from './data.md?raw';
import 'md-editor-v3/lib/style.css';

const text = ref(markdown);
</script>

<template>
  <MdEditor v-model="text" pageFullscreen />
</template>
