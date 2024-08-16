<template>
  <!-- in nuxt, editor-id must be set. -->
  <MdEditor v-model="text" editor-id="myId" />
</template>

<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('# md-editor-v3');
</script>
