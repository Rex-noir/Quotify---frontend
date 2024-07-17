<script setup lang="ts">
import type { PostComment } from "@/types/Post/post.types";
import dayjs from "dayjs";
import Avatar from "primevue/avatar";
import CommentActionBar from "@/components/Comment/CommentActionsBar.vue";
import Panel from "primevue/panel";
import { computed, ref } from "vue";
import PostUtils from "@/utils/post.utils";
import Chip from "primevue/chip";
import type { User } from "@/types/User/user.types";
import usePostStore from "@/stores/posts.store";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import CommentEditor from "./CommentEditor.vue";
import useCommentStore from "@/stores/comments.store";

const commentsLoading = ref(false);
const props = defineProps<{
  comment: PostComment;
  parentUser?: User;
  nestedMain?: boolean;
}>();

const commentStore = useCommentStore();
const currentComment = ref(
  commentStore.comments[props.comment.post_id][props.comment.id],
);
const commentLoaded = ref<boolean>(false);

const showViewMoreReplies = computed(() => {
  return (
    (currentComment.value.replies_count &&
      (currentComment.value.replies_count as number) > 0 &&
      currentComment.value.replies?.length !==
        currentComment.value.replies_count &&
      !props.nestedMain &&
      !commentLoaded.value) ||
    (currentComment.value.level + 1 >= limit &&
      currentComment.value.replies_count > 0 &&
      !props.nestedMain &&
      !commentLoaded.value)
  );
});

const router = useRouter();

const showReplyEditor = ref(false);

const postStore = usePostStore();

const navigatedToReplies = ref(false);

const limit = commentStore.nestedLimit;

const colorPalette = [
  "border-green-600", // Level 0
  "border-blue-300", // Level 1
  "border-amber-400", // Level 2
  "border-purple-400", // Level 3
  "border-lime-400", // Level 4
];

const borderColors = computed(() => {
  return colorPalette[currentComment.value.level % colorPalette.length];
});

const loadReplies = async () => {
  commentsLoading.value = true;
  try {
    const newReplies = await PostUtils.loadReplies(props.comment.id);
    newReplies.forEach((reply) =>
      commentStore.addComment(reply, reply.post_id),
    );
    commentsLoading.value = false;
  } catch (error) {
    commentsLoading.value = false;
    throw error;
  }
};

const handleLoadingMore = async () => {
  saveScrollPosition();
  if (currentComment.value.level >= limit) {
    postStore.setCurrentComment(props.comment);
    navigatedToReplies.value = true; // Set the flag here
    router.push({
      name: "Replies",
      params: { comment_id: props.comment.id, post_id: props.comment.post_id },
    });
  } else {
    await loadReplies();
    commentLoaded.value = true;
  }
};

const saveScrollPosition = () => {
  usePostStore().setScrollPosition(window.scrollY);
};
</script>
<template>
  <div
    class="comment relative flex h-full w-full flex-col gap-3 bg-none dark:bg-inherit"
  >
    <Panel
      :class="borderColors"
      toggleable
      class="comment-parent rounded-none border-b-0 border-l-0 border-r-0 border-t-0 dark:bg-[#2d2a2a]"
    >
      <template #toggleicon="{ collapsed }">
        <div class="">
          <span
            :class="collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up'"
          ></span>
        </div>
      </template>

      <template #header>
        <div class="prose flex items-center gap-1 p-2 dark:prose-invert">
          <div v-if="nestedMain">
            <Button
              icon="pi pi-arrow-left"
              @click="$router.go(-1)"
              class="prose border-none bg-inherit p-0 dark:prose-invert"
            />
          </div>
          <Avatar
            :label="comment?.user.name.charAt(0)"
            ass="mr-2"
            shape="circle"
            size="small"
          />
          <div class="flex flex-col">
            <span class="prose font-semibold leading-none dark:prose-invert"
              >@{{ comment?.user.name ? comment.user.name : "username" }}</span
            >
            <span class="prose prose-sm dark:prose-invert">{{
              comment?.created_at
                ? dayjs(comment.created_at).format("DD-MM-YYYY h:mm a")
                : "1 second ago"
            }}</span>
          </div>
        </div>
      </template>
      <div
        v-if="parentUser"
        class="prose prose-purple p-2 font-bold dark:prose-invert"
      >
        <Chip
          class="prose dark:prose-invert px-2 p-0 text-sm dark:bg-surface-0"
          :label="`@${parentUser.name}`"
          icon="pi pi-reply"
        />
      </div>
      <div class="prose max-w-none p-2 py-2 leading-tight dark:prose-invert">
        <p>{{ comment?.content }}</p>
      </div>
      <div class="flex">
        <CommentActionBar
          @reply-clicked="showReplyEditor = !showReplyEditor"
          :comment="comment"
        />
      </div>
      <div v-if="showReplyEditor" class="p-3">
        <CommentEditor
          @comment-success="showReplyEditor = false"
          :post-id="comment.post_id"
          :parent-comment="comment"
        />
      </div>
      <div
        v-if="showViewMoreReplies"
        class="prose flex max-w-none items-center justify-end gap-2 dark:prose-invert"
      >
        <span
          v-if="!commentsLoading"
          @click="handleLoadingMore"
          class="h-5 cursor-pointer hover:text-purple-300"
          >{{ `View ${comment.replies_count} replies` }}</span
        >
        <svg
          v-if="commentsLoading"
          class="mr-3 h-5 w-5 animate-spin"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
      <div
        class="ml-4 flex flex-col"
        v-if="
          currentComment.replies && currentComment.level < limit && !nestedMain
        "
      >
        <Comment
          v-for="reply in currentComment.replies"
          :key="reply.id"
          :parent-user="comment.user"
          :comment="reply"
        />
      </div>
    </Panel>
  </div>
</template>
<style scoped>
.comment-parent::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-left: 1px solid;
  border-color: inherit;
  height: 100%;
  transform: translateX(-50%);
}
</style>
<style lang="css">
.p-chip-icon {
  @apply prose dark:prose-invert;
}
</style>
