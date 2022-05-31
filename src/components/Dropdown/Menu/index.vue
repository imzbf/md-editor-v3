<template>
  <ul class="dropdown-menu">
    <slot />
  </ul>
</template>

<style lang="less">
.dropdown-menu {
  padding: 8px 0;
  background-color: var(--iz-bk-color);
  border-radius: 3px;
  border: 1px solid var(--iz-border-color);
}
</style>
