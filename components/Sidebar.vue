<template>
  <div class="sidebar">
    <nuxt-link to="/">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.1463 8.82406L14.8793 8.97205C15.3146 9.05992 15.6398 9.42431 15.6777 9.86675L15.9379 12.8973C15.9884 13.4864 15.5196 13.9905 14.9284 13.9827L13.3183 13.9615L12.5922 5.50212C12.4779 4.17038 11.4589 3.0941 10.1354 2.9072V2.9072C8.7034 2.70499 7.24422 2.83023 5.86766 3.27352V3.27352C4.59536 3.68323 3.77469 4.91741 3.889 6.24915L4.61511 14.7085L3.11824 14.9926C2.53611 15.1031 1.98613 14.686 1.93546 14.0957L1.67453 11.0558C1.63708 10.6195 1.88789 10.2095 2.29343 10.0442L2.92375 9.78734" stroke="black" stroke-linecap="round"/>
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
  padding: $spacing-lg $spacing-sm;
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(to right, transparent 99%, #C6C6C6 100%);
  -webkit-app-region: drag;
  app-region: drag;

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
    -webkit-app-region: no-drag; // Makes region draggable
    app-region: no-drag;

    svg {
      path {
        stroke: rgba($accent-blue, .85);
      }
    }

    &.active,
    &.router-link-active,
    &.router-link-exact-active {
      background-color: rgba($black, .05);
    }
  }
}

</style>