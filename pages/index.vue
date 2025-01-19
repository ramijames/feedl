<template>
  <main id="app">
    <button @click="addFeed">Add Feed</button>
    <div v-if="feeds">
      <h2>Feeds</h2>
      <div v-for="feed in feeds" :key="feed.id">
        {{ feed.dataValues.id }} - {{ feed.dataValues.title }} <button @click="deleteFeed(feed.dataValues.id)">Delete</button>
      </div>
    </div>
  </main>
</template>

<script setup>

const feeds = ref(null)

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

async function deleteFeed(id) {
  try {
    if (!window?.api?.deleteFeed) {
      console.error('API not available')
      return
    }
    await window.api.deleteFeed(id)
    console.log('Feed deleted successfully:', id)
    await getFeeds()
  } catch (error) {
    console.error('Failed to delete feed:', error)
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