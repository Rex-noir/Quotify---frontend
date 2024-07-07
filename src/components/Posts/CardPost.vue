<script setup lang="ts">
import { PostStyles, type Post } from "@/types/Post/post.types";
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import PostActions from "./PostActionsBar.vue";
import { ref } from "vue";
import usePostStore from "@/stores/posts.store";
import dayjs from "dayjs";

defineProps<{ post: Post }>();
const postStore = usePostStore();
let collapsed = ref(false);
</script>
<template>
  <div>
    <div class="w-full p-2">
      <Panel
        toggleable
        :class="[
          { 'rounded-xl': postStore.post_style === PostStyles.CARD_ROUND },
        ]"
        class="border-b border-t bg-surface-100 p-2 shadow-lg dark:border-surface-800 dark:bg-inherit"
      >
        <template #toggleicon>
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
        </template>
        <template #header>
          <div>
            <div class="mb-1 flex h-full items-center">
              <Avatar label="U" class="mr-2" shape="circle" size="small" />
              <div class="flex flex-col">
                <span
                  class="prose prose-xl font-semibold leading-none dark:prose-invert"
                  >@{{ post?.user.name ? post.user.name : "username" }}</span
                >
                <span class="prose prose-sm dark:prose-invert">{{
                  post?.created_at
                    ? dayjs(post.created_at).format("DD-MM-YYYY h:mm a")
                    : "1 second ago"
                }}</span>
              </div>
            </div>
          </div>
        </template>

        <template #footer>
          <PostActions :post="post"></PostActions>
        </template>

        <div class="mt-1 flex flex-col gap-5">
          <span class="text-xl font-semibold leading-tight">
            {{ post?.title ? post?.title : "Title" }}
          </span>

          <div class="mt-2 flex flex-col gap-6 text-center leading-normal">
            <span class="font-medium">
              "{{ post?.quote ? post.quote : "This is the quote" }}"
            </span>
            <span class="mr-3 self-end">
              - {{ post?.author ? post.author : "Anonymous" }}</span
            >
          </div>
        </div>
      </Panel>
    </div>
  </div>
</template>

<style>
.p-panel-header {
  padding: 5px;
  @apply border-b;
}
.p-panel-content {
  padding: 5px;
}
.p-panel {
  padding: 0px;
}
.p-panel-footer {
  padding: 0px;
}
</style>
