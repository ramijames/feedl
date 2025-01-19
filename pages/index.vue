<template>
  <main id="app">
    <button @click="addFeed">Add Feed</button>
    <div v-if="feeds">
      <h2>Feeds</h2>
      <ul>
        <li v-for="feed in feeds" :key="feed.id">
          {{ feed.dataValues.title }}
        </li>
      </ul>
    </div>
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
    getFeeds()
  } catch (error) {
    console.error('Failed to add feed:', error)
  }
}

const feeds = ref(null)

async function getFeeds() {
  try {
    if (!window?.api?.getFeeds) {
      console.error('API not available')
      return
    }
    feeds.value = await window.api.getFeeds()
  } catch (error) {
    console.error('Failed to get feeds:', error)
  }
}

onMounted(async () => {
  console.log('API available:', !!window?.api)
  try {
    await getFeeds()
    console.log('Feeds:', feeds)
  } catch (error) {
    console.error('Failed to get feeds:', error)
  }
})
</script>