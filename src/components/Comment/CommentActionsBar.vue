<script setup lang="ts">
import useCommentStore from "@/stores/comments.store";
import useUserStore from "@/stores/user.store";
import {
  CommentBarActions,
  Reactions,
  type PostComment,
} from "@/types/Post/post.types";
import PostUtils from "@/utils/post.utils";
import { debounce } from "@/utils/utils";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";

const props = defineProps<{
  comment: PostComment;
}>();

const toast = useToast();
const emit = defineEmits<{ replyClicked: [] }>();
const commentEditorCollapsed = ref(false);

const userStore = useUserStore();
const commentStore = useCommentStore();

const handleClick = async (action: CommentBarActions) => {
  if (!userStore.status) {
    toast.add({
      severity: "info",
      detail: "Please login!",
      life: 1000,
    });
  } else {
    switch (action) {
      case CommentBarActions.COMMENT:
        emit("replyClicked");
        commentEditorCollapsed.value = !commentEditorCollapsed.value;
        break;

      case CommentBarActions.LIKE:
        commentStore.toggleReaction(
          props.comment.id,
          props.comment.post_id,
          Reactions.LIKE,
        );
        debounceReact(Reactions.LIKE);
        break;

      case CommentBarActions.DISLIKE:
        commentStore.toggleReaction(
          props.comment.id,
          props.comment.post_id,
          Reactions.DISLIKE,
        );
        debounceReact(Reactions.DISLIKE);
        break;
    }
  }
};

const debounceReact = debounce(async (reaction: Reactions) => {
  await PostUtils.reactComment(props.comment.id, reaction);
}, 0);
</script>
<template>
  <div
    class="prose flex max-w-none place-items-center gap-2 text-sm dark:prose-invert"
  >
    <div class="action-container">
      <span>{{ comment?.likes_count ? comment?.likes_count : "0" }}</span>
      <span
        :class="[{ 'text-teal-500': comment?.is_liked_by_user }]"
        @click="handleClick(CommentBarActions.LIKE)"
        aria-label="Like"
        class="action-text"
        >{{ comment.likes_count > 1 ? "Likes" : "Like" }}</span
      >
    </div>
    <div class="action-container">
      <span>{{ comment?.dislikes_count ? comment?.dislikes_count : "0" }}</span>
      <span
        class="action-text"
        @click="handleClick(CommentBarActions.DISLIKE)"
        aria-label="Dislike"
        :class="[{ 'text-blue-500': comment?.is_disliked_by_user }]"
        >{{ comment.dislikes_count > 1 ? "Dislikes" : "Dislike" }}</span
      >
    </div>
    <div class="action-container">
      <span
        class="action-text"
        @click="handleClick(CommentBarActions.COMMENT)"
        :aria-label="commentEditorCollapsed ? 'Close' : 'Reply'"
        >{{ commentEditorCollapsed ? "Close" : "Reply" }}</span
      >
    </div>
    <div class="action-container h-full">
      <span
        class="action-text"
        @click="handleClick(CommentBarActions.SHARE)"
        aria-label="Share"
        >Share</span
      >
    </div>
  </div>
</template>
<style scoped>
.action-container {
  @apply flex cursor-pointer items-center justify-center gap-1;
}
.action-text {
  @apply hover:text-slate-400 active:text-slate-700;
}
</style>
,
