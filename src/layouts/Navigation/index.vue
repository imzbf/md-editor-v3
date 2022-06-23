<template>
  <ul class="nav-list">
    <li class="nav-item">
      <router-link to="/">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-online"></use>
        </svg>
        {{ linkNames.home }}
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/docs">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-docs"></use>
        </svg>
        {{ linkNames.docs }}
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/demo">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-demo"></use>
        </svg>
        {{ linkNames.demo }}
      </router-link>
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
      <router-link to="/about">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-about"></use>
        </svg>
        {{ linkNames.about }}
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/contrast">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-d-v"></use>
        </svg>
        {{ linkNames.to2 }}
      </router-link>
    </li>
    <li class="nav-item" @click="store.commit('changeLang')">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="linkNames.langIcon"></use>
      </svg>
      {{ linkNames.lang }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import './index.less';

const store = useStore();

const linkNames = computed(() => {
  return store.state.lang === 'zh-CN'
    ? {
        home: '首页',
        docs: '文档',
        demo: '示例',
        github: '源码',
        about: '关于',
        lang: 'English',
        langIcon: '#icon-d-en',
        to2: '升级至2.x'
      }
    : {
        home: 'Home',
        docs: 'Docs',
        demo: 'Demo',
        github: 'Github',
        about: 'About',
        lang: '中文',
        langIcon: '#icon-d-cn',
        to2: 'Upgrade 2.x'
      };
});
</script>

<script lang="ts">
export default {
  name: 'IzNavigation'
};
</script>
