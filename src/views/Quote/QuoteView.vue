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
import CommentEditor from "@/components/Comment/CommentEditor.vue";
import useCommentStore from "@/stores/comments.store";

const postStore = usePostStore();
const route = useRoute();
const currentPostId = Number(route.params.id);
const errMessage = ref<string>();
const post = ref<Post | null>(null);

const commentStore = useCommentStore();
const paginatedComments = ref<PaginatedResponse<PostComment> | null>(null);
const commentsLoading = ref(false);

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
  threshold: 0.1,
});

const loadComments = async (url?: string) => {
  if (post.value) {
    commentsLoading.value = true;
    try {
      const response = await PostUtils.fetchComments(post.value.id, url);
      paginatedComments.value = response;
      hasMoreComments.value = response.next_page_url !== null;
      response.data.forEach((comment) => {
        commentStore.addComment(comment, post.value?.id as number);
      });
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

watch(route, (newRoute) => {
  window.scrollTo(0, 0);
  window.scrollTo(0, 0);
});

onMounted(async () => {
  post.value = postStore.posts.find((p) => p.id === currentPostId) || null;

  if (!post.value) {
    try {
      const fetchedPost = await PostUtils.fetchPosts(
        `/posts/${route.params.id}`,
      );
      postStore.addPost(fetchedPost as Post);
      post.value = postStore.posts.find((p) => p.id === currentPostId) || null;
    } catch (error) {
      if (isAxiosError(error)) {
        errMessage.value = error.response?.data.message;
      }
    }
  }
});
const topLevelComments = computed(() => {
  if (post.value) {
    const postComments = commentStore.comments[post.value.id] || {};
    const topLevel = Object.values(postComments).filter(
      (comment) => comment.parent_id === null,
    );
    return topLevel;
  }
});
</script>
<template>
  <div class="flex h-full flex-col">
    <CardPostSkeleton v-if="!post"></CardPostSkeleton>
    <CardPost v-if="post" :post="post as Post"></CardPost>

    <div
      id="commentsContainer"
      class="prose flex max-w-none flex-col gap-3 p-1 dark:prose-invert"
    >
      <h3>Comments</h3>
      <Comment
        v-if="Object.keys(commentStore.comments).length > 0"
        v-for="(comment, index) in topLevelComments"
        :comment="comment"
        :key="comment.id + index"
      ></Comment>
      <div class="flex flex-col gap-3">
        <CommentSkeleton
          v-if="commentsLoading"
          :key="'commentsSkeleton'"
          v-for="n in 10"
        />
        <CommentSkeleton
          id="loaderComments"
          v-if="hasMoreComments"
          :key="'bamboo'"
          v-for="n in 10"
        />
      </div>
    </div>
  </div>
  <div class="sticky bottom-[1px] z-10 h-fit">
    <CommentEditor v-if="post" :post-id="post.id"></CommentEditor>
  </div>
</template>
