<template>
  <NuxtLayout>
    <section class="sheet-content">
      <h1>Preferences</h1>
    </section>
  </NuxtLayout>
</template>

<script setup>

import { useModal } from '~/stores/modal'
const modal = useModal()

const { refreshTrigger } = storeToRefs(modal)
watch(refreshTrigger, async () => {
  console.log('Refreshing feeds because of refreshTrigger...')
  await getFeeds()
})

definePageMeta({
  layout: 'default'
});

</script>