<script setup lang="ts">
import useUserStore from "@/stores/user.store";
import { PostBarActions, type Post } from "@/types/Post/post.types";
import { useToast } from "primevue/usetoast";

defineProps<{
  post?: Post;
}>();

const toast = useToast();

const userStore = useUserStore();
const handleClick = (action: PostBarActions) => {
  if (!userStore.status) {
    toast.add({
      severity: "secondary",
      detail: "Please login!",
      life: 1000,
    });
  } else {
    // switch (action) {
    //   // case PostBarActions.COMMENT:
    //   //   break;
    // }
  }
};
</script>
<template>
  <div
    class="grid w-full grid-cols-4 place-items-center gap-2 border-t dark:border-slate-800"
  >
    <div
      v-ripple
      @click="handleClick(PostBarActions.LIKE)"
      class="action-container"
    >
      <span>{{ post?.likes_count ? post?.likes_count : "0" }}</span>
      <span class="pi pi-thumbs-up" aria-label="Filter" />
    </div>
    <div
      @click="handleClick(PostBarActions.DISLIKE)"
      v-ripple
      class="action-container"
    >
      <span>{{ post?.dislikes_count ? post?.dislikes_count : "0" }}</span>
      <span class="pi pi-thumbs-down" aria-label="Filter" />
    </div>
    <div
      @click="handleClick(PostBarActions.COMMENT)"
      v-ripple
      class="action-container"
    >
      <span>{{ post?.comments_count ? post?.comments_count : "0" }}</span>
      <span class="pi pi-comment" aria-label="Filter" />
    </div>
    <div
      @click="handleClick(PostBarActions.SHARE)"
      v-ripple
      class="action-container"
    >
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
