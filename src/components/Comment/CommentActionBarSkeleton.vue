<script setup lang="ts">
import useUserStore from "@/stores/user.store";
import { PostBarActions, type PostComment } from "@/types/Post/post.types";
import { useToast } from "primevue/usetoast";
import Skeleton from "primevue/skeleton";

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
    class="prose grid w-full max-w-none grid-cols-4 place-items-center gap-2 dark:prose-invert"
  >
    <Skeleton height="2rem" width="70px" />
    <Skeleton height="2rem" width="70px" />

    <Skeleton height="2rem" width="70px" />
    <Skeleton height="2rem" width="70px" />
  </div>
</template>
<style scoped>
.action-container {
  @apply flex w-full cursor-pointer items-center justify-center gap-3 py-2;
  @apply hover:text-primary-400;
}
</style>
,
