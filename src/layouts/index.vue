<template>
  <div class="docs-page">
    <IzHeader />
    <RouterView />
    <BackTop>
      <svg class="icon" aria-hidden="true" style="font-size: 26px; cursor: pointer">
        <use xlink:href="#icon-top"></use>
      </svg>
    </BackTop>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import BackTop from '@/components/BackTop/index.vue';
import IzHeader from './Header/index.vue';
import { useStore } from 'vuex';

const store = useStore();

const changeClass = () => {
  if (store.state.theme === 'dark') {
    document.documentElement.className = 'theme-dark';
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.documentElement.className = '';
    document.body.removeAttribute('arco-theme');
  }
};

watch(
  () => store.state.theme,
  () => {
    if (store.state.theme === 'dark') {
      document.documentElement.className = 'theme-dark';
    } else {
      document.documentElement.className = '';
    }
  }
);

onMounted(changeClass);
</script>

<script lang="ts">
export default {
  name: 'IzLayout'
};
</script>
