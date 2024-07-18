import {
  Reactions,
  type Post,
  type PostComment,
} from "@/types/Post/post.types";
import { defineStore } from "pinia";
import { ref } from "vue";
import useCommentStore from "./comments.store";
import useUserStore from "./user.store";

const usePostStore = defineStore("post", () => {
  const scrollPosition = ref<number | null>(null);
  const posts = ref<Post[]>([]);
  const commentStore = useCommentStore();
  const userStore = useUserStore();

  function addPost(post: Post) {
    if (!posts.value.some((p) => p.id === post.id)) {
      posts.value.push(post);
    }
  }

  function startListeningForUpdates() {
    window.Echo.channel("posts")
      .listen("CommentAdded", (e: { comment: PostComment }) => {
        commentStore.addComment(e.comment, e.comment.post_id);
      })
      .listen("PostUpdated", (e: { updates: Post }) => {
        updatePost(e.updates);
      })
      .listen(
        "LikeDislikeClicked",
        (e: {
          likeOrDislike: { is_like: boolean; is_dislike: boolean };
          postId: number;
        }) => {
          if (e.likeOrDislike.is_like) {
            toggleReaction(e.postId, Reactions.LIKE, e.likeOrDislike.is_like);
          }
          if (e.likeOrDislike.is_dislike) {
            toggleReaction(
              e.postId,
              Reactions.DISLIKE,
              e.likeOrDislike.is_dislike,
            );
          }
        },
      );
  }

  function stopListeningForUpdates() {
    window.Echo.channel("post")
      .stopListening("CommentAdded")
      .stopListening("PostUpdated");
  }

  function updatePost(update: Post) {
    const postIndex = posts.value.findIndex((post) => post.id === update.id);

    if (postIndex !== -1) {
      posts.value.splice(postIndex, 1, {
        ...posts.value[postIndex],
        ...update,
      });
    } else {
      console.warn("Post id with", update.id, "not found in store to update.");
    }
  }

  function toggleReaction(postId: number, reaction: Reactions, to?: boolean) {
    if (userStore.status) {
      const postIndex = posts.value.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        const post = posts.value[postIndex];

        if (reaction === Reactions.LIKE) {
          const newIsLikedByUser = to || !post.is_liked_by_user;
          if (newIsLikedByUser) {
            if (!post.is_liked_by_user) {
              post.is_liked_by_user = true;
              if (!to) post.likes_count++;
            }
            if (post.is_disliked_by_user) {
              post.is_disliked_by_user = false;
              if (!to) post.dislikes_count--;
            }
          } else {
            if (post.is_liked_by_user) {
              post.is_liked_by_user = false;
              if (!to) post.likes_count--;
            }
          }
        }

        if (reaction === Reactions.DISLIKE) {
          const newIsDislikedByUser = to || !post.is_disliked_by_user;
          if (newIsDislikedByUser) {
            if (!post.is_disliked_by_user) {
              post.is_disliked_by_user = true;
              if (!to) post.dislikes_count++;
            }
            if (post.is_liked_by_user) {
              post.is_liked_by_user = false;
              if (!to) post.likes_count--;
            }
          } else {
            if (post.is_disliked_by_user) {
              post.is_disliked_by_user = false;
              if (!to) post.dislikes_count--;
            }
          }
        }
      } else {
        console.warn("Post id with ", postId, "could not be found.");
      }
    }
  }

  function deletePost(postId: number) {
    posts.value = posts.value?.filter((post) => post.id !== postId);
  }

  function setScrollPosition(position: number) {
    scrollPosition.value = position;
  }

  return {
    scrollPosition,
    setScrollPosition,
    posts,
    addPost,
    startListeningForUpdates,
    deletePost,
    // toggleLike,
    // toggleDisLike,
    toggleReaction,
    stopListeningForUpdates,
  };
});

export default usePostStore;
