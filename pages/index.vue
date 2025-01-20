<template>
  <NuxtLayout>
    <section>
      <input type="text" v-model="rssFeedUrl" placeholder="Feed URL" class="form-input">
      <button @click="handleAddFeed" class="primary">Add Feed</button>
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

async function addFeed() {
  try {
    if (!window?.api?.addFeed) {
      console.error('API not available')
      return
    }

    const feedToAdd = {
      title: newFeed.value.title,
      link: newFeed.value.link,
      description: newFeed.value.description,
      language: newFeed.value.language,
      image: JSON.stringify(newFeed.value.image),
      lastBuildDate: newFeed.value.lastBuildDate,
      items: JSON.stringify(newFeed.value.items),
      itunes: JSON.stringify(newFeed.value.itunes)
    }

    console.log('Feed to add:', feedToAdd)

    await window.api.addFeed(
      feedToAdd.title,
      feedToAdd.link,
      feedToAdd.description,
      feedToAdd.language,
      feedToAdd.image,
      feedToAdd.lastBuildDate,
      feedToAdd.items,
      feedToAdd.itunes
    )
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

  console.log('rssFeedUrl:', rssFeedUrl.value)

  try {
    if (!window?.api?.parseFeed) {
      console.error('API not available')
      return
    }
    const feed = await window.api.parseFeed(rssFeedUrl.value)
    console.log('Feed parsed successfully:', feed)
    newFeed.value = {
      title: feed.title,
      link: feed.link,
      description: feed.description,
      language: feed.language,
      image: feed.image,
      lastBuildDate: feed.lastBuildDate,
      items: feed.items,
      itunes: feed.itunes,
    }
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

</style>