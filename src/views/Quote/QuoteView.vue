<script setup lang="ts">
import usePostStore from "@/stores/posts.store";
import type { Post, PostComment } from "@/types/Post/post.types";
import PostUtils from "@/utils/post.utils";
import { isAxiosError } from "axios";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import Comment from "@/components/Comment/Comment.vue";
import { useRoute } from "vue-router";
import CardPost from "@/components/Posts/CardPost.vue";
import CardPostSkeleton from "@/components/Posts/CardPostSkeleton.vue";
import type { PaginatedResponse } from "@/types/Response/apiresponses.types";
import CommentSkeleton from "@/components/Comment/CommentSkeleton.vue";

const postStore = usePostStore();
const post = ref<Post>();
const commentsLoading = ref(false);
const route = useRoute();
const errMessage = ref<string>();
const paginatedComments = ref<PaginatedResponse<PostComment> | null>(null);
const comments = ref<PostComment[]>([]);

const hasMoreComments = ref(false);

const commentsContainer = document.querySelector("#commentsContainer");

const observerLoader = async (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0];
  if (entry.isIntersecting) {
    await loadComments(paginatedComments.value?.next_page_url as string);
  }
};

const observer = new IntersectionObserver(observerLoader, {
  root: commentsContainer,
  rootMargin: "0px",
  threshold: 1,
});

const loadComments = async (url?: string) => {
  if (post.value) {
    commentsLoading.value = true;
    try {
      const response = await PostUtils.fetchComments(post.value.id, url);
      paginatedComments.value = response;
      comments.value = [...comments.value, ...paginatedComments.value.data];
      hasMoreComments.value = response.next_page_url !== null ? true : false;
      commentsLoading.value = false;
    } catch (error) {
      if (isAxiosError(error)) {
        errMessage.value = error.response?.data.message;
      }
      commentsLoading.value = false;
    }
  }
};

watch(post, async (newPost) => {
  if (newPost?.id && post.value) {
    await loadComments();
    await nextTick();
    const commentLoader = document.querySelector("div#loaderComments");
    if (commentLoader) {
      observer.observe(commentLoader);
    }
  }
});

onUnmounted(() => {
  postStore.setScrollPosition(0);
  observer.disconnect();
});

watch(route, (newRoute) => {
  window.scrollTo(0, postStore.scrollPosition as number);
});

onMounted(async () => {
  window.scrollTo(0, 0);
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
</script>
<template>
  <div class="flex h-full flex-col p-1">
    <CardPostSkeleton v-if="!post"></CardPostSkeleton>
    <CardPost v-if="post" :post="post as Post"></CardPost>
    <div
      id="commentsContainer"
      class="prose flex max-w-none flex-col gap-3 p-1 dark:prose-invert"
    >
      <h3>Comments</h3>
      <Comment
        v-if="comments"
        v-for="(comment, index) in comments"
        :comment="comment"
        :level="0"
        :key="comment.id + index"
      ></Comment>
      <CommentSkeleton v-else :key="'commentsSkeleton'" v-for="n in 3" />
      <div
        class="flex flex-col gap-3"
        v-if="hasMoreComments"
        id="loaderComments"
      >
        <CommentSkeleton :key="'bamboo'" v-for="n in 2" />
      </div>
    </div>
  </div>
</template>
