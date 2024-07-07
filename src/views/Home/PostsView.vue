<script setup lang="ts">
import type { Post } from "@/types/Post/post.types";
import DataView from "primevue/dataview";
import { onMounted, ref } from "vue";
import CardPost from "@/components/Posts/CardPost.vue";
import PostUtils from "@/utils/post.utils";

const posts = ref<Post[]>();
onMounted(async () => {
  try {
    const response = await PostUtils.fetchPostLists();
    posts.value = response.data;
  } catch (error) {
    throw error;
  }
});
</script>

<template>
  <main class="grid-cols-5">
    <DataView class="md:col-span-3" :value="posts">
      <template #empty
        ><div class="h-full w-full text-center">No data to show!</div></template
      >
      <template #list="slotProp">
        <CardPost
          v-for="(post, index) in slotProp.items"
          :post="post as Post"
        ></CardPost>
      </template>
    </DataView>
  </main>
</template>
