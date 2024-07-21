<script setup lang="ts">
import { ref } from "vue";
import Spinner from "../Spinner.vue";
import useUserStore from "@/stores/user.store";
import PostUtils from "@/utils/post.utils";
import { useToast } from "primevue/usetoast";
import type { PostComment } from "@/types/Post/post.types";
import useCommentStore from "@/stores/comments.store";
import { formatTextWithMentions } from "@/utils/utils";
import CursorUtils from "@/utils/cursor.utils";

const props = defineProps<{ postId: number; parentComment?: PostComment }>();
const emits = defineEmits<{ success: [] }>();

const commentBody = ref<string>(``);
const loading = ref(false);
const userStore = useUserStore();
const commentStore = useCommentStore();

const editableDiv = ref<HTMLElement | null>(null);

const toast = useToast();

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
      if (response.status === 200) {
        commentStore.addComment(response.data.comment, props.postId);
        emits("success");

        if (editableDiv.value) {
          editableDiv.value.innerHTML = "";
        }
      }
      loading.value = false;
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

const handleCommentsKey = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    if (event.shiftKey) {
      // Insert a line break when Shift + Enter is pressed
      event.preventDefault(); // Prevent default behavior
    } else {
      // Optional: Handle the Enter key behavior if needed
      event.preventDefault(); // Prevent default behavior if you want to control it
    }
  }
};

const onInput = (e: Event) => {
  const event = e as InputEvent;
  const target = event.target as HTMLDivElement;

  const text = target.innerText;
  const mentionRegex = new RegExp(`@(${props.parentComment?.user.name})`, "g");

  const cursorUtils = new CursorUtils(target);
  // Save the current cursor position
  const cursorPosition = cursorUtils.saveCursorPosition();

  // Update content and format mentions
  const formattedText = formatTextWithMentions(text, mentionRegex);
  target.innerHTML = formattedText;
  // Restore the cursor position
  commentBody.value = target.innerText;
  cursorUtils.restoreCursorPosition(cursorPosition);
};
</script>
<template>
  <div class="prose flex h-full max-w-none flex-col gap-2 dark:prose-invert">
    <div class="relative flex w-full flex-grow items-center gap-1 shadow-md">
      <div
        v-focus
        ref="editableDiv"
        class="contenteditable-area prose w-full max-w-none cursor-text break-words bg-slate-100 px-2 py-3 pr-10 dark:prose-invert hover:ring-0 dark:bg-[#4d4d4d]"
        autofocus
        contenteditable="true"
        role="textbox"
        @keydown="handleCommentsKey"
        placeholder="Write your own comment"
        @input="onInput"
      ></div>

      <span
        v-if="!loading"
        @click="comment"
        class="pi pi-send absolute right-2 h-fit cursor-pointer rounded-full border-none p-2 text-xl hover:text-slate-500 active:text-slate-900 dark:hover:text-blue-500 dark:active:text-green-300"
      ></span>
      <Spinner v-else class="absolute right-4" color="teal"></Spinner>
    </div>
  </div>
</template>
<style scoped>
.contenteditable-area {
  border: 0px solid #d1d5db;
  /* Light gray border */
  outline: none;
  /* Remove default outline */
  background-color: #f9fafb;
  /* Light background color */
  color: #374151;
  /* Text color */
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
  /* Smooth transition for border color and shadow */
  @apply prose max-w-none break-all rounded-md dark:prose-invert dark:bg-[#4d4d4d];
}

/* Placeholder style */
.contenteditable-area:empty:before {
  content: attr(placeholder);
  color: #9ca3af;
  /* Placeholder color */
}
.mention {
  font-weight: bold;
  color: red;
}
</style>
