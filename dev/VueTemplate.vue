<template>
  <div class="container">
    <div style="margin: 1em 0">
      <button @click="changeVisible">点击</button>
    </div>
    <md-editor v-if="visible" v-model="text" :scroll-auto="false" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MdEditor from '~~/MdEditor';
import data from './data.md';

const text = ref(data);
const visible = ref(true);

const changeVisible = () => {
  visible.value = !visible.value;
};
</script>
