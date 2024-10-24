<template>
  <ul class="nav-list">
    <li class="nav-item">
      <NuxtLink :to="routePrefix" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-online"></use>
        </svg>
        {{ linkNames.home }}
      </NuxtLink>
    </li>
    <li class="nav-item">
      <NuxtLink :to="`${routePrefix}/docs`" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-docs"></use>
        </svg>
        {{ linkNames.docs }}
      </NuxtLink>
    </li>
    <li class="nav-item">
      <NuxtLink :to="`${routePrefix}/demo`" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-demo"></use>
        </svg>
        {{ linkNames.demo }}
      </NuxtLink>
    </li>
    <li class="nav-item">
      <a href="https://github.com/imzbf/md-editor-v3" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-github"></use>
        </svg>
        {{ linkNames.github }}
      </a>
    </li>
    <li class="nav-item">
      <NuxtLink :to="`${routePrefix}/grammar`" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-grammar"></use>
        </svg>
        {{ linkNames.grammar }}
      </NuxtLink>
    </li>
    <li class="nav-item">
      <NuxtLink :to="`${routePrefix}/contrast`" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wenda"></use>
        </svg>
        {{ linkNames.contrast }}
      </NuxtLink>
    </li>
    <li class="nav-item">
      <NuxtLink :to="`${routePrefix}/about`" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-about"></use>
        </svg>
        {{ linkNames.about }}
      </NuxtLink>
    </li>
    <li class="nav-item" @click="changeLang">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="linkNames.langIcon"></use>
      </svg>
      {{ linkNames.lang }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { computed } from 'vue';
import './index.less';

const store = useStore();
const router = useRouter();
const route = useRoute();

const routePrefix = computed(() => {
  return `/${store.lang}/${store.version}`;
});

const linkNames = computed(() => {
  return store.lang === 'zh-CN'
    ? {
        home: '首页',
        docs: '文档',
        demo: '示例',
        github: '源码',
        grammar: '语法',
        contrast: '对比',
        about: '关于',
        lang: 'English',
        langIcon: '#icon-d-en',
      }
    : {
        home: 'Home',
        docs: 'Docs',
        demo: 'Demo',
        github: 'Github',
        grammar: 'Grammar',
        contrast: 'Contrast',
        about: 'About',
        lang: '中文',
        langIcon: '#icon-d-cn',
      };
});

const changeLang = () => {
  store.changeLang();
  console.log(
    'route.fullPath.replace(/\/[a-zA-Z-]+/, routePrefix.value)',
    route.fullPath,
    route.fullPath.replace(/\/[a-zA-Z-]+\/\d/, routePrefix.value)
  );
  router.replace(route.fullPath.replace(/\/[a-zA-Z-]+\/\d/, routePrefix.value));
};
</script>

<script lang="ts">
export default {
  name: 'IzNavigation',
};
</script>
