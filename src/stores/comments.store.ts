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
  const userStore = useUserStore();

  const baseLimits = {
    mobile: 2,
    tablet: 6,
    desktop: 12,
  };

  const baseLimit = computed(() => baseLimits[layout.value]);

  const repliesLimit = ref<{ [path: string]: number }>({});

  // Function to initialize or update route limits
  function initializeRouteLimit(path: string) {
    if (!repliesLimit.value[path]) {
      repliesLimit.value[path] = baseLimit.value;
    }
  }

  watch(
    () => route.fullPath,
    (newPath, oldPath) => {
      // Ensure repliesLimit are only set for specific routes
      if (route.name === "viewQuote" || route.name === "Replies") {
        // Initialize the base limit if not already set
        if (!repliesLimit.value[newPath]) {
          if (route.name === "viewQuote") {
            // Set the base limit for the 'viewQuote' route
            repliesLimit.value[newPath] = baseLimits[layout.value];
          } else if (route.name === "Replies") {
            // For nested routes like 'Replies'
            if (oldPath && repliesLimit.value[oldPath] !== undefined) {
              // Calculate the new limit dynamically based on the old path's limit
              repliesLimit.value[newPath] =
                repliesLimit.value[oldPath] + baseLimits[layout.value];
            } else {
              // If accessed directly, set to base limit
              repliesLimit.value[newPath] = baseLimits[layout.value];
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

          if (newComment.level > repliesLimit.value[route.fullPath]) {
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
    if (!userStore.status) {
      console.warn("Please log in");
      return;
    }

    const comment = comments.value[post_id][id];
    if (!comment) {
      console.warn(`Comment with id ${id} could not be found.`);
      return;
    }

    const currentUserLiked = comment.is_liked_by_user;
    const currentUserDisliked = comment.is_disliked_by_user;

    // Helper function to update the reaction counts
    const updateCounts = (newLiked: boolean, newDisliked: boolean) => {
      // Update the like status
      if (newLiked) {
        comment.likes_count = (comment.likes_count ?? 0) + 1;
      } else if (currentUserLiked) {
        comment.likes_count = Math.max((comment.likes_count ?? 0) - 1, 0);
      }

      // Update the dislike status
      if (newDisliked) {
        comment.dislikes_count = (comment.dislikes_count ?? 0) + 1;
      } else if (currentUserDisliked) {
        comment.dislikes_count = Math.max((comment.dislikes_count ?? 0) - 1, 0);
      }
    };

    // Handle like reaction
    if (reaction === Reactions.LIKE) {
      const shouldLike = to ?? !currentUserLiked;
      const shouldDislike = currentUserDisliked;

      // Update counts based on reaction change
      updateCounts(shouldLike, false);

      // Remove dislike if liking
      if (shouldDislike) {
        comment.is_disliked_by_user = false;
        comment.dislikes_count = Math.max((comment.dislikes_count ?? 0) - 1, 0);
      }

      // Set the new like status
      comment.is_liked_by_user = shouldLike;
    }

    // Handle dislike reaction
    if (reaction === Reactions.DISLIKE) {
      const shouldDislike = to ?? !currentUserDisliked;
      const shouldLike = currentUserLiked;

      // Update counts based on reaction change
      updateCounts(false, shouldDislike);

      // Remove like if disliking
      if (shouldLike) {
        comment.is_liked_by_user = false;
        comment.likes_count = Math.max((comment.likes_count ?? 0) - 1, 0);
      }

      // Set the new dislike status
      comment.is_disliked_by_user = shouldDislike;
    }
  }

  function updateComment(data: {
    public: Partial<PostComment>;
    private: Partial<PostComment>;
  }) {
    if (data.public.post_id && data.public.id) {
      const existingComment =
        comments.value[data.public.post_id][data.public.id];
      if (existingComment) {
        if (data.private.user_id === userStore.userInfo?.id) {
          comments.value[data.public.post_id][data.public.id] = {
            ...existingComment,
            ...data.public,
            ...data.private,
          };
        } else {
          comments.value[data.public.post_id][data.public.id] = {
            ...existingComment,
            ...data.public,
          };
        }
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
      .listen(
        "CommentUpdated",
        (e: {
          public: Partial<PostComment>;
          private: Partial<PostComment>;
        }) => {
          updateComment(e);
        },
      );
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
    repliesLimit,
    initializeRouteLimit,
    updateComment,
  };
});

export default useCommentStore;
