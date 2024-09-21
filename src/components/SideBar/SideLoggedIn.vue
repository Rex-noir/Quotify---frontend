<script setup lang="ts">
import MenuProfile from "../Menu/Items/Profile.vue";
import DarkMode from "../Menu/Items/DarkMode.vue";
import Saved from "../Menu/Items/Saved.vue";
</script>
<template>
  <div class="h-full bg-surface-100 dark:bg-surface-0">
    <div class="sticky top-16 flex flex-col gap-2 p-2">
      <div>
        <MenuProfile class="with-icon-div" />
        <Saved class="with-icon-div" />
      </div>
      <div>
        <DarkMode class="no-icon-div" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.with-icon-div {
  @apply grid w-full cursor-pointer grid-cols-[50px,1fr] items-center gap-2 rounded-lg py-3 hover:bg-surface-200 dark:hover:bg-highlight-emphasis;
}
.no-icon-div {
  @apply w-full cursor-pointer items-center rounded-lg p-2 hover:bg-surface-200 dark:hover:bg-highlight-emphasis;
}
</style>
