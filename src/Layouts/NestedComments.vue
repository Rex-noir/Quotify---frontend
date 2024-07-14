<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Comment from "@/components/Comment/Comment.vue";
import PostUtils from "@/utils/post.utils";
import type { PostComment } from "@/types/Post/post.types";
import usePostStore from "@/stores/posts.store";
import CommentSkeleton from "@/components/Comment/CommentSkeleton.vue";

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
    <div class="flex flex-col gap-2">
      <div>
        <Comment
          v-if="comment"
          :comment="comment"
          :parent-user="parentComment?.user"
          :level="0"
          :nested-main="true"
          :key="comment.id"
        />
        <CommentSkeleton v-else />
      </div>
      <div class="ml-3 flex flex-col gap-2">
        <Comment
          v-if="replies"
          v-for="reply in replies"
          :parent-user="comment?.user"
          :comment="reply"
          :level="0"
          :key="comment?.id"
        />
        <CommentSkeleton v-else v-for="n in 3" />
      </div>
    </div>
  </div>
</template>
