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

const route = useRoute();
const feedId = route.params.id;

</script>