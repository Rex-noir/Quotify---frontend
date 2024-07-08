<script setup lang="ts">
import { PostStyles, type Post } from "@/types/Post/post.types";
import Panel from "primevue/panel";
import { ref } from "vue";
import usePostStore from "@/stores/posts.store";
import Skeleton from "primevue/skeleton";
import PostActionBarSkeleton from "./PostActionBarSkeleton.vue";

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
            <div class="mb-1 flex h-full items-center gap-1">
              <Skeleton class="mb-2 rounded-full p-4" width="30px"></Skeleton>
              <div class="flex flex-col gap-1">
                <Skeleton width="10rem"></Skeleton>
                <span class="prose prose-sm dark:prose-invert">
                  <Skeleton width="100px"></Skeleton>
                </span>
              </div>
            </div>
          </div>
        </template>

        <template #footer>
          <PostActionBarSkeleton></PostActionBarSkeleton>
        </template>

        <div class="mt-1 flex flex-col gap-5">
          <Skeleton width="14rem"></Skeleton>

          <div class="mt-2 flex flex-col gap-6 text-center leading-normal">
            <div
              class="flex flex-col items-center justify-center gap-1 self-center"
            >
              <Skeleton width="15rem"> </Skeleton>
              <Skeleton width="10rem"> </Skeleton>
              <Skeleton width="13rem"> </Skeleton>
            </div>
            <Skeleton class="mr-3 self-end" width="5rem"></Skeleton>
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
