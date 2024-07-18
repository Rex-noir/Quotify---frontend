<script setup lang="ts">
import usePostStore from "@/stores/posts.store";
import useUserStore from "@/stores/user.store";
import { PostBarActions, Reactions, type Post } from "@/types/Post/post.types";
import PostUtils from "@/utils/post.utils";
import { debounce } from "@/utils/utils";
import { useToast } from "primevue/usetoast";
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  post: Post;
}>();

const postStore = usePostStore();
const post = computed(() =>
  postStore.posts.find((p) => p.id === props.post.id),
);

const toast = useToast();
const router = useRouter();

const userStore = useUserStore();

const handleClick = async (action: PostBarActions) => {
  if (!userStore.status && action !== PostBarActions.COMMENT) {
    toast.add({
      severity: "info",
      detail: "Please login!",
      life: 1000,
    });
  } else {
    switch (action) {
      case PostBarActions.COMMENT:
        router.push({
          name: "viewQuote",
          params: { id: props?.post.id },
        });
        break;

      case PostBarActions.LIKE:
        postStore.toggleReaction(props.post.id, Reactions.LIKE);
        debounceReact(Reactions.LIKE);
        break;

      case PostBarActions.DISLIKE:
        postStore.toggleReaction(props.post.id, Reactions.DISLIKE);
        debounceReact(Reactions.DISLIKE);
        break;
    }
  }
};

const debounceReact = debounce(async (reaction: Reactions) => {
  await PostUtils.react(props.post.id, reaction);
}, 2000);
</script>
<template>
  <div
    class="prose grid w-full max-w-none grid-cols-4 place-items-center gap-2 border-t dark:prose-invert dark:border-slate-800"
  >
    <div
      v-ripple
      @click="handleClick(PostBarActions.LIKE)"
      class="action-container"
      :class="post?.is_liked_by_user ? 'text-teal-500' : ''"
    >
      <span class="pi pi-thumbs-up" aria-label="Like" />
      <span>{{ post?.likes_count ? post?.likes_count : "0" }}</span>
    </div>
    <div
      @click="handleClick(PostBarActions.DISLIKE)"
      v-ripple
      :class="post?.is_disliked_by_user ? 'text-blue-500' : ''"
      class="action-container"
    >
      <span class="pi pi-thumbs-down" aria-label="Dislike" />
      <span>{{ post?.dislikes_count ? post?.dislikes_count : "0" }}</span>
    </div>
    <div
      @click="handleClick(PostBarActions.COMMENT)"
      v-ripple
      class="action-container"
    >
      <span class="pi pi-comment" aria-label="Comment" />
      <span>{{ post?.comments_count ? post?.comments_count : "0" }}</span>
    </div>
    <div
      @click="handleClick(PostBarActions.SHARE)"
      v-ripple
      class="action-container h-full"
    >
      <span class="pi pi-share-alt" aria-label="Share" />
      <span aria-label="Share">Share</span>
    </div>
  </div>
</template>
<style scoped>
.action-container {
  @apply flex w-full cursor-pointer flex-col items-center justify-center py-2;
}
</style>
