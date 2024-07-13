<script setup lang="ts">
import useUserStore from "@/stores/user.store";
import { PostBarActions, type PostComment } from "@/types/Post/post.types";
import { useToast } from "primevue/usetoast";

defineProps<{
  comment?: PostComment;
}>();

const toast = useToast();

const userStore = useUserStore();
const handleClick = (action: PostBarActions) => {
  if (!userStore.status) {
    toast.add({
      severity: "info",
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
    class="prose grid w-full max-w-none grid-cols-4 place-items-center gap-2 border-t dark:prose-invert dark:border-slate-800"
  >
    <div
      v-ripple
      @click="handleClick(PostBarActions.LIKE)"
      class="action-container"
    >
      <span>{{ comment?.likes_count ? comment?.likes_count : "0" }}</span>
      <span class="pi pi-thumbs-up" aria-label="Like" />
    </div>
    <div
      @click="handleClick(PostBarActions.DISLIKE)"
      v-ripple
      class="action-container"
    >
      <span>{{ comment?.dislikes_count ? comment?.dislikes_count : "0" }}</span>
      <span class="pi pi-thumbs-down" aria-label="Dislike" />
    </div>
    <div
      @click="handleClick(PostBarActions.COMMENT)"
      v-ripple
      class="action-container"
    >
      <span class="prose dark:prose-invert" aria-label="Reply">Reply</span>
    </div>
    <div
      @click="handleClick(PostBarActions.SHARE)"
      v-ripple
      class="action-container h-full"
    >
      <span class="pi pi-bookmark" aria-label="Share" />
    </div>
  </div>
</template>
<style scoped>
.action-container {
  @apply flex w-full cursor-pointer items-center justify-center gap-3 py-2;
  @apply hover:text-primary-400;
}
</style>
,
