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
import useResponsive from "@/stores/responsive.store";

const commentsLoading = ref(false);
const props = defineProps<{
  comment: PostComment;
  level: number;
  parentUser?: User;
}>();
const collapsed = ref(false);
const replies = ref<PostComment[]>([]);

const responsive = useResponsive();


const commentsLoaded = computed(() => {
  return props.comment.replies_count === replies.value.length;
});

const colorPalette = [
  "border-green-600", // Level 0
  "border-blue-300", // Level 1
  "border-amber-400", // Level 2
  "border-purple-400", // Level 3
  "border-lime-400", // Level 4
];

const borderColors = computed(() => {
  return colorPalette[props.level % colorPalette.length];
});

const loadMore = async () => {
  commentsLoading.value = true;

  try {
    const newReplies = await PostUtils.loadComments(props.comment.id);
    replies.value = newReplies;
    commentsLoading.value = false;
  } catch (error) {
    commentsLoading.value = false;
    throw error;
  }
};
</script>
<template>
  <div
    class="comment relative flex w-full flex-col gap-3 border-none bg-none dark:bg-inherit"
  >
    <Panel
      :class="borderColors"
      toggleable
      class="comment-parent rounded-none border-b-0 border-l-0 border-r-0 border-t-0 bg-inherit"
    >
      <template #toggleicon>
        <div class="">
          <span
            v-if="collapsed"
            @click="collapsed = !collapsed"
            class="pi pi-chevron-down"
          ></span>
          <span
            v-else
            @click="collapsed = !collapsed"
            class="pi pi-chevron-up"
          ></span>
        </div>
      </template>

      <template #header>
        <div class="prose flex items-center gap-3 p-2 dark:prose-invert">
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
          class="prose dark:prose-invert dark:bg-surface-0"
          :label="`${parentUser.name}`"
          icon="pi pi-at"
        />
      </div>
      <div class="prose max-w-none p-2 py-2 leading-tight dark:prose-invert">
        <p>{{ comment?.content }}</p>
      </div>

      <div class="flex">
        <CommentActionBar :comment="comment" />
      </div>

      <div class="ml-4 flex flex-col" v-if="replies">
        <Comment
          v-for="reply in replies"
          :key="reply.id"
          :parent-user="comment.user"
          :level="level + 1"
          :comment="reply"
        />
      </div>
      <div
        v-if="comment.replies_count && !commentsLoaded"
        class="prose flex items-center gap-2 p-2 dark:prose-invert"
      >
        <span @click="loadMore" class="cursor-pointer hover:text-purple-300">{{
          `View ${comment.replies_count} replies`
        }}</span>
        <svg
          v-if="commentsLoading"
          class="... mr-3 h-5 w-5 animate-spin"
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
