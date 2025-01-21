<template>
  <NuxtLayout>
    <div v-if="feed" class="feed-detail">
      <header>
        <img v-if="feedImage" :src="feedImage" :alt="feed.title" />
        <h1>{{ feed.title }}</h1>
      </header>
      
      <div class="feed-meta">
        <p v-if="itunesData?.owner">by {{ itunesData.owner.name }}</p>
        <p>{{ feed.description }}</p>
      </div>

      <div class="feed-items" v-if="feedItems">
        <div v-for="item in feedItems" :key="item.guid" class="feed-item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  layout: 'default'
});

const route = useRoute();
const feedId = route.params.id;
const feed = ref(null);

const feedImage = computed(() => {
  if (!feed.value?.image) return null
  try {
    const imageData = JSON.parse(feed.value.image)
    return imageData.url || imageData.link
  } catch (e) {
    return null
  }
})

const itunesData = computed(() => {
  if (!feed.value?.itunes) return null
  try {
    return JSON.parse(feed.value.itunes)
  } catch (e) {
    return null
  }
})

const feedItems = computed(() => {
  if (!feed.value?.items) return []
  try {
    return JSON.parse(feed.value.items)
  } catch (e) {
    return []
  }
})

async function getFeed(feedId) {
  try {
    if (!window?.api?.getFeed) {
      console.error('API not available')
      return
    }
    const newFeed = await window.api.getFeed(feedId)
    feed.value = newFeed.dataValues
  } catch (error) {
    console.error('Failed to get feed:', error)
  }
}

onMounted(async () => {
  await getFeed(feedId)
})
</script>

<style scoped lang="scss">
.feed-detail {
  
  header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .feed-items {
    margin-top: 2rem;
    
    .feed-item {
      padding: 1rem 0;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>