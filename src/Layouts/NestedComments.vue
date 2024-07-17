<script setup lang="ts">
import useCommentStore from "@/stores/comments.store";
import PostUtils from "@/utils/post.utils";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Comment from "@/components/Comment/Comment.vue";
import type { PostComment } from "@/types/Post/post.types";

const route = useRoute();
const commentStore = useCommentStore();
const currentCommentId = Number(route.params.comment_id);
const currentPostId = Number(route.params.post_id);
const currentComment = ref<PostComment | null>(null);
const parentComment = ref<PostComment | null>(null);
const replies = ref<PostComment[] | null>(null);

onMounted(async () => {
  try {
    //Current comment
    if (!currentComment.value) {
      currentComment.value = await PostUtils.singleComment(currentCommentId);
      commentStore.addComment(currentComment.value, currentPostId);
    }

    //Parent comment
    parentComment.value =
      commentStore.comments[currentPostId][
        currentComment.value.parent_id as number
      ];

    if (currentComment.value && !parentComment.value) {
      parentComment.value = await PostUtils.singleComment(
        currentComment.value.parent_id as number,
      );
      commentStore.addComment(parentComment.value, currentPostId);
    }

    //Replies
    replies.value =
      commentStore.comments[currentPostId][currentCommentId].replies;
    if (replies.value?.length === 0) {
      replies.value = await PostUtils.loadReplies(currentCommentId);
      replies.value.forEach((reply) =>
        commentStore.addComment(reply, reply.post_id),
      );
    }
    commentStore.listenForComments(currentComment.value.post_id);
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <div class="flex flex-col gap-1">
    <div>
      <Comment
        v-if="currentComment"
        :nested-main="true"
        :comment="currentComment"
        :parent-user="parentComment?.user"
      ></Comment>
    </div>
    <div class="ml-4 flex flex-col" v-if="replies?.length">
      <Comment
        v-if="replies?.length > 0"
        v-for="(reply, index) in replies"
        :comment="reply"
        :level="1"
        :parent-user="currentComment?.user"
        :key="reply.id + index"
      />
    </div>
  </div>
</template>
