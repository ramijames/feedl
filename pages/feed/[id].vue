<template>
  <div>
    <h1>Feed</h1>
    <p>Feed ID: {{ feedId }}</p>
  </div>
</template>

<script setup>

// Get the route object
const route = useRoute();

// Extract the client ID from the route parameters
const feedId = route.params.id;

</script>