<template>
  <ul class="nav-list">
    <li class="nav-item">
      <NuxtLink :to="routePrefix" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#med-icon-homepage"></use>
        </svg>
        {{ linkNames.home }}
      </NuxtLink>
    </li>
    <li class="nav-item">
      <NuxtLink :to="`${routePrefix}/api`" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#med-icon-api"></use>
        </svg>
        {{ linkNames.api }}
      </NuxtLink>
    </li>
    <li class="nav-item">
      <NuxtLink :to="`${routePrefix}/demo`" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#med-icon-example"></use>
        </svg>
        {{ linkNames.demo }}
      </NuxtLink>
    </li>
    <li class="nav-item">
      <a href="https://github.com/imzbf/md-editor-v3" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#med-icon-github"></use>
        </svg>
        {{ linkNames.github }}
      </a>
    </li>
    <li class="nav-item">
      <NuxtLink :to="`${routePrefix}/syntax`" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#med-icon-syntax"></use>
        </svg>
        {{ linkNames.syntax }}
      </NuxtLink>
    </li>
    <li class="nav-item">
      <NuxtLink :to="`${routePrefix}/contrast`" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#med-icon-question"></use>
        </svg>
        {{ linkNames.contrast }}
      </NuxtLink>
    </li>
    <li class="nav-item">
      <NuxtLink :to="`${routePrefix}/about`" :prefetch="false">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#med-icon-about"></use>
        </svg>
        {{ linkNames.about }}
      </NuxtLink>
    </li>
    <li class="nav-item" @click="changeLang">
      <NuxtLink
        :to="`${store.lang === 'en-US' ? '/zh-CN' : '/en-US'}`"
        :prefetch="false"
        style="display: none"
      >
        {{ linkNames.lang }}
      </NuxtLink>
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
  return `/${store.lang}`;
});

const linkNames = computed(() => {
  return store.lang === 'zh-CN'
    ? {
        home: '首页',
        api: 'API',
        demo: '示例',
        github: '源码',
        syntax: '语法',
        contrast: '对比',
        about: '关于',
        lang: 'English',
        langIcon: '#med-icon-en',
      }
    : {
        home: 'Home',
        api: 'API',
        demo: 'Demo',
        github: 'Github',
        syntax: 'Syntax',
        contrast: 'Contrast',
        about: 'About',
        lang: '中文',
        langIcon: '#med-icon-cn',
      };
});

const changeLang = () => {
  store.changeLang();

  router.replace(route.fullPath.replace(/\/[a-zA-Z-]+/, routePrefix.value));
};
</script>

<script lang="ts">
export default {
  name: 'IzNavigation',
};
</script>
