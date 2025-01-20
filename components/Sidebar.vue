<template>
  <div class="sidebar">
    <nuxt-link to="/">My Podcasts</nuxt-link>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

@use 'assets/variables' as *;

.sidebar {
  display: flex;
  flex-direction: column;
  padding: $spacing-sm;
  background: rgba($white, .1);
  height: 100%;
  overflow-y: auto;

  a {
    padding: 9px;
    border-radius: $br-md;
    margin-bottom: $spacing-sm;
    text-decoration: none;
    color: rgba($black, .85);
    transition: background-color .35s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $spacing-xs;
    font-size: $font-size-md;

    &.active,
    &.router-link-active,
    &.router-link-exact-active {
      background-color: rgba($black, .05);
    }
  }
}

</style>