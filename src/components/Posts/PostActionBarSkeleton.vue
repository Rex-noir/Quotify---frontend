<script setup lang="ts">
import Skeleton from "primevue/skeleton";
</script>
<template>
  <div
    class="grid w-full grid-cols-4 place-items-center gap-2 border-t dark:border-slate-800"
  >
    <div v-ripple class="action-container">
      <Skeleton width="2rem" class="p-3"></Skeleton>
    </div>
    <div v-ripple class="action-container">
      <Skeleton width="2rem" class="p-3"></Skeleton>
    </div>
    <div v-ripple class="action-container">
      <Skeleton width="2rem" class="p-3"></Skeleton>
    </div>
    <div v-ripple class="action-container">
      <Skeleton width="2rem" class="p-3"></Skeleton>
    </div>
  </div>
</template>
<style scoped>
.action-container {
  @apply flex w-full cursor-pointer items-center justify-center gap-3 border-r py-2 dark:border-inherit;
  @apply hover:text-primary-400;
}
</style>
