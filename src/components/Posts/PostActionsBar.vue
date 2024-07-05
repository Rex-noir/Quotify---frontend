<script setup lang="ts">
import { PostBarActions, type Post } from "@/types/Post/post.types";
import Button from "primevue/button";

defineProps<{
  post?: Post;
}>();
</script>
<template>
  <div
    class="grid w-full grid-cols-4 place-items-center gap-2 border-t dark:border-slate-800"
  >
    <div class="action-container">
      <span>{{ post?.comments ? post?.comments : "0" }}</span>
      <span class="pi pi-thumbs-up" aria-label="Filter" />
    </div>
    <div v-ripple class="action-container">
      <span>{{ post?.comments ? post?.comments : "0" }}</span>
      <span class="pi pi-thumbs-down" aria-label="Filter" />
    </div>
    <div v-ripple class="action-container">
      <span>{{ post?.comments ? post?.comments : "0" }}</span>
      <span class="pi pi-comment" aria-label="Filter" />
    </div>
    <div v-ripple class="action-container">
      <span class="pi pi-share-alt" aria-label="Filter" />
    </div>
  </div>
</template>
<style scoped>
.action-container {
  @apply flex w-full cursor-pointer items-center justify-center gap-3 border-r py-2 dark:border-inherit;
  @apply hover:text-primary-400;
}
</style>
