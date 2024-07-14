<script setup lang="ts">
import Skeleton from "primevue/skeleton";
import Panel from "primevue/panel";
import CommentActionsBarSkeleton from "./CommentActionBarSkeleton.vue";
</script>
<template>
  <div>
    <Panel
      toggleable
      class="comment-parent rounded-none border-b-0 border-l-0 border-r-0 border-t-0 dark:bg-[#2d2a2a]"
    >
      <template #toggleicon>
        <div class="">
          <span class="pi pi-chevron-down"></span>
        </div>
      </template>

      <template #header>
        <div class="mb-4 flex items-center">
          <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
          <div class="flex flex-col gap-2">
            <Skeleton width="10rem"></Skeleton>
            <Skeleton width="5rem"></Skeleton>
          </div>
        </div>
      </template>

      <div
        class="prose flex max-w-none flex-col gap-2 p-2 py-2 leading-tight dark:prose-invert"
      >
        <Skeleton class="w-full"></Skeleton>
        <Skeleton class="w-full"></Skeleton>
      </div>
      <CommentActionsBarSkeleton />
    </Panel>
  </div>
</template>
