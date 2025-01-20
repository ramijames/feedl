<template>
  <NuxtLayout>
    <section class="feeds">
      <section class="add-feed">
        <input type="text" v-model="rssFeedUrl" placeholder="Feed URL" class="form-input">
        <button @click="handleAddFeed" class="primary">Add Feed</button>
      </section>
      <FeedsList :feeds="feeds" @delete="deleteFeed" />
    </section>
  </NuxtLayout>
</template>

<script setup>

definePageMeta({
  layout: 'default'
});

const feeds = ref(null)
const rssFeedUrl = ref('')
const newFeed = ref({
  title: '',
  link: '',
  description: '',
  language: '',
  image: {},
  lastBuildDate: '',
  items: [],
  itunes: {},
});

const loading = ref(false)

// For testing - https://media.rss.com/dr-watson-s-many-fine-tales-of-sherlock-holmes/feed.xml

async function handleAddFeed() {
  loading.value = true
  try {
    await populateNewFeed()
  } catch (error) {
    console.error('Failed to add feed:', error)
    loading.value = false
  }
  try {
    await addFeed()
    loading.value = false
  } catch (error) {
    console.error('Failed to add feed:', error)
    loading.value = false
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
  console.log('Starting feed parse:', rssFeedUrl.value)
  
  try {
    if (!window?.api?.parseFeed) {
      throw new Error('Parse feed API not available')
    }

    const parsedFeed = await window.api.parseFeed(rssFeedUrl.value)
    console.log('Parsed feed:', parsedFeed)
    
    newFeed.value = {
      title: parsedFeed.title || '',
      link: parsedFeed.link || '',
      description: parsedFeed.description || '',
      language: parsedFeed.language || '',
      image: parsedFeed.image || {},
      lastBuildDate: parsedFeed.lastBuildDate || '',
      items: parsedFeed.items || [],
      itunes: parsedFeed.itunes || {}
    }

    console.log('Updated newFeed:', newFeed.value)
  } catch (error) {
    console.error('Failed to parse feed:', error)
    throw error
  }
}

async function addFeed() {
  try {
    if (!window?.api?.addFeed) {
      throw new Error('Add feed API not available')
    }

    const feedToAdd = {
      title: newFeed.value.title,
      link: newFeed.value.link,
      description: newFeed.value.description || '',
      language: newFeed.value.language || '',
      image: JSON.stringify(newFeed.value.image || {}),
      lastBuildDate: newFeed.value.lastBuildDate || '',
      items: JSON.stringify(newFeed.value.items || []),
      itunes: JSON.stringify(newFeed.value.itunes || {})
    }

    console.log('Adding feed:', feedToAdd)

    await window.api.addFeed(feedToAdd)
    await getFeeds()
    rssFeedUrl.value = ''
    
  } catch (error) {
    console.error('Failed to add feed:', error)
    throw error
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

.feeds {
  height: 100%;

  .add-feed {
    display: flex;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
  }
}

</style>