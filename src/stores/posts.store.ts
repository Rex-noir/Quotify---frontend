import { Reactions, type Post } from "@/types/Post/post.types";
import { defineStore } from "pinia";
import { ref } from "vue";
import useUserStore from "./user.store";
import { useRoute, useRouter } from "vue-router";

const usePostStore = defineStore("post", () => {
  const posts = ref<Post[]>([]);
  const userStore = useUserStore();
  // const showModal = ref<boolean>(false);
  const route = useRoute();
  const router = useRouter();

  // function toggleModal(bool?: boolean) {
  //   showModal.value = bool || !showModal.value;
  // }

  function addPost(post: Post) {
    if (!posts.value.some((p) => p.id === post.id)) {
      posts.value.push(post);
    }
  }

  function startListeningForUpdates() {
    window.Echo.channel("posts").listen(
      "PostUpdated",
      (e: { updates: Partial<Post> }) => {
        updatePost(e.updates);
      },
    );
  }

  function stopListeningForUpdates() {
    window.Echo.channel("post").stopListening("PostUpdated");
  }

  function updatePost(updates: Partial<Post>) {
    const postIndex = posts.value.findIndex((post) => post.id === updates.id);

    if (postIndex !== -1) {
      posts.value.splice(postIndex, 1, {
        ...posts.value[postIndex],
        ...updates,
      });
    } else {
      console.warn("Post id with", updates.id, "not found in store to update.");
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

  function viewPost(postId: number) {
    if (route.name !== "viewQuote") {
      router.push({
        name: "viewQuote",
        params: { id: postId },
      });
    }
  }

  return {
    posts,
    addPost,
    startListeningForUpdates,
    deletePost,
    updatePost,
    // showModal,
    // toggleModal,
    viewPost,
    toggleReaction,
    stopListeningForUpdates,
  };
});

export default usePostStore;
