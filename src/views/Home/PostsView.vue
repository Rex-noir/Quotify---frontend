<script setup lang="ts">
import type { Post } from "@/types/Post/post.types";
import DataView from "primevue/dataview";
import { onMounted, ref } from "vue";
import CardPost from "@/components/Posts/CardPost.vue";
import PostUtils from "@/utils/post.utils";
import CardPostSkeleton from "@/components/Posts/CardPostSkeleton.vue";

const posts = ref<Post[]>();
onMounted(async () => {
  try {
    const response = await PostUtils.fetchPosts();
    posts.value = response.data;
  } catch (error) {
    throw error;
  }
});
</script>

<template>
  <main class="">
    <DataView :value="posts">
      <template #empty>
        <CardPostSkeleton v-for="(items, index) in [1, 2, 3, 4, 5, 6, 7]" />
      </template>
      <template #list="slotProp">
        <div class="flex flex-col gap-2">
          <CardPost
            v-for="(post, index) in slotProp.items"
            :post="post as Post"
          ></CardPost>
        </div>
      </template>
    </DataView>
  </main>
</template>
<style>
.p-dataview-content {
  @apply dark:bg-surface-0;
}
</style>
