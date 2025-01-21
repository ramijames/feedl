<template>
  <NuxtLayout>
    <section class="tool-bar">
      <button @click="handleOpenModal" class="primary">Add RSS Feed</button>
    </section>
    <section class="feeds">
      <!-- <section class="add-feed">
        <input type="text" v-model="rssFeedUrl" placeholder="Feed URL" class="form-input">
        <button @click="handleAddFeed" class="primary">Add Feed</button>
      </section> -->
      <FeedsList :feeds="feeds" @delete="deleteFeed" />
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

const feeds = ref(null)

const loading = ref(false)

// For testing - https://media.rss.com/dr-watson-s-many-fine-tales-of-sherlock-holmes/feed.xml

function handleOpenModal() {
  modal.toggleVisibility()
  modal.setContent('AddRssFeed')
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