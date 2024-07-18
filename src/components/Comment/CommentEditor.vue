<script setup lang="ts">
import Textarea from "primevue/textarea";
import { onActivated, onMounted, ref, watch } from "vue";
import Spinner from "../Spinner.vue";
import useUserStore from "@/stores/user.store";
import PostUtils from "@/utils/post.utils";
import { useToast } from "primevue/usetoast";
import type { PostComment } from "@/types/Post/post.types";
import Chip from "primevue/chip";
import useCommentStore from "@/stores/comments.store";

const props = defineProps<{ postId: number; parentComment?: PostComment }>();

const commentBody = ref<string>("");
const loading = ref(false);
const userStore = useUserStore();
const commentStore = useCommentStore();

const toast = useToast();

watch(
  commentStore.addComment,
  (newCommentStore) => {
    loading.value = false;
  },
  { deep: true },
);

const comment = async () => {
  if (commentBody.value.trim() === "") {
    return;
  }
  if (userStore.status) {
    loading.value = true;
    try {
      const response = await PostUtils.postComment({
        content: commentBody.value as string,
        postId: props.postId,
        parentId: props.parentComment?.id,
      });
      commentBody.value = "";
      if (response.status === 201) {
      }
    } catch (error) {
      loading.value = false;
    }
  } else {
    console.log("Please login!");
    toast.add({
      severity: "info",
      detail: "Please login!",
      life: 1000,
    });
  }
};
</script>
<template>
  <div class="prose flex max-w-none flex-col gap-2 p-1 dark:prose-invert">
    <h4 v-if="!parentComment">Add a comment.</h4>
    <Chip
      v-else
      class="prose w-fit dark:prose-invert dark:bg-surface-0"
      :label="`@${parentComment?.user.name}`"
      icon="pi pi-reply"
    />
    <div
      class="relative flex flex-grow items-center gap-1 bg-white shadow-md dark:bg-[#2d2a2a]"
    >
      <Textarea
        v-focus
        class="prose w-full max-w-none border-none bg-inherit py-3 pr-10 dark:prose-invert"
        v-model="commentBody"
        autoResize
        autofocus
        rows="1"
        placeholder="Type something!"
        cols="30"
      />
      <span
        v-if="!loading"
        @click="comment"
        class="pi pi-send absolute right-2 h-fit cursor-pointer rounded-full border-none p-2 text-xl hover:bg-slate-300 active:bg-slate-200 dark:hover:bg-stone-500 dark:active:bg-stone-800"
      ></span>
      <Spinner v-else color="teal"></Spinner>
    </div>
  </div>
</template>
