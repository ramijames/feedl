<template>
  <nuxt-link class="single-feed" :to="`/feed/${feed.dataValues.id}`">
    <template v-if="getFeedImage(feed)">
      <img :src="getFeedImage(feed)" :alt="feed.dataValues.title" class="bg-image" />
    </template>
    <section class="feed-content">
      <template v-if="getFeedImage(feed)">
        <img :src="getFeedImage(feed)" :alt="feed.dataValues.title" class="podcast-image" />
      </template>
      <section class="feed-details">
        <h2>{{ feed.dataValues.title }}</h2>
        <p>from {{ owner.name }}</p>
        <div class="description" v-html="feed.dataValues.description"></div>
        <div class="categories">
          <span v-for="category in categories">{{ category }}</span>
        </div>
      </section>
    </section>
    <button @click="handleDelete(feed.dataValues.id)" class="red">Delete</button>
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
    categories.value = JSON.parse(feed.dataValues.categories)
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
  justify-content: space-between;
  padding: $spacing-md;
  width: 100%;
  border-radius: $br-xl;
  background-color: rgba($black, 0.025);
  height: 200px;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  
  .bg-image {
    display: none;
    // width: calc(100% + 40px);
    // height: auto;
    // object-fit: cover;
    // border-radius: $br-lg;
    // position: absolute;
    // top:-20px;
    // left: -20px;
    // z-index: 0;
    // filter: blur(10px);
    // mask-image: linear-gradient(45deg, rgba($black, 0.25) 0%, rgba($black, 0) 55%);
  }

  .feed-content {
    display: flex;
    flex-direction: row;
    gap: $spacing-md;
    width: 100%;
    z-index: 1;
    position: relative;
    color: $black;

    .podcast-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: $br-lg;
    }

    .feed-details { 
      display: flex;
      flex-direction: column;
      gap: $spacing-xs;

      .description {
        font-size: $font-size-xs;
        color: rgba($black, 0.5);
        height: 54px;
        overflow: hidden;
      }
    }

    p {
      font-size: $font-size-xs;
      color: rgba($black, 0.5);
      margin: 0;
    }

    h2 {
      margin: 0;
    }
  }
}

</style>