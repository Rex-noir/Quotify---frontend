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
        class="border-none shadow-md dark:bg-[#272626]"
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
            <div
              class="prose mb-1 flex h-full items-center p-2 dark:prose-invert"
            >
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

        <div
          class="mt- prose flex max-w-none flex-col gap-5 p-2 dark:prose-invert"
        >
          <span class="text-xl font-semibold leading-tight">
            {{ post?.title ? post?.title : "Title" }}
          </span>

          <div
            class="place-items-center text-xl prose mt-2 grid grid-rows-[5fr,1fr] max-w-none dark:prose-invert gap-6 text-center leading-normal md:grid-rows-[7fr,1fr]"
          >
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
