<script setup lang="ts">
import type { Post } from "@/types/Post/post.types";
import DataView from "primevue/dataview";
import { ref } from "vue";
import CardPost from "@/components/Posts/CardPost.vue";

const posts = ref<Post[]>([
  {
    username: "Phengphon",
    title: "This is the title",
    quote: "This is the quotehhhfsf",
  },
  {
    username: "hi",
  },
]);
</script>

<template>
  <main>
    <DataView :value="posts">
      <template #list="slotProp">
        <CardPost
          v-for="(post, index) in slotProp.items"
          :post="post as Post"
        ></CardPost>
      </template>
    </DataView>
  </main>
</template>
