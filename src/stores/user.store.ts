import type { Post, PostComment } from "@/types/Post/post.types";
import type { User } from "@/types/User/user.types";
import { defineStore } from "pinia";
import { ref } from "vue";
import usePostStore from "./posts.store";
import useCommentStore from "./comments.store";

const useUserStore = defineStore("user", () => {
  const status = ref<boolean>();
  const userInfo = ref<User | null>(null);
  const loading = ref<boolean>(true);
  const postStore = usePostStore();
  const commentStore = useCommentStore();

  function logOut() {
    status.value = false;
    userInfo.value = null; // Clear user info on logout
    loading.value = false;
  }

  function logIn(info: User) {
    userInfo.value = info;
    status.value = true;
    loading.value = false;
  }

  function startListening() {
    window.Echo.private(`App.Models.User.${userInfo.value?.id}`)
      .listen("UserSpecificPostUpdates", (e: { updates: Partial<Post> }) => {
        postStore.updatePost(e.updates);
      })
      .listen(
        "UserSpecificCommentUpdates",
        (e: { updates: Partial<PostComment> }) => {
          commentStore.updateComment(e);
        },
      );
  }

  function stopListening() {
    window.Echo.leave(`App.Models.User.${userInfo.value?.id}`);
  }

  return {
    status,
    userInfo,
    logOut,
    logIn,
    loading,
    startListening,
    stopListening,
  };
});

export default useUserStore;
