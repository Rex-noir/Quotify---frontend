<script setup lang="ts">
import type { Post } from "@/types/Post/post.types";
import DataView from "primevue/dataview";
import { computed, onMounted, onUnmounted, ref } from "vue";
import CardPost from "@/components/Posts/CardPost.vue";
import PostUtils from "@/utils/post.utils";
import CardPostSkeleton from "@/components/Posts/CardPostSkeleton.vue";
import type { PaginatedResponse } from "@/types/Response/apiresponses.types";
import usePostStore from "@/stores/posts.store";

const postStore = usePostStore();

const posts = ref(postStore.posts);
const isLoading = ref(false);

const paginatedPosts = ref<PaginatedResponse<Post>>();
const hasMore = computed(() => {
  return paginatedPosts.value?.next_page_url !== null;
});

const observerLoader = async (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0];
  if (entry.isIntersecting && !isLoading.value && hasMore.value) {
    await fetchPost(paginatedPosts.value?.next_page_url || undefined);
  }
};

const observer = new IntersectionObserver(observerLoader, {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
});

const fetchPost = async (url?: string) => {
  isLoading.value = true;
  try {
    const response = (await PostUtils.fetchPosts(
      url,
    )) as PaginatedResponse<Post>;
    paginatedPosts.value = response;
    response.data.forEach((post) => postStore.addPost(post));
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    throw error;
  }
};

onMounted(async () => {
  await fetchPost();
  const postLoader = document.querySelector("#postsLoader");
  if (postLoader) {
    observer.observe(postLoader);
  }
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<template>
  <main class="">
    <DataView :value="posts">
      <template #empty>
        <div class="flex flex-col gap-2">
          <CardPostSkeleton v-for="n in 10" />
        </div>
      </template>
      <template #list="slotProp">
        <div class="flex flex-col gap-2">
          <CardPost
            v-for="(post, index) in slotProp.items"
            :post="post as Post"
            :key="post.id"
          ></CardPost>
          <div id="postsLoader" v-if="hasMore && posts" class="flex flex-col">
            <CardPostSkeleton :key="'isLoading'" />
          </div>
          <div
            v-else
            class="prose-gray w-full max-w-none text-center dark:prose-invert dark:text-white"
          >
            <span>You have reached the end of the feeds!</span>
          </div>
        </div>
      </template>
    </DataView>
  </main>
</template>
<style>
.p-dataview-content {
  @apply bg-surface-100 dark:bg-surface-0;
}
</style>
