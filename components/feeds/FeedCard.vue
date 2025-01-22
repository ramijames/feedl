<template>
  <nuxt-link class="single-feed" :to="`/feed/${feed.dataValues.id}`">
    <template v-if="getFeedImage(feed)">
      <img :src="getFeedImage(feed)" :alt="feed.dataValues.title" class="podcast-image" />
    </template>
    <section class="feed-content">
      <template v-if="getFeedImage(feed)">
        <img :src="getFeedImage(feed)" :alt="feed.dataValues.title" class="bg-image" />
      </template>
      <section class="feed-details">
        <h3>{{ feed.dataValues.title }}</h3>
        <!-- <p>from {{ owner.name }}</p> -->
        <div class="categories">
          <!-- Limit to two categories -->
          <span v-for="category in limitedCategories" class="category">{{ category }}</span>
        </div>
      </section>
    </section>
    <!-- <button @click="handleDelete(feed.dataValues.id)" class="red">Delete</button> -->
  </nuxt-link> 
</template>

<script setup>

const props = defineProps({
  feed: Object
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

async function getCategories(feed) {
  try {
    const itunesData = JSON.parse(feed.dataValues.itunes)
    categories.value = itunesData.categories || ''
  } catch (e) {
    console.error('Failed to parse categories:', e)
  }
}

const limitedCategories = computed(() => {
  if (!categories.value || !Array.isArray(categories.value)) return []
  return categories.value.slice(0, 2)
})

onMounted(() => {
  getItunesName(props.feed)
  getCategories(props.feed)
})

</script>

<style scoped lang="scss">

@use 'assets/variables' as *;

.single-feed {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  position: relative;
  overflow: hidden;
  text-decoration: none;

  .podcast-image {
    width: 260px;
    height: 260px;
    object-fit: cover;
    border-radius: $br-xl $br-xl 0 0;
    mask-image: linear-gradient(to bottom, rgba($black, 1) 220px, rgba($black, 0));
    margin-bottom: -40px;
    z-index: 1;
  }

  .feed-content {
    display: flex;
    flex-direction: row;
    gap: $spacing-md;
    width: 100%;
    z-index: 0;
    position: relative;
    color: $black;
    border-radius: $br-xl;
    overflow: hidden;
    background: $accent-gray;
    padding-top: $spacing-md;

    .bg-image {
      width: 1000px;
      height: 1000px;
      object-fit: cover;
      position: absolute;
      top: -200px;
      left: -200px;
      z-index: -1;
      filter: blur(200px) brightness(0.7);
      mix-blend-mode: overlay;
    }

    .feed-details { 
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      gap: $spacing-xxs;
      position: relative;
      padding: $spacing-md;
      z-index: 1;
      width: calc(100%);

      .categories {
        font-size: $font-size-xs;
        display: flex;
        gap: $spacing-xxs;
        margin-top: $spacing-xs;
        width: 100%;
        flex-wrap: wrap;
        mix-blend-mode: overlay;

        .category {
          color: rgba($white, 0.85);
          background: rgba(black, 0.25);
          padding: 3px 6px;
          border-radius: $br-md;
          text-wrap: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }

    h3 {
      margin: 0;
      color: $white;
      text-wrap: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
    }

    p {
      font-size: $font-size-xs;
      color: rgba($white, 0.35);
      margin: 0;
      color: $white;
    }
  }
}

</style>