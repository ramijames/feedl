<template>
  <div class="modal-content">
    <img src="@/assets/icons/add-rss.png" alt="RSS.com" class="modal-icon" />
    <h2>Add an RSS Feed with a URL</h2>
    <p>Enter the URL of the RSS feed you'd like to add. We'll do all the rest.</p>
    <div class="input-group">
      <input class="form-input modal-input" type="text" id="rssFeedUrl" v-model="rssFeedUrl" placeholder="https://example.com/feed.xml" />
    </div>
  </div>
  
  <div class="modal-buttons">
    <button @click="close" class="modal-button">Cancel</button>
    <button @click="addFeed" class="modal-button preferred">Add Feed</button>
  </div>
</template>

<script setup>

import { useModal } from '~/stores/modal'
const loading = ref(true);

const emit = defineEmits(['refresh']);

async function addFeed() {
  try {
    if (!window?.api?.addFeed) {
      console.error('API not available')
      return
    }
    await window.api.addFeed(rssFeedUrl.value)
    emit('refresh')
  } catch (error) {
    console.error('Failed to add feed:', error)
  }
}

function close() {
  const modal = useModal()
  modal.toggleVisibility()
  modal.reset()
}

</script>

<style lang="scss" scoped>

@use 'assets/variables' as *;

</style>