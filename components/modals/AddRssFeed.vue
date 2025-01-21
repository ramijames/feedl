<template>
  <div class="modal" :class="visibleClass">
    <div class="modal-body">

      test
          
    </div>
    
    <div class="buttons">
      <button @click="createProject(project)" class="primary wide">Create</button>
    </div>
  </div>
</template>

<script setup>

import { useModal } from '~/stores/modal'
const loading = ref(true);

</script>

<style lang="scss" scoped>

@use 'assets/variables' as *;

.modal {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 100%;

  .modal-body {
    width: 100%;
    min-height: 320px;

    p {
      margin: 0;
    }
  }
}

</style>