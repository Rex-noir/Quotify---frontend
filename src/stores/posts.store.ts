import { type Post, type PostComment } from "@/types/Post/post.types";
import { defineStore } from "pinia";
import { ref } from "vue";
import useCommentStore from "./comments.store";

const usePostStore = defineStore("post", () => {
  const scrollPosition = ref<number | null>(null);
  const posts = ref<Post[]>([]);
  const commentStore = useCommentStore();

  function addPost(post: Post) {
    posts.value?.push(post);
  }

  function startListeningForUpdates() {
    window.Echo.channel("posts")
      .listen("CommentAdded", (e: { comment: PostComment }) => {
        commentStore.addComment(e.comment, e.comment.post_id);
      })
      .listen("PostUpdated", (e: { updates: Post }) => {
        updatePost(e.updates);
      });
  }

  function stopListeningForUpdates() {
    window.Echo.channel("post")
      .stopListening("CommentAdded")
      .stopListening("PostUpdated");
  }

  function updatePost(update: Post) {
    const postIndex = posts.value.findIndex((post) => post.id === update.id);

    if (postIndex !== -1) {
      posts.value[postIndex] = { ...posts.value[postIndex], ...update };
    } else {
      console.warn("Post id with", update.id, "not found in store to update.");
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
    stopListeningForUpdates,
  };
});

export default usePostStore;
