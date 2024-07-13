<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Comment from "@/components/Comment/Comment.vue";
import PostUtils from "@/utils/post.utils";
import type { PostComment } from "@/types/Post/post.types";
import usePostStore from "@/stores/posts.store";
import Button from "primevue/button";

const router = useRouter();
const route = useRoute();
const postStore = usePostStore();

const comment = ref<PostComment | null>(null);
const replies = ref<PostComment[] | null>(null);
const parentComment = ref<PostComment | null>(null);

const goBack = () => {
  router.go(-1);
};

onMounted(async () => {
  if (postStore.currentComment) {
    comment.value = postStore.currentComment;
  } else {
    try {
      const data = await PostUtils.singleComment(Number(route.params.id));
      comment.value = data;
    } catch (error) {
      throw error;
    }
  }
  await getParentComment();
  await loadComments();
});

const getParentComment = async () => {
  try {
    const data = await PostUtils.singleComment(
      Number(comment.value?.parent_id),
    );
    parentComment.value = data;
  } catch (error) {
    throw error;
  }
};

const loadComments = async () => {
  try {
    const data = await PostUtils.loadReplies(Number(route.params.id));
    replies.value = data;
  } catch (error) {
    throw error;
  }
};
</script>
<template>
  <div class="flex flex-col gap-2">
    <Button outlined class="ml-2 w-fit border-none" @click="goBack"
      >Go back</Button
    >
    <div class="flex flex-col gap-2">
      <div v-if="comment">
        <Comment
          :comment="comment"
          :parent-user="parentComment?.user"
          :level="0"
          :nested-main="true"
          :key="comment.id"
        />
      </div>
      <div class="ml-3 flex flex-col gap-2" v-if="replies">
        <Comment
          v-for="reply in replies"
          :parent-user="comment?.user"
          :comment="reply"
          :level="0"
          :key="comment?.id"
        />
      </div>
    </div>
  </div>
</template>
