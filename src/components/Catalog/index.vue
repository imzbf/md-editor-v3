<template>
  <Anchor :affix="false" :showInkInFixed="false">
    <CatalogLink v-for="item of catalogs" :key="item.text" :tocItem="item" />
  </Anchor>
</template>

<script setup lang="ts">
import { Anchor } from 'ant-design-vue';
import { computed, PropType, defineProps } from 'vue';
import CatalogLink from './CatalogLink.vue';
import './style.less';

export interface TocItem {
  text: string;
  level: number;
  children?: Array<TocItem>;
}

const props = defineProps({
  heads: {
    type: Array as PropType<Array<any>>
  }
});

const catalogs = computed(() => {
  const tocItems: TocItem[] = [];

  props.heads?.forEach(({ text, level }) => {
    const item = { level, text };

    if (tocItems.length === 0) {
      // 第一个 item 直接 push
      tocItems.push(item);
    } else {
      let lastItem = tocItems[tocItems.length - 1]; // 最后一个 item

      if (item.level > lastItem.level) {
        // item 是 lastItem 的 children
        for (let i = lastItem.level + 1; i <= 6; i++) {
          const { children } = lastItem;
          if (!children) {
            // 如果 children 不存在
            lastItem.children = [item];
            break;
          }

          lastItem = children[children.length - 1]; // 重置 lastItem 为 children 的最后一个 item

          if (item.level <= lastItem.level) {
            // item level 小于或等于 lastItem level 都视为与 children 同级
            children.push(item);
            break;
          }
        }
      } else {
        // 置于最顶级
        tocItems.push(item);
      }
    }
  });
  return tocItems;
});
</script>
