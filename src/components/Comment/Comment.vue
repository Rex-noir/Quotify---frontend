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
import usePostStore from "@/stores/posts.store";
import { useRouter } from "vue-router";
import Button from "primevue/button";

const commentsLoading = ref(false);
const props = defineProps<{
  comment: PostComment;
  level: number;
  parentUser?: User;
  nestedMain?: boolean;
}>();

const router = useRouter();

const replies = ref<PostComment[] | null>(null);

const { layout } = useResponsive();
const postStore = usePostStore();

const navigatedToReplies = ref(false);

const allRepliesLoaded = computed(() => {
  return replies.value && props.comment.replies_count === replies.value.length;
});

const limit = computed(() => {
  switch (layout) {
    case "mobile":
      return 2;
    case "tablet":
      return 6;
    case "desktop":
      return 12;
  }
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
    const newReplies = await PostUtils.loadReplies(props.comment.id);
    replies.value = newReplies;
    commentsLoading.value = false;
  } catch (error) {
    commentsLoading.value = false;
    throw error;
  }
};

const handleLoadingMore = () => {
  saveScrollPosition();
  if (layout == "mobile" && props.level >= limit.value) {
    postStore.setCurrentComment(props.comment);
    navigatedToReplies.value = true; // Set the flag here
    router.push({ name: "Replies", params: { id: props.comment.id } });
  } else {
    loadMore();
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
        <div class="prose flex items-center gap-3 p-2 dark:prose-invert">
          <div v-if="$route.name === 'Replies'">
            <Button
              icon="pi pi-arrow-left"
              @click="$router.go(-1)"
              class="prose border-none bg-inherit dark:prose-invert"
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
          class="prose dark:prose-invert dark:bg-surface-0"
          :label="`@${parentUser.name}`"
          icon="pi pi-reply"
        />
      </div>
      <div class="prose max-w-none p-2 py-2 leading-tight dark:prose-invert">
        <p>{{ comment?.content }}</p>
      </div>
      <div
        v-if="
          (!nestedMain &&
            comment.replies_count &&
            comment.replies_count > (replies?.length || 0)) ||
          (level + 2 > limit && level !== 0 && !allRepliesLoaded)
        "
        class="prose flex max-w-none items-center justify-end gap-2 p-2 dark:prose-invert"
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
