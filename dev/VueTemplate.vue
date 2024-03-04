<template>
  <div class="container">
    <div style="margin: 1em 0">
      <button @click="changeVisible">点击</button>
    </div>
    <MdEditorV3
      v-if="visible"
      v-model="text"
      @on-drop="onDrop"
      @on-change="onChange"
      @on-input="onInput"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import data from './data.md';

const text = ref(data);
const visible = ref(true);

const changeVisible = () => {
  visible.value = !visible.value;
};

const onDrop = (e: DragEvent) => {
  console.log('e', e);
};

watch(
  () => text.value,
  () => {
    console.log('v-model');
  }
);

const onChange = () => {
  console.log('onChange');
};

const onInput = () => {
  console.log('onInput');
};
</script>
