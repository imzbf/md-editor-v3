<script setup lang="ts">
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';

import data from './data.md'

import 'md-editor-v3/lib/style.css';

const text = ref(data);
</script>

<template>
  <MdEditor v-model="text" noIconfont pageFullscreen />
</template>
