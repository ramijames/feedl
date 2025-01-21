<template>
  <div class="sidebar">
    <img src="@/assets/feedl-logo.png" alt="Feedl Logo" class="feedl-logo" />
    <nuxt-link to="/">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 9.18182V9C2 5.134 5.13401 2 9 2V2C12.866 2 16 5.13401 16 9V9.18182M2 9.18182V13.9C2 15.0598 2.9402 16 4.1 16V16C5.2598 16 6.2 15.0598 6.2 13.9V12.5909C6.2 10.7081 4.6737 9.18182 2.79091 9.18182H2ZM16 9.18182V13.9C16 15.0598 15.0598 16 13.9 16V16C12.7402 16 11.8 15.0598 11.8 13.9V12.5909C11.8 10.7081 13.3263 9.18182 15.2091 9.18182H16Z" stroke="#E97430" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      My Podcasts
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
    color: rgba($brand, .85);
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
      path {
        stroke: $brand;
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