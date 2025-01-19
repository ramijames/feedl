<template>
  <main id="app">
    <input type="text" v-model="rssFeedUrl" placeholder="Feed URL" class="form-input">
    <pre>{{ newFeed }}</pre>
    <button @click="addFeed">Add Feed</button>
    <hr>
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
const rssFeedUrl = ref('')
const newFeed = ref({
  title: '',
  description: ''
});

// For testing - https://media.rss.com/dr-watson-s-many-fine-tales-of-sherlock-holmes/feed.xml

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

async function populateNewFeed() {
  // 1. read the contents of the xml in rssFeedUrl
  // 2. parse the xml
  // 3. extract the title and description
  // 4. set newFeed to the title and description

  try {
    if (!window?.api?.parseFeed) {
      console.error('API not available')
      return
    }
    const feed = await window.api.parseFeed(rssFeedUrl)
    console.log('Feed parsed successfully:', feed)
    newFeed.value = feed
  } catch (error) {
    console.error('Failed to parse feed:', error)
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

<style scoped lang="scss">

@use 'assets/variables' as *;

#app {
  padding: $spacing-sm;
}

</style>