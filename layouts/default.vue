<template>
  <div class="docs-page">
    <IzHeader />
    <slot />
    <BackTop />
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import BackTop from '@/components/BackTop/index.vue';
import { useStore, type Lang } from '@/store';
import IzHeader from './Header/index.vue';

const store = useStore();
const { params } = useRoute();
// 在服务端判断好语言类型
store.changeLang(params.lang as Lang);

watch(
  () => store.theme,
  () => {
    if (store.theme === 'dark') {
      document.documentElement.className = 'theme-dark';
    } else {
      document.documentElement.className = '';
    }
  }
);

onMounted(() => {
  if (store.theme === 'dark') {
    document.documentElement.className = 'theme-dark';
    // document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.documentElement.className = '';
    // document.body.removeAttribute('arco-theme');
  }
});
</script>

<script lang="ts">
export default {
  name: 'IzLayout',
};
</script>

<style lang="less">
.docs-page {
  color: var(--iz-color);
  background-color: var(--iz-bk-color);
  min-height: 100vh;

  .doc {
    display: flex;
    padding: 2rem;

    .catalog {
      width: 25%;
    }

    .content {
      width: 75%;
      padding-right: 1rem;
      flex-shrink: 0;
    }
  }
}
</style>

<style lang="less">
@media (max-width: 768px) {
  .docs-page {
    .doc {
      padding: 0 1rem;

      .catalog {
        display: none;
      }

      .content {
        width: 100%;
        padding-right: 0;

        .md-editor-preview-wrapper {
          padding-left: 1rem;
          padding-right: 1rem;
        }
      }
    }
  }
}
</style>
