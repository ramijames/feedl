<template>
  <div v-if="feeds" class="feeds-list">
    <h1>My Podcasts</h1>
    <section class="feeds-list-content" v-if="feeds.length > 0">
      <div v-for="feed in props.feeds" :key="feed.id" class="single-feed">
        <section class="feed-content">
          <!-- <p>{{ feed.dataValues.id }}</p> -->
          <template v-if="getFeedImage(feed)">
            <img :src="getFeedImage(feed)" :alt="feed.dataValues.title" class="podcast-image" />
          </template>
          <h2>{{ feed.dataValues.title }}</h2>
        </section>
        <button @click="handleDelete(feed.dataValues.id)" class="red">Delete</button>
      </div>
    </section>
    <div v-else class="no-feeds">
      <p>No feeds found</p>
    </div>  
  </div>
</template>

<script setup>

const loading = ref(false)

const props = defineProps({
  feeds: Object
})

const emit = defineEmits(['delete'])

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

</script>

<style scoped lang="scss">

@use 'assets/variables' as *;

.feeds-list {

  .feeds-list-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: $spacing-md;

    .single-feed {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: $spacing-md;
      width: 100%;
      border-radius: $br-xl;
      background-color: rgba($black, 0.025);
      height: 300px;

      .feed-content {
        display: flex;
        flex-direction: row;
        gap: $spacing-xs;

        .podcast-image {
          width: 144px;
          height: 144px;
          object-fit: cover;
          border-radius: $br-lg;
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
      
      &:hover {
        background-color: rgba($black, 0.05);
      }
    }
  }

  .no-feeds {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

}


</style>