<template>
  <div v-if="scrollTop > 20" class="back-top" @click="backTop">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-top"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const scrollTop = ref(0);

const backTop = () => {
  document.documentElement.scroll({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  document.addEventListener('scroll', () => {
    scrollTop.value = document.documentElement.scrollTop;
  });
});
</script>

<script lang="ts">
export default {
  name: 'IzBackTop'
};
</script>

<style lang="less">
.back-top {
  position: fixed;
  right: 40px;
  bottom: 30px;
  font-size: 26px;
  cursor: pointer;
}
</style>
