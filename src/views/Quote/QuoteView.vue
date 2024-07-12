<script setup lang="ts">
import usePostStore from "@/stores/posts.store";
import type { Post, PostComment } from "@/types/Post/post.types";
import PostUtils from "@/utils/post.utils";
import { isAxiosError } from "axios";
import { onMounted, ref, watch } from "vue";
import Comment from "@/components/Comment/Comment.vue";
import { useRoute } from "vue-router";
import CardPost from "@/components/Posts/CardPost.vue";
import CardPostSkeleton from "@/components/Posts/CardPostSkeleton.vue";
import type { PaginatedResponse } from "@/types/Response/apiresponses.types";

const postStore = usePostStore();
const post = ref<Post>();
const route = useRoute();
const errMessage = ref<string>();
const comments = ref<PaginatedResponse<PostComment> | null>(null);

onMounted(async () => {
  if (postStore.currentPost) {
    post.value = postStore.currentPost;
  } else {
    try {
      const posts = await PostUtils.fetchPosts(`/posts/${route.params.id}`);
      post.value = posts as Post;
    } catch (error) {
      if (isAxiosError(error)) {
        errMessage.value = error.response?.data.message;
      }
    }
  }
});
watch(post, async (newPost) => {
  if (newPost?.id && post.value) {
    try {
      const response = await PostUtils.fetchComments(post.value.id);
      comments.value = response;
    } catch (error) {
      if (isAxiosError(error)) {
        errMessage.value = error.response?.data.message;
      }
    }
  }
});
</script>
<template>
  <div class="flex flex-col">
    <CardPostSkeleton v-if="!post"></CardPostSkeleton>
    <CardPost v-if="post" :post="post as Post"></CardPost>
    <div class="prose max-w-none p-2 flex flex-col gap-3 dark:prose-invert">
      <h3>Comments</h3>
      <Comment
        v-for="(comment, index) in comments?.data"
        :comment="comment"
        :level="0"
        :key="index"
      ></Comment>
    </div>
  </div>
</template>
