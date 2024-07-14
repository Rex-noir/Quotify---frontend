<script setup lang="ts">
import type { Post } from "@/types/Post/post.types";
import DataView from "primevue/dataview";
import { onMounted, ref } from "vue";
import CardPost from "@/components/Posts/CardPost.vue";
import PostUtils from "@/utils/post.utils";
import CardPostSkeleton from "@/components/Posts/CardPostSkeleton.vue";
import type { PaginatedResponse } from "@/types/Response/apiresponses.types";

const posts = ref<PaginatedResponse<Post>>();
onMounted(async () => {
  try {
    const response = await PostUtils.fetchPosts();
    posts.value = response as PaginatedResponse<Post>;
  } catch (error) {
    throw error;
  }
});
</script>

<template>
  <main class="">
    <DataView :value="posts?.data">
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
