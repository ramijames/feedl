<template>
  <div class="sidebar">
    <img src="@/assets/feedl-logo.png" alt="Feedl Logo" class="feedl-logo" />
    <nuxt-link to="/">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3L7 3C4.79086 3 3 4.79086 3 7L3 17ZM15 6C14.4477 6 14 6.44772 14 7V17C14 17.5523 14.4477 18 15 18C15.5523 18 16 17.5523 16 17V7C16 6.44772 15.5523 6 15 6ZM12 7.84615C11.4477 7.84615 11 8.29387 11 8.84615V15.1538C11 15.7061 11.4477 16.1538 12 16.1538C12.5523 16.1538 13 15.7061 13 15.1538V8.84615C13 8.29387 12.5523 7.84615 12 7.84615ZM5 8.84615C5 8.29387 5.44772 7.84615 6 7.84615C6.55228 7.84615 7 8.29387 7 8.84615V15.1538C7 15.7061 6.55228 16.1538 6 16.1538C5.44772 16.1538 5 15.7061 5 15.1538V8.84615ZM18 8.76923C17.4477 8.76923 17 9.21695 17 9.76923V14.2308C17 14.7831 17.4477 15.2308 18 15.2308C18.5523 15.2308 19 14.7831 19 14.2308V9.76923C19 9.21695 18.5523 8.76923 18 8.76923ZM8 9.76923C8 9.21695 8.44771 8.76923 9 8.76923C9.55229 8.76923 10 9.21695 10 9.76923V14.2308C10 14.7831 9.55229 15.2308 9 15.2308C8.44771 15.2308 8 14.7831 8 14.2308V9.76923Z" fill="black"/>
      </svg>

      My Podcasts
    </nuxt-link>
    <nuxt-link to="/preferences">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 9.20914 4.79086 11 7 11L17 11C19.2091 11 21 9.20914 21 7C21 4.79086 19.2091 3 17 3H7C4.79086 3 3 4.79086 3 7ZM7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21 17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17C3 14.7909 4.79086 13 7 13L17 13C19.2091 13 21 14.7909 21 17ZM17 20C15.3431 20 14 18.6569 14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17C20 18.6569 18.6569 20 17 20Z" fill="black"/>
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
    width: 140px;
    margin: 0 0 $spacing-md;
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