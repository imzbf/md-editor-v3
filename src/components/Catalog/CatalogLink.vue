<template>
  <Link :href="`#${tocItem.text}`" :title="tocItem.text">
    <div v-if="tocItem.children" class="catalog-container">
      <CatalogLink
        v-for="item of tocItem.children"
        :key="`${item.level}-${item.text}`"
        :tocItem="item"
      />
    </div>
  </Link>
</template>

<script setup lang="ts">
import { Anchor } from 'ant-design-vue';
import { defineProps, PropType } from 'vue';

const { Link } = Anchor;
import { TocItem } from './';

const { tocItem } = defineProps({
  tocItem: {
    type: Object as PropType<TocItem>,
    default: () => ({})
  }
});
</script>
