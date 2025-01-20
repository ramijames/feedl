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
  grid-template-columns: 220px 1fr;
  // background-color: #E6E6E6;
  height: 100%;
  overflow: hidden;

  .content {
    padding: $spacing-lg;
    flex: 1;
    background: $white;
    overflow-y: auto;
    transition: padding .35s ease;

    @media (max-width: $breakpoint-lg) {
      padding: $spacing-md;
    }
  }
}

</style>