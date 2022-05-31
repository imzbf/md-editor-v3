<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import IzDropdown from '@/components/Dropdown';
import IzNavigation from '../Navigation/index.vue';
import './index.less';

import { version } from '../../../package.json';

const { IzDropdownMenu, IzDropdownMenuItem } = IzDropdown;

const store = useStore();

const data = reactive({
  previewThemevisible: false,
  codeThemevisible: false,
  previewThemes: ['default', 'github', 'vuepress', 'mk-cute', 'smart-blue', 'cyanosis'],
  codeThemes: [
    'atom',
    'a11y',
    'github',
    'gradient',
    'kimbie',
    'paraiso',
    'qtcreator',
    'stackoverflow'
  ]
});

const texts = computed(() => {
  return store.state.lang === 'zh-CN'
    ? {
        desc: 'Markdown编辑器Vue3版本，使用jsx和typescript语法开发，支持切换主题、prettier美化文本等。',
        defaultTheme: '默认模式',
        darkTheme: '暗黑模式',
        previewBtn: '预览主题',
        codeBtn: '代码主题'
      }
    : {
        desc: 'Markdown Editor for Vue3, developed in jsx and typescript, support different themes、beautify content by prettier.',
        defaultTheme: 'Default Theme',
        darkTheme: 'Dark Theme',
        previewBtn: 'Preview Style',
        codeBtn: 'Code Style'
      };
});
</script>

<template>
  <header class="page-header">
    <section class="container">
      <h1 class="project-name">
        md-editor-v3<sup>@{{ version }}</sup>
      </h1>
      <p class="project-desc">{{ texts.desc }}</p>
      <iz-navigation />
      <p class="header-actions">
        <button class="btn btn-header" @click="store.commit('changeTheme', 'light')">
          {{ texts.defaultTheme }}
        </button>
        <button class="btn btn-header" @click="store.commit('changeTheme', 'dark')">
          {{ texts.darkTheme }}
        </button>
        <iz-dropdown>
          <button class="btn btn-header">{{ texts.previewBtn }}</button>
          <template #content>
            <iz-dropdown-menu>
              <iz-dropdown-menu-item
                v-for="item of data.previewThemes"
                @click="store.commit('changePreviewTheme', item)"
              >
                {{ item }}
              </iz-dropdown-menu-item>
            </iz-dropdown-menu>
          </template>
        </iz-dropdown>
        <iz-dropdown>
          <button class="btn btn-header">{{ texts.codeBtn }}</button>
          <template #content>
            <iz-dropdown-menu>
              <iz-dropdown-menu-item
                v-for="item of data.codeThemes"
                @click="store.commit('changeCodeTheme', item)"
              >
                {{ item }}
              </iz-dropdown-menu-item>
            </iz-dropdown-menu>
          </template>
        </iz-dropdown>
      </p>
    </section>
  </header>
</template>
