<template>
  <NuxtLayout>
    <h1>Title</h1>
    <p>Feed ID: {{ feedId }}</p>
  </NuxtLayout>
</template>

<script setup>

definePageMeta({
  layout: 'default'
});

// Get the route object
const route = useRoute();

// Extract the client ID from the route parameters
const feedId = route.params.id;

</script>