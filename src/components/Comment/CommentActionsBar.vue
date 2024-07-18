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
}, 2000);
</script>
<template>
  <div
    class="prose grid w-full max-w-none grid-cols-4 place-items-center gap-2 dark:prose-invert"
  >
    <div
      v-ripple
      @click="handleClick(CommentBarActions.LIKE)"
      class="action-container"
      :class="[{ 'text-teal-500': comment?.is_liked_by_user }]"
    >
      <span>{{ comment?.likes_count ? comment?.likes_count : "0" }}</span>
      <span class="pi pi-thumbs-up" aria-label="Like" />
    </div>
    <div
      @click="handleClick(CommentBarActions.DISLIKE)"
      v-ripple
      class="action-container"
      :class="[{ 'text-blue-500': comment?.is_disliked_by_user }]"
    >
      <span>{{ comment?.dislikes_count ? comment?.dislikes_count : "0" }}</span>
      <span class="pi pi-thumbs-down" aria-label="Dislike" />
    </div>
    <div
      @click="handleClick(CommentBarActions.COMMENT)"
      v-ripple
      class="action-container"
    >
      <span
        class="prose dark:prose-invert"
        :aria-label="commentEditorCollapsed ? 'Close' : 'Reply'"
        >{{ commentEditorCollapsed ? "Close" : "Reply" }}</span
      >
    </div>
    <div
      @click="handleClick(CommentBarActions.SHARE)"
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
}
</style>
,
