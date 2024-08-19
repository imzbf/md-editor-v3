<template>
  <MdEditor v-model="text" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor, config } from 'md-editor-v3';
import screenfull from 'screenfull';
import katex from 'katex';
import Cropper from 'cropperjs';
import mermaid from 'mermaid';
import highlight from 'highlight.js';

// >=3.0
import * as prettier from 'prettier';
import parserMarkdown from 'prettier/plugins/markdown';

import md from './data.md';

config({
  iconfontType: 'class',
  editorExtensions: {
    prettier: {
      prettierInstance: prettier,
      parserMarkdownInstance: parserMarkdown
    },
    highlight: {
      instance: highlight
    },
    screenfull: {
      instance: screenfull
    },
    katex: {
      instance: katex
    },
    cropper: {
      instance: Cropper
    },
    mermaid: {
      instance: mermaid
    }
  }
});

const text = ref(md);
</script>

<style lang="css">
@import 'md-editor-v3/lib/style.css';
@import 'highlight.js/styles/atom-one-dark.css';
@import 'cropperjs/dist/cropper.css';
@import 'katex/dist/katex.min.css';

@import './iconfont.css';
</style>
