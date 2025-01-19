<template>
  <main id="app">
    <button @click="addFeed">Add Feed</button>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'

async function addFeed() {
  try {
    if (!window?.api?.addFeed) {
      console.error('API not available')
      return
    }
    const feed = await window.api.addFeed('https://example.com/feed', 'Example Feed')
    console.log('Feed added successfully:', feed)
  } catch (error) {
    console.error('Failed to add feed:', error)
  }
}

onMounted(() => {
  console.log('API available:', !!window?.api)
})
</script>