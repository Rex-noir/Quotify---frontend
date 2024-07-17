import type { PostComment } from "@/types/Post/post.types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import useResponsive from "./responsive.store";
import { useRouter } from "vue-router";

const useCommentStore = defineStore("comments", () => {
  const comments = ref<{ [postId: number]: { [id: number]: PostComment } }>([]);

  const layout = useResponsive().layout;

  const router = useRouter();

  const nestedLimit = computed(() => {
    switch (layout) {
      case "mobile":
        return 2;
      case "tablet":
        return 6;
      case "desktop":
        return 12;
    }
  });

  function addComment(newComment: PostComment, postId: number) {
    if (!comments.value[postId]) {
      comments.value[postId] = {};
    }

    if (!comments.value[postId][newComment.id]) {
      newComment.level = newComment.level ?? 0; // default level to 0 if not provided
      comments.value[postId][newComment.id] = newComment;
      comments.value[postId][newComment.id].replies = [];
    } else {
      if (newComment.replies && newComment.replies.length > 0) {
        const existingComment = comments.value[postId][newComment.id];
        existingComment.replies = existingComment.replies || [];
        newComment.replies.forEach((reply) => {
          reply.level = reply.level ?? 0;
          if (!existingComment.replies?.some((r) => r.id === reply.id)) {
            existingComment.replies?.push(reply);
          }
        });
      }
    }
    if (newComment.parent_id !== null) {
      const parentComment = comments.value[postId][newComment.parent_id];
      if (parentComment) {
        parentComment.replies = parentComment.replies || [];

        if (!parentComment.replies.some((r) => r.id === newComment.id)) {
          newComment.level = (parentComment.level || 0) + 1;
          parentComment.replies.push(newComment);

          if (newComment.level > nestedLimit.value) {
            newComment.level = 0;
            router.push({
              name: "Replies",
              params: {
                comment_id: parentComment.id,
                post_id: parentComment.post_id,
              },
            });
          }
        }
      }
    }
  }

  function getComment(postId: number, commentId: number) {
    return comments.value[postId][commentId];
  }

  function listenForComments(post_id: number) {
    window.Echo.channel(`post.${post_id}`).listen(
      `CommentAdded`,
      (e: { comment: PostComment }) => {
        addComment(e.comment, e.comment.post_id);
      },
    );
  }

  function clearComments(postId?: number) {
    if (postId) {
      delete comments.value[postId];
    } else {
      comments.value = {};
    }
  }

  function stopListeningForComments(post_id: number) {
    window.Echo.channel(`post.${post_id}`).stopListening("CommentAdded");
  }
  return {
    comments,
    addComment,
    listenForComments,
    stopListeningForComments,
    clearComments,
    getComment,
    nestedLimit,
  };
});

export default useCommentStore;
