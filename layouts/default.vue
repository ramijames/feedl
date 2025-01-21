<template>
  <main class="default-layout">
    <Sidebar />
    <section class="content">
      <slot />
    </section>
  </main>
</template>

<script setup>

import Sidebar from '~/components/Sidebar.vue'

</script>

<style scoped lang="scss">

@use 'assets/variables' as *;

.default-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100%;
  overflow: hidden;

  .content {
    padding: $spacing-lg;
    flex: 1;
    background: $brand-bg;
    overflow-y: auto;
    transition: padding .35s ease;

    @media (max-width: $breakpoint-lg) {
      padding: $spacing-md;
    }
  }
}

</style>