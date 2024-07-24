<script setup lang="ts">
import type { PostComment } from "@/types/Post/post.types";
import dayjs from "dayjs";
import Avatar from "primevue/avatar";
import CommentActionBar from "@/components/Comment/CommentActionsBar.vue";
import Panel from "primevue/panel";
import { computed, ref, watch } from "vue";
import PostUtils from "@/utils/post.utils";
import type { User } from "@/types/User/user.types";
import Spinner from "../Spinner.vue";
import useCommentStore from "@/stores/comments.store";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentEditor from "./CommentEditor.vue";
import { formatTextWithMentions } from "@/utils/utils";
import { useRoute, useRouter } from "vue-router";

dayjs.extend(relativeTime);

const commentsLoading = ref(false);
const props = defineProps<{
  comment: PostComment;
  parentUser?: User;
  nestedMain?: boolean;
}>();

const commentStore = useCommentStore();

const router = useRouter();
const route = useRoute();

const commentLoaded = ref<boolean>(false);

const showViewMoreReplies = computed(() => {
  return (
    (props.comment.replies_count &&
      (props.comment.replies_count as number) > 0 &&
      props.comment.replies?.length !== props.comment.replies_count &&
      !props.nestedMain &&
      !commentLoaded.value) ||
    (props.comment.level >= limit.value && props.comment.replies_count > 0)
  );
});

const showReplyEditor = ref(false);

const limit = computed(() => commentStore.repliesLimit[route.fullPath]);

const getColorByLevel = (level: number): string => {
  const colorPalette = [
    "before:border-green-600", // Level 0
    "before:border-blue-300", // Level 1
    "before:border-amber-400", // Level 2
    "before:border-purple-400", // Level 3
    "before:border-lime-400", // Level 4
  ];
  return colorPalette[level % colorPalette.length];
};

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
  if (props.comment.level >= limit.value) {
    router.push({
      name: "Replies",
      params: { comment_id: props.comment.id, id: props.comment.post_id },
    });
  } else {
    await loadReplies();
    commentLoaded.value = true;
  }
};

const commentAdded = ref(false);

const formattedComment = computed(() => {
  const mentionRegex = new RegExp(`@(${props.parentUser?.name})`, "g");
  const formattedText = formatTextWithMentions(
    props.comment.content,
    mentionRegex,
  );
  return formattedText;
});

const filteredReplies = computed(() => {
  // On other routes, filter replies based on their level and the nested limit
  return props.comment.replies?.filter(
    (reply) => reply.level <= commentStore.repliesLimit[route.fullPath],
  );
});
</script>
<template>
  <div
    class="comment-wrapper relative flex h-full flex-col gap-3 bg-none dark:bg-inherit"
  >
    <Panel
      toggleable
      :id="comment.id"
      class="comment-parent relative rounded-lg border-b-0 border-l-0 border-r-0 border-t-0 dark:bg-[#2d2a2a]"
    >
      <a
        :href="`#${comment.id}`"
        :class="getColorByLevel(comment.level)"
        class="line-down"
      ></a>

      <template #toggleicon="{ collapsed }">
        <div class="">
          <span
            :class="collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up'"
          ></span>
        </div>
      </template>

      <template #header>
        <div class="prose flex items-center gap-1 p-2 dark:prose-invert">
          <Avatar
            :label="comment?.user.name.charAt(0)"
            class="border bg-inherit"
            shape="circle"
            size="small"
          />
          <div class="prose flex flex-col leading-none dark:prose-invert">
            <span class="font-semibold"
              >@{{ comment?.user.name ? comment.user.name : "username" }}</span
            >
            <span class="text-sm">{{
              dayjs(comment.created_at).fromNow()
            }}</span>
          </div>
        </div>
      </template>
      <!-- <div
        v-if="parentUser"
        class="prose prose-purple p-2 font-bold dark:prose-invert"
      >
        <Chip
          class="prose p-0 px-2 text-sm dark:prose-invert dark:bg-surface-0"
          :label="`@${parentUser.name}`"
          icon="pi pi-reply"
        />
      </div> -->
      <div class="grid grid-cols-[35px,auto]">
        <div class="relative col-start-1">
          <div
            v-if="comment.level !== 0"
            :class="getColorByLevel(comment.level)"
            class="line-bend"
            :href="`#${comment.id}`"
          ></div>
        </div>
        <div class="col-start-2 flex flex-col gap-2">
          <div
            class="prose flex w-full max-w-none items-center dark:prose-invert"
          >
            <span
              v-html="formattedComment"
              class="break-all px-2 leading-tight"
            ></span>
          </div>

          <div class="flex h-6 items-center gap-2 px-2 pb-2">
            <CommentActionBar
              @reply-clicked="showReplyEditor = !showReplyEditor"
              :comment="comment"
            />
          </div>
          <div
            v-if="showViewMoreReplies"
            :class="getColorByLevel(comment.level)"
            class="replies-line-connect prose relative flex max-w-none items-center gap-2 pl-2 text-sm dark:prose-invert"
          >
            <span
              v-if="!commentsLoading"
              @click="handleLoadingMore"
              class="cursor-pointer hover:text-purple-300"
              >{{
                commentAdded
                  ? "View other replies"
                  : `View ${comment.replies_count} replies`
              }}</span
            >
            <Spinner v-if="commentsLoading" color="gray" />
          </div>
        </div>
        <div v-if="showReplyEditor" class="col-start-2 p-3">
          <CommentEditor
            @success="commentAdded = true"
            :post-id="comment.post_id"
            :parent-comment="comment"
          />
        </div>
      </div>

      <div class="ml-6 flex flex-col">
        <div v-for="reply in filteredReplies">
          <Comment
            class="nested-comment"
            :key="reply.id"
            :parent-user="comment.user"
            :comment="reply"
          />
        </div>
      </div>
    </Panel>
  </div>
</template>
<style scoped>
.line-down {
  @apply absolute top-8 h-[calc(100%-48px)] w-4;
  @apply z-10 before:absolute before:left-6 before:top-[16px] before:h-full before:border-l before:content-[''];
  @apply before:pointer-events-none; /* Add this line */

  /* @apply after:absolute after:left-4 after:top-16 after:h-full after:w-4 after:rounded-b-md after:border-b after:border-l; */
}
.line-bend {
  @apply absolute -left-4 -top-12 h-full;
  @apply before:absolute before:left-3 before:top-3 before:w-3 before:border-b;
  @apply before:pointer-events-none; /* Add this line */
}
.replies-line-connect {
  @apply before:absolute before:-left-[10px] before:w-4 before:border-b before:content-[''];
  @apply before:pointer-events-none; /* Add this line */
}
</style>
