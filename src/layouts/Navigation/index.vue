<template>
  <ul class="nav-list">
    <li class="nav-item">
      <RouterLink :to="routePrefix">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-online"></use>
        </svg>
        {{ linkNames.home }}
      </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink :to="`${routePrefix}/docs`">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-docs"></use>
        </svg>
        {{ linkNames.docs }}
      </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink :to="`${routePrefix}/demo`">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-demo"></use>
        </svg>
        {{ linkNames.demo }}
      </RouterLink>
    </li>
    <li class="nav-item">
      <a href="https://github.com/imzbf/md-editor-v3" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-github"></use>
        </svg>
        {{ linkNames.github }}
      </a>
    </li>
    <li className="nav-item">
      <RouterLink :to="`${routePrefix}/grammar`">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-grammar"></use>
        </svg>
        {{ linkNames.grammar }}
      </RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink :to="`${routePrefix}/about`">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-about"></use>
        </svg>
        {{ linkNames.about }}
      </RouterLink>
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
import { StateType } from '@/store';
import { computed } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import './index.less';

const store = useStore<StateType>();
const router = useRouter();
const route = useRoute();

const routePrefix = computed(() => {
  return `/${store.state.lang}`;
});

const linkNames = computed(() => {
  return store.state.lang === 'zh-CN'
    ? {
        home: '首页',
        docs: '文档',
        demo: '示例',
        github: '源码',
        grammar: '语法',
        about: '关于',
        lang: 'English',
        langIcon: '#icon-d-en'
      }
    : {
        home: 'Home',
        docs: 'Docs',
        demo: 'Demo',
        github: 'Github',
        grammar: 'Grammar',
        about: 'About',
        lang: '中文',
        langIcon: '#icon-d-cn'
      };
});

const changeLang = () => {
  store.commit('changeLang');
  router.replace(route.fullPath.replace(/\/[a-zA-Z-]+/, routePrefix.value));
};
</script>

<script lang="ts">
export default {
  name: 'IzNavigation'
};
</script>
