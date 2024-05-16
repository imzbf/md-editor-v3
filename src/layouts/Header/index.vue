<template>
  <header class="page-header">
    <section class="container">
      <h1 class="project-name">
        md-editor-v3<sup>@{{ version }}</sup>
      </h1>
      <p class="project-desc">{{ texts.desc }}</p>

      <div class="pc">
        <IzNavigation />
        <p class="header-actions">
          <button class="btn btn-header" @click="store.commit('changeTheme', 'light')">
            {{ texts.defaultTheme }}
          </button>
          <button class="btn btn-header" @click="store.commit('changeTheme', 'dark')">
            {{ texts.darkTheme }}
          </button>
          <IzDropdown>
            <button class="btn btn-header">{{ texts.previewBtn }}</button>
            <template #content>
              <IzDropdownMenu>
                <IzDropdownMenuItem
                  v-for="item of data.previewThemes"
                  :key="`preview-theme-${item}`"
                  @click="store.commit('changePreviewTheme', item)"
                >
                  {{ item }}
                </IzDropdownMenuItem>
              </IzDropdownMenu>
            </template>
          </IzDropdown>
          <IzDropdown>
            <button class="btn btn-header">{{ texts.codeBtn }}</button>
            <template #content>
              <IzDropdownMenu>
                <IzDropdownMenuItem
                  v-for="item of data.codeThemes"
                  :key="`code-theme-${item}`"
                  @click="store.commit('changeCodeTheme', item)"
                >
                  {{ item }}
                </IzDropdownMenuItem>
              </IzDropdownMenu>
            </template>
          </IzDropdown>
        </p>
      </div>

      <div class="mb">
        <IzDrawer>
          <svg class="icon m-menu-trigger" aria-hidden="true">
            <use xlink:href="#icon-drawer"></use>
          </svg>

          <template #content>
            <IzNavigation />
            <div class="header-hr" />
            <p class="header-actions">
              <button
                class="btn btn-header"
                @click="store.commit('changeTheme', 'light')"
              >
                {{ texts.defaultTheme }}
              </button>
              <button class="btn btn-header" @click="store.commit('changeTheme', 'dark')">
                {{ texts.darkTheme }}
              </button>
              <IzDropdown>
                <button class="btn btn-header">{{ texts.previewBtn }}</button>
                <template #content>
                  <IzDropdownMenu>
                    <IzDropdownMenuItem
                      v-for="item of data.previewThemes"
                      :key="`preview-theme-${item}`"
                      @click="store.commit('changePreviewTheme', item)"
                    >
                      {{ item }}
                    </IzDropdownMenuItem>
                  </IzDropdownMenu>
                </template>
              </IzDropdown>
              <IzDropdown>
                <button class="btn btn-header">{{ texts.codeBtn }}</button>
                <template #content>
                  <IzDropdownMenu>
                    <IzDropdownMenuItem
                      v-for="item of data.codeThemes"
                      :key="`code-theme-${item}`"
                      @click="store.commit('changeCodeTheme', item)"
                    >
                      {{ item }}
                    </IzDropdownMenuItem>
                  </IzDropdownMenu>
                </template>
              </IzDropdown>
            </p>
          </template>
        </IzDrawer>
      </div>
    </section>
  </header>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import IzDropdown from '@/components/Dropdown';
import IzDrawer from '@/components/Drawer';
import IzNavigation from '../Navigation/index.vue';
import './index.less';

import { version } from '../../../package.json';

const { IzDropdownMenu, IzDropdownMenuItem } = IzDropdown;

const store = useStore();

const data = reactive({
  previewThemevisible: false,
  codeThemevisible: false,
  previewThemes: [
    'default',
    'github',
    'vuepress',
    'mk-cute',
    'smart-blue',
    'cyanosis',
    'arknights'
  ],
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

<script lang="ts">
export default {
  name: 'IzHeader'
};
</script>
