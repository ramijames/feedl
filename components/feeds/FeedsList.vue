<template>
  <div v-if="feeds" class="feeds">
    <h2>Feeds</h2>
    <div v-for="feed in props.feeds" :key="feed.id" class="single-feed">
      {{ feed.dataValues.id }} - {{ feed.dataValues.title }} <button @click="handleDelete(feed.dataValues.id)" class="red">Delete</button>
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

</script>