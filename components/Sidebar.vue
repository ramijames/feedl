<template>
  <div class="sidebar">
    <img src="@/assets/feedl-logo.png" alt="Feedl Logo" class="feedl-logo" />
    <nuxt-link to="/">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="3" width="2" height="12" rx="1" fill="black"/>
        <rect x="11" y="1" width="2" height="16" rx="1" fill="black"/>
        <rect x="2" y="3" width="2" height="12" rx="1" fill="black"/>
        <rect x="14" y="5" width="2" height="8" rx="1" fill="black"/>
        <rect x="5" y="5" width="2" height="8" rx="1" fill="black"/>
      </svg>
      My Podcasts
    </nuxt-link>
    <nuxt-link to="/preferences">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="7" width="2" height="16" rx="1" transform="rotate(-90 1 7)" fill="black"/>
        <rect x="1" y="13" width="2" height="16" rx="1" transform="rotate(-90 1 13)" fill="black"/>
        <circle cx="12" cy="12" r="2.5" fill="black" stroke="white"/>
        <circle cx="6" cy="6" r="2.5" fill="black" stroke="white"/>
      </svg>
      Preferences
    </nuxt-link>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">

@use 'assets/variables' as *;

.sidebar {
  display: flex;
  flex-direction: column;
  padding: $spacing-lg $spacing-md;
  height: 100%;
  overflow-y: auto;
  background: rgba(#F1F0F5, 1); // Adjust opacity as needed
  backdrop-filter: blur(4px);
  -webkit-app-region: drag;
  app-region: drag;

  .feedl-logo {
    width: 100px;
    margin-bottom: $spacing-md;
  }

  a {
    padding: 9px;
    border-radius: $br-md;
    margin-bottom: $spacing-sm;
    text-decoration: none;
    color: rgba($black, .85);
    transition: background-color .35s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $spacing-xxs;
    font-size: $font-size-md;
    font-weight: 700;
    -webkit-app-region: no-drag; // Makes region draggable
    app-region: no-drag;

    svg {
      rect, circle {
        fill: $brand;
      }
    }

    &.active,
    &.router-link-active,
    &.router-link-exact-active {
      background-color: rgba($white, .95);
    }
  }
}

</style>