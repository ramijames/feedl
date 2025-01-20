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
  grid-template-columns: 200px 1fr;
  background-color: $fill-sheet;
  height: 100%;

  .content {
    padding: $spacing-md;
    flex: 1;
    background: $white;
  }
}

</style>