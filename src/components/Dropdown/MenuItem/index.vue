<template>
  <li class="dropdown-menu-item">
    <slot />
  </li>
</template>

<script lang="ts">
export default {
  name: 'IzMenuItem'
};
</script>

<style lang="less">
.dropdown-menu-item {
  list-style: none;
  font-size: 14px;
  color: var(--iz-color);
  padding: 8px 10px;
  line-height: 14px;
  cursor: pointer;

  &:hover {
    background-color: var(--iz-bk-hover-color);
  }
}
</style>
