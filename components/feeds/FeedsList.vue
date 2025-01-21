<template>
  <div v-if="feeds" class="feeds-list">
    <h1>My Podcasts</h1>
    <section class="feeds-list-content" v-if="feeds.length > 0">
      <FeedCard v-for="feed in props.feeds" :feed="feed" />
    </section>
    <div v-else class="no-feeds">
      <p>No feeds found</p>
    </div>  
  </div>
</template>

<script setup>

import FeedCard from '~/components/feeds/FeedCard.vue'

const loading = ref(false)

const props = defineProps({
  feeds: Object
})

const emit = defineEmits(['delete'])
const categories = ref([])
const owner = ref('')

function handleDelete(id) {
    emit('delete', id)
}

function getFeedImage(feed) {
  try {
    const imageData = JSON.parse(feed.dataValues.image)
    return imageData.url || imageData.link || null
  } catch (e) {
    console.error('Failed to parse image data:', e)
    return null
  }
}

async function getItunesName(feed) {
  try {
    const itunesData = JSON.parse(feed.dataValues.itunes)
    owner.value = itunesData.owner || ''
  } catch (e) {
    console.error('Failed to parse itunes data:', e)
    return null
  }
}

async function getItunesCategories(feed) {
  try {
    const itunesData = JSON.parse(feed.dataValues.itunes)
    categories.value = itunesData.categories || []
  } catch (e) {
    console.error('Failed to parse itunes data:', e)
    return null
  }
}

onMounted(async () => {
  try {
    await getFeeds()
  } catch (error) {
    console.error('Failed to get feeds:', error)
  }
})

</script>

<style scoped lang="scss">

@use 'assets/variables' as *;

.feeds-list {

  .feeds-list-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, 220px);
    gap: $spacing-lg;
  }

  .no-feeds {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

}


</style>