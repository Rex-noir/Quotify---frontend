import { PostStyles } from "@/types/Post/post.types";
import { defineStore } from "pinia";
import { ref } from "vue";

const usePostStore = defineStore("post", () => {
  const post_style = ref<PostStyles>(PostStyles.CARD);

  function setStyle(style: PostStyles) {
    post_style.value = style;
  }

  return { post_style, setStyle };
});

export default usePostStore;
