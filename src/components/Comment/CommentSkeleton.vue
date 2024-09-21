<script setup lang="ts">
import Skeleton from "primevue/skeleton";
import Panel from "primevue/panel";
import CommentActionBarSkeleton from "./CommentActionBarSkeleton.vue";
import { computed } from "vue";
import useResponsive from "@/stores/responsive.store";

const getRandomWidth = (min: number, max: number) => {
  return `${Math.floor(Math.random() * (max - min + 1)) + min}rem`;
};

const responsive = useResponsive();

const skeletonWidths = computed(() => {
  if (responsive.layout === "mobile") {
    return getRandomWidth(5, 13);
  }
  return getRandomWidth(5, 30);
});
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
        <div class="flex items-center p-2">
          <Skeleton shape="circle" size="2rem" class="mr-1"></Skeleton>
          <div class="flex flex-col gap-1">
            <Skeleton width="10rem"></Skeleton>
            <Skeleton width="5rem"></Skeleton>
          </div>
        </div>
      </template>

      <div
        class="prose ml-8 flex max-w-none flex-col gap-2 px-3 leading-tight dark:prose-invert"
      >
        <Skeleton height="25px" :width="skeletonWidths"></Skeleton>
        <CommentActionBarSkeleton class="py-1" />
      </div>
    </Panel>
  </div>
</template>
