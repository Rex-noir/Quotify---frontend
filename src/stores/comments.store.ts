import { Reactions, type PostComment } from "@/types/Post/post.types";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import useResponsive from "./responsive.store";
import { useRoute, useRouter } from "vue-router";
import usePostStore from "./posts.store";
import useUserStore from "./user.store";

const useCommentStore = defineStore("comments", () => {
  const comments = ref<{ [postId: number]: { [id: number]: PostComment } }>([]);

  const layout = computed(() => useResponsive().layout);
  const postsStore = usePostStore();
  const router = useRouter();
  const route = useRoute();

  const baseLimits = {
    mobile: 2,
    tablet: 6,
    desktop: 12,
  };

  const baseLimit = computed(() => baseLimits[layout.value]);

  console.log(baseLimit.value);

  const routeLimits = ref<{ [path: string]: number }>({});

  // Function to initialize or update route limits
  function initializeRouteLimit(path: string) {
    if (!routeLimits.value[path]) {
      routeLimits.value[path] = baseLimit.value;
    }
  }

  watch(
    () => route.fullPath,
    (newPath, oldPath) => {
      // Ensure routeLimits are only set for specific routes
      if (route.name === "viewQuote" || route.name === "Replies") {
        // Initialize the base limit if not already set
        if (!routeLimits.value[newPath]) {
          if (route.name === "viewQuote") {
            // Set the base limit for the 'viewQuote' route
            routeLimits.value[newPath] = baseLimits[layout.value];
          } else if (route.name === "Replies") {
            // For nested routes like 'Replies'
            if (oldPath && routeLimits.value[oldPath] !== undefined) {
              // Calculate the new limit dynamically based on the old path's limit
              routeLimits.value[newPath] =
                routeLimits.value[oldPath] + baseLimits[layout.value];
            } else {
              // If accessed directly, set to base limit
              routeLimits.value[newPath] = baseLimits[layout.value];
            }
          }
        }
      }
    },
    { immediate: true },
  );

  function addComment(newComment: PostComment, postId: number) {
    if (
      !postsStore.posts.find((post) => post.id === postId) &&
      route.name !== "Replies"
    ) {
      return;
    }
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
          parentComment.replies_count = parentComment.replies.length;

          if (newComment.level > routeLimits.value[route.fullPath]) {
            router.push({
              name: "Replies",
              params: {
                comment_id: parentComment.id,
                id: parentComment.post_id,
              },
            });
          }
        }
      }
    }
  }

  function toggleReaction(
    id: number,
    post_id: number,
    reaction: Reactions,
    to?: boolean,
  ) {
    if (useUserStore().status) {
      const comment = comments.value[post_id][id];
      if (comment) {
        //If the reaction is LIKE
        if (reaction === Reactions.LIKE) {
          const newIsLikedByUser = to || !comment.is_liked_by_user;
          if (newIsLikedByUser) {
            if (!comment.is_liked_by_user) {
              comment.is_liked_by_user = true;
              if (!to) comment.likes_count++;
            }

            if (comment.is_disliked_by_user) {
              comment.is_disliked_by_user = false;
              if (!to) comment.dislikes_count--;
            }
          } else {
            if (comment.is_liked_by_user) {
              comment.is_liked_by_user = false;
              if (!to) comment.likes_count--;
            }
          }
        }

        //If the reaction is DISLIKE
        if (reaction === Reactions.DISLIKE) {
          const newIsDislikedByUser = to || !comment.is_disliked_by_user;
          if (newIsDislikedByUser) {
            if (!comment.is_disliked_by_user) {
              comment.is_disliked_by_user = true;
              if (!to) comment.dislikes_count++;
            }
            if (comment.is_liked_by_user) {
              comment.is_liked_by_user = false;
              if (!to) comment.likes_count--;
            }
          } else {
            if (comment.is_disliked_by_user) {
              comment.is_disliked_by_user = false;
              if (!to) comment.dislikes_count--;
            }
          }
        }
      } else {
        console.warn("Comment id with ", id, "could not be found.");
      }
    } else {
      console.warn("User must be logged in!");
    }
  }

  function updateComment(updates: Partial<PostComment>) {
    if (updates.post_id && updates.id) {
      if (comments.value[updates.post_id][updates.id]) {
        const comment = getComment(updates.post_id, updates.id);
        comments.value[updates.post_id][updates.id] = {
          ...comment,
          ...updates,
        };
      } else {
        console.warn("Comment to update is not found");
      }
    } else console.warn("Invalid comment updates received!");
  }

  function getComment(postId: number, commentId: number) {
    return comments.value[postId][commentId];
  }

  function startListeningForComments() {
    window.Echo.channel(`comments`)
      .listen(`CommentAdded`, (e: { comment: PostComment }) => {
        addNewCommentsFromSocket(e.comment);
      })
      .listen("CommentUpdated", (e: { updates: Partial<PostComment> }) => {
        updateComment(e.updates);
      });
  }

  function addNewCommentsFromSocket(comment: PostComment) {
    if (!comment.parent_id) {
      addComment(comment, comment.post_id);
    }
    if (comment.parent_id) {
      const parentComment = getComment(comment.post_id, comment.parent_id);
      if (
        parentComment &&
        parentComment.replies &&
        parentComment.replies.length > 0
      ) {
        addComment(comment, comment.post_id);
        console.log("Comment added");
      }
    }
  }

  function clearComments(postId?: number) {
    if (postId) {
      delete comments.value[postId];
    } else {
      comments.value = {};
    }
  }

  function stopListeningForComments() {
    window.Echo.channel(`comments`).stopListening("CommentAdded");
  }
  return {
    comments,
    addComment,
    startListeningForComments,
    stopListeningForComments,
    clearComments,
    getComment,
    toggleReaction,
    routeLimits,
    initializeRouteLimit,
    updateComment,
  };
});

export default useCommentStore;
