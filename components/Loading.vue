<template>
  <main class="loading"">
    <div class="spinner"></div>
  </main>
</template>

<script setup>

</script>

<style lang="scss" scoped>

@use 'assets/variables' as *;

.loading {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 10;

  .spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid rgba($brand, .1);
    border-top-color: $brand;
    animation: spin .5s linear infinite;
    display: block;
    padding: 0;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}

</style>