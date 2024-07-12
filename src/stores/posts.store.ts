import { PostStyles, type Post } from "@/types/Post/post.types";
import { defineStore } from "pinia";
import { ref } from "vue";

const usePostStore = defineStore("post", () => {
  const post_style = ref<PostStyles>(PostStyles.CARD);

  const currentPost = ref<Post>();

  function setStyle(style: PostStyles) {
    post_style.value = style;
  }

  function setCurrentPost(post: Post) {
    currentPost.value = post;
  }

  return { post_style, setStyle, currentPost, setCurrentPost };
});

export default usePostStore;
