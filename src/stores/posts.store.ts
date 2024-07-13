import {
  PostStyles,
  type Post,
  type PostComment,
} from "@/types/Post/post.types";
import { defineStore } from "pinia";
import { ref } from "vue";

const usePostStore = defineStore("post", () => {
  const post_style = ref<PostStyles>(PostStyles.CARD);
  const scrollPosition = ref<number | null>(null);
  const currentPost = ref<Post>();
  const currentComment = ref<PostComment>();

  function setStyle(style: PostStyles) {
    post_style.value = style;
  }

  function setCurrentPost(post: Post) {
    currentPost.value = post;
  }

  function setCurrentComment(comment: PostComment) {
    currentComment.value = comment;
  }

  function setScrollPosition(position: number) {
    scrollPosition.value = position;
  }

  return {
    post_style,
    setStyle,
    currentPost,
    scrollPosition,
    setScrollPosition,
    setCurrentPost,
    currentComment,
    setCurrentComment,
  };
});

export default usePostStore;
