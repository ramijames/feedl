<template>
  <main class="modal" :class="visibleClass">
    <div class="shade" @click="close()"></div>
    <div class="modal-body" :class="[visibleClass]">
      <Loading v-if="loading" type="small" />
      <component v-if="!loading" :is="contentComponent" />
    </div>
  </main>
</template>

<script setup>

import { useModal } from '~/stores/modal'

// Project modals
import AddRssFeed from '~/components/modals/AddRssFeed.vue'

const modal = useModal()

const visibleClass = computed(() => {
  return modal.visible ? 'visible' : ''
})

const loading = computed(() => {
  return modal.loading
})

const contentComponent = computed(() => {
  const components = {
    'AddRssFeed': AddRssFeed
  }
  return components[modal.content]
})

const close = () => {
  modal.toggleVisibility()
  modal.reset()
}

computed(() => {
  if (modal.visible) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})

</script>

<style lang="scss" scoped>

@use 'assets/variables' as *;



</style>