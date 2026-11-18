<script setup lang="ts">
import { MdEditor } from 'md-editor-v3';
import { ref } from 'vue';
import markdown from './data.md?raw';

const text = ref(markdown);
</script>

<template>
  <MdEditor v-model="text" />
</template>

<style>
@import 'md-editor-v3/lib/style.css';
@import 'highlight.js/styles/atom-one-dark.css';
@import 'cropperjs/dist/cropper.css';
@import 'katex/dist/katex.min.css';

:host {
  display: block;
}
</style>
