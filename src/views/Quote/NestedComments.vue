<script setup lang="ts">
import useCommentStore from "@/stores/comments.store";
import PostUtils from "@/utils/post.utils";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Comment from "@/components/Comment/Comment.vue";
import type { PostComment } from "@/types/Post/post.types";
import CommentSkeleton from "@/components/Comment/CommentSkeleton.vue";
import Button from "primevue/button";

const route = useRoute();
const commentStore = useCommentStore();
const currentCommentId = Number(route.params.comment_id);
const currentPostId = Number(route.params.id);
const currentComment = ref<PostComment | null>(null);
const parentComment = ref<PostComment | null>(null);

onMounted(async () => {
  try {
    currentComment.value =
      commentStore.comments[currentPostId][currentCommentId];

    parentComment.value =
      commentStore.comments[currentPostId][
        currentComment.value.parent_id as number
      ];
  } catch (error) {
    if (!currentComment.value) {
      currentComment.value = await PostUtils.singleComment(currentCommentId);
      commentStore.addComment(currentComment.value, currentPostId);
    }
    if (currentComment.value && !parentComment.value) {
      parentComment.value = await PostUtils.singleComment(
        currentComment.value.parent_id as number,
      );
      commentStore.addComment(parentComment.value, currentPostId);
    }
  }
});
</script>
<template>
  <div class="flex flex-col gap-1">
    <div>
      <Button
        icon="pi pi-arrow-left"
        @click="$router.go(-1)"
        class="prose border-none bg-inherit p-0 dark:prose-invert"
      />
    </div>
    <div>
      <Comment
        v-if="currentComment"
        :comment="currentComment"
        :parent-user="parentComment?.user"
      ></Comment>
      <CommentSkeleton v-else />
    </div>
    <!-- <div class="ml-4 flex flex-col">
      <Comment
        v-if="replies?.length && replies?.length > 0"
        v-for="(reply, index) in replies"
        :comment="reply"
        :level="1"
        :parent-user="currentComment?.user"
        :key="reply.id + index"
      />
      <CommentSkeleton v-for="n in 2" v-else />
    </div> -->
  </div>
</template>
