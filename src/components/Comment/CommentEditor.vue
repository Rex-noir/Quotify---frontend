<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Spinner from "../Spinner.vue";
import useUserStore from "@/stores/user.store";
import PostUtils from "@/utils/post.utils";
import { useToast } from "primevue/usetoast";
import type { Mention, PostComment } from "@/types/Post/post.types";
import useCommentStore from "@/stores/comments.store";
import { debounce, formatTextWithMentions } from "@/utils/utils";
import { cursorUtils } from "@/utils/cursor.utils";
import UserUtils from "@/utils/user.utils";
import type { User } from "@/types/User/user.types";
import Profile from "../Menu/Items/Profile.vue";

const props = defineProps<{ postId: number; parentComment?: PostComment }>();
const emits = defineEmits<{ success: [] }>();

const commentBody = ref<string>(``);
const loading = ref(false);
const userStore = useUserStore();
const commentStore = useCommentStore();

const editableDiv = ref<HTMLElement | null>(null);
const showSuggestion = ref<boolean>();
const suggestionBox = ref<HTMLElement | null>(null);

const toast = useToast();
const users = ref<User[]>([]);

let mentions: Mention[] = [];

const comment = async () => {
  if (commentBody.value.trim() === "") {
    return;
  }
  if (userStore.status) {
    loading.value = true;
    try {
      const response = await PostUtils.postComment({
        content: commentBody.value as string,
        post_id: props.postId,
        parent_id: props.parentComment?.id,
        mentions: mentions,
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
const updateMentions = (text: string) => {
  mentions = mentions.filter((mention) => {
    const mentionRegex = new RegExp(`@${mention.username}\\b`);
    return mentionRegex.test(text);
  });
};

const handleCommentsKey = (event: KeyboardEvent) => {};

const onInput = async (e: Event) => {
  users.value = [];
  const event = e as InputEvent;
  const target = event.target as HTMLDivElement;

  const text = target.innerText;
  const html = target.innerHTML;

  updateMentions(html);

  const lastAtIndex = text.lastIndexOf("@");
  if (lastAtIndex !== -1) {
    // Check for spaces between '@' and the cursor
    const potentialMention = text.slice(lastAtIndex + 1);
    const isTypingMention = /^[^\s]+$/.test(potentialMention); // Ensure no space in potential mention

    if (isTypingMention) {
      const query = potentialMention.toLowerCase();
      debouncedSearch(query);
    } else {
      showSuggestion.value = false;
    }
  } else {
    showSuggestion.value = false;
  }

  commentBody.value = text;
};

const handleClickMentions = (user: User) => {
  const div = editableDiv.value;
  if (!div) return;

  const mentionText = `@${user.username}`;
  if (!mentions.some((mention) => mention.username === user.username)) {
    mentions.push({ username: user.username, user_id: user.id });
  }

  const content = div.innerText;
  const cursorPosition = cursorUtils().getCaretPosition(div);

  const textUpToCursor = content.substring(0, cursorPosition);
  const match = textUpToCursor.match(/@([\w.]+)$/);

  if (match) {
    const mentionStartIndex = textUpToCursor.lastIndexOf(match[0]);

    const newContent =
      content.substring(0, mentionStartIndex) +
      mentionText +
      content.substring(cursorPosition);

    div.innerHTML = formatTextWithMentions(newContent, mentions);

    showSuggestion.value = false;
    commentBody.value = newContent;

    div.focus();

    cursorUtils().setEndOfContenteditable(div);
  }
};

const debouncedSearch = debounce(async (query: string) => {
  const data = (await UserUtils.searchUsers(query, 5)) as User[];
  if (data.length > 0) {
    users.value = data;
    showSuggestion.value = true;
    positionSuggestionBox();
  } else {
    showSuggestion.value = false;
  }
}, 200);
const handleClickOutside = (event: MouseEvent) => {
  if (
    suggestionBox.value &&
    !suggestionBox.value.contains(event.target as Node) &&
    editableDiv.value &&
    !editableDiv.value.contains(event.target as Node)
  ) {
    showSuggestion.value = false;
  }
};

function positionSuggestionBox() {
  const selection = window.getSelection();
  if (suggestionBox.value && selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const stickyContainer = document.querySelector("div.comment-box-container");

    if (suggestionBox.value.style.display !== "none") {
      return;
    }

    if (stickyContainer) {
      const stickyContainerRect = stickyContainer.getBoundingClientRect();
      let leftOffset = rect.left - stickyContainerRect.left;

      // Get the width of the suggestion box
      const suggestionBoxWidth = suggestionBox.value.offsetWidth;

      // Check if the suggestion box would overflow on the right
      const rightEdge = leftOffset + suggestionBoxWidth;
      const containerWidth = stickyContainer.clientWidth;

      if (rightEdge > containerWidth) {
        // If it would overflow, adjust the left offset
        leftOffset = Math.max(0, containerWidth - suggestionBoxWidth);
      }

      // Apply the position
      suggestionBox.value.style.left = `${leftOffset + window.scrollX}px`;

      // Ensure the suggestion box doesn't go off the left edge
      if (leftOffset < 0) {
        suggestionBox.value.style.left = `${window.scrollX}px`;
      }
    }
  }
}

const initializeContent = () => {
  if (props.parentComment && props.parentComment.user) {
    // Correctly set the comment body
    commentBody.value = `@${props.parentComment.user.username} `;

    // Update mentions with correct data
    mentions = [
      {
        username: props.parentComment.user.username, // Ensure you use `username` as you are formatting based on it
        user_id: props.parentComment.user_id,
      },
    ];

    // Apply formatting to the contenteditable div
    if (editableDiv.value) {
      editableDiv.value.innerHTML = formatTextWithMentions(
        commentBody.value,
        mentions,
      );
      cursorUtils().setEndOfContenteditable(editableDiv.value);
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  initializeContent();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <div
    class="prose relative flex h-full max-w-none flex-col gap-2 dark:prose-invert"
  >
    <div class="relative flex w-full flex-grow items-center gap-1 shadow-md">
      <div
        v-focus
        ref="editableDiv"
        class="contenteditable-area prose w-full max-w-none cursor-text break-words bg-slate-100 px-2 py-3 pr-10 dark:prose-invert hover:ring-0 dark:bg-[#4d4d4d]"
        autofocus
        contenteditable="true"
        role="textbox"
        @keydown="handleCommentsKey"
        @input="onInput"
      ></div>

      <span
        v-if="!loading"
        @click="comment"
        class="pi pi-send absolute right-2 h-fit cursor-pointer rounded-full border-none p-2 text-xl hover:text-slate-500 active:text-slate-900 dark:hover:text-blue-500 dark:active:text-green-300"
      ></span>
      <Spinner v-else class="absolute right-4" color="teal"></Spinner>
    </div>
    <div
      ref="suggestionBox"
      v-show="showSuggestion"
      class="absolute bottom-14 z-50 w-56 rounded-md bg-[#b3adb6] dark:bg-[#3c3c3c]"
    >
      <ul class="m-0 w-full list-none p-0">
        <li
          class="m-0 p-0"
          @click="handleClickMentions(user)"
          v-for="user in users"
        >
          <Profile
            class="grid cursor-pointer grid-cols-[40px,1fr] place-items-start items-center p-2 px-2 hover:bg-slate-200 dark:hover:bg-[#b1a1a144]"
            :user="user"
          />
        </li>
      </ul>
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
</style>
