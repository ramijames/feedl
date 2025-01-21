<template>
  <nuxt-link class="single-feed" :to="`/feed/${feed.dataValues.id}`">
    <template v-if="getFeedImage(feed)">
      <img :src="getFeedImage(feed)" :alt="feed.dataValues.title" class="podcast-image" />
    </template>
    <section class="feed-content">
      <section class="feed-details">
        <h3>{{ feed.dataValues.title }}</h3>
        <p>from {{ owner.name }}</p>
        <div class="categories">
          <span v-for="category in categories" class="category">{{ category }}</span>
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
  gap: $spacing-sm;

  .podcast-image {
    width: 220px;
    height: 220px;
    object-fit: cover;
    border-radius: $br-xl;
  }

  .feed-content {
    display: flex;
    flex-direction: row;
    gap: $spacing-md;
    width: 100%;
    z-index: 1;
    position: relative;
    color: $black;

    .feed-details { 
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      gap: $spacing-xxs;

      .categories {
        font-size: $font-size-xs;
        display: flex;
        gap: $spacing-xxs;
        margin-top: $spacing-xs;

        .category {
          color: rgba($brand, 0.5);
          background: rgba($brand, 0.05);
          padding: 3px 6px;
          border-radius: $br-md;
        }
      }
    }

    h3 {
      margin: 0;
      color: rgba($black, 0.85);
    }

    p {
      font-size: $font-size-xs;
      color: rgba($black, 0.35);
      margin: 0;
    }
  }
}

</style>