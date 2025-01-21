<template>
  <div class="modal-content">
    
    <section v-if="newFeed.title == ''">
      <img src="@/assets/icons/add-rss.png" alt="RSS.com" class="modal-icon" />
      <h2>Add an RSS Feed with a URL</h2>
      <p>Enter the URL of the RSS feed you'd like to add. We'll do all the rest.</p>
      <div class="input-group">
        <input class="form-input modal-input" type="text" id="rssFeedUrl" v-model="rssFeedUrl" placeholder="https://example.com/feed.xml" />
      </div>
    </section>

    <section v-if="newFeed.title != ''">
      <img :src="newFeed.image.url" alt="RSS.com" class="modal-icon" />
      <h2>{{ newFeed.title }}</h2>
      <p>We found a Feed at this URL!</p>
    </section>
  </div>

  <div class="modal-buttons" v-if="newFeed.title == ''">
    <button @click="close" class="modal-button">Cancel</button>
    <button @click="checkFeed" class="modal-button preferred">Check Feed</button>
  </div>
  
  <div class="modal-buttons" v-if="newFeed.title != ''">
    <button @click="close" class="modal-button">Cancel</button>
    <button @click="addFeed" class="modal-button preferred">Add Feed</button>
  </div>

</template>

<script setup>

import { useModal } from '~/stores/modal'
const modal = useModal()

const loading = ref(true);
const emit = defineEmits(['refresh'])
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

async function addFeed() {
  try {
    if (!window?.api?.addFeed) {
      throw new Error('Add feed API not available')
    }

    const feedToAdd = {
      title: newFeed.value.title,
      link: newFeed.value.link,
      description: newFeed.value.description || '',
      language: newFeed.value.language || '',
      image: JSON.stringify(newFeed.value.image || {}),
      lastBuildDate: newFeed.value.lastBuildDate || '',
      items: JSON.stringify(newFeed.value.items || []),
      itunes: JSON.stringify(newFeed.value.itunes || {})
    }

    console.log('Adding feed:', feedToAdd)

    await window.api.addFeed(feedToAdd)
    
    modal.triggerRefresh()
    modal.toggleVisibility()
    modal.reset()

    rssFeedUrl.value = ''
    
  } catch (error) {
    console.error('Failed to add feed:', error)
    throw error
  }
}

async function populateNewFeed() {
  console.log('Starting feed parse:', rssFeedUrl.value)
  
  try {
    if (!window?.api?.parseFeed) {
      throw new Error('Parse feed API not available')
    }

    const parsedFeed = await window.api.parseFeed(rssFeedUrl.value)
    console.log('Parsed feed:', parsedFeed)
    
    newFeed.value = {
      title: parsedFeed.title || '',
      link: parsedFeed.link || '',
      description: parsedFeed.description || '',
      language: parsedFeed.language || '',
      image: parsedFeed.image || {},
      lastBuildDate: parsedFeed.lastBuildDate || '',
      items: parsedFeed.items || [],
      itunes: parsedFeed.itunes || {}
    }

    console.log('Updated newFeed:', newFeed.value)
  } catch (error) {
    console.error('Failed to parse feed:', error)
    throw error
  }
}

function checkFeed() {
  loading.value = true
  populateNewFeed()
  loading.value = false
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