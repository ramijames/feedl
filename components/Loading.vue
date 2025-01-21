<template>
  <main id="Loading"">
    <div :class="['spinner', type]"></div>
  </main>
</template>

<script setup>

const props = defineProps(['type'])

</script>

<style lang="scss" scoped>

@use 'assets/variables' as *;

#Loading {
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

    &.tiny {
      width: 16px;
      height: 16px;
      border: 1px solid rgba($brand, .1);
      border-top-color: $brand;
    }

    &.small {
      width: 20px;
      height: 20px;
      border: 2px solid rgba($brand, .1);
      border-top-color: $brand;
    }

    &.header {
      width: 20px;
      height: 20px;
      border: 4px solid rgba($white, .1);
      border-top-color: $white;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}

</style>