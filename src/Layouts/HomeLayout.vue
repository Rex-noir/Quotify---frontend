<script setup lang="ts">
import HeaderSmall from "@/components/Headers/HeaderSmall.vue";
import HeaderLarge from "@/components/Headers/HeaderLarge.vue";
import CommunitiesView from "@/views/Home/CommunitiesView.vue";
import SideLoggedIn from "@/components/SideBar/SideLoggedIn.vue";
import SideNotLoggedIn from "@/components/SideBar/SideNotLoggedIn.vue";
import useUserStore from "@/stores/user.store";
import usePostStore from "@/stores/posts.store";
import { onMounted, onUnmounted } from "vue";
import useCommentStore from "@/stores/comments.store";

const userStore = useUserStore();
const postStore = usePostStore();
const commentStore = useCommentStore();
onMounted(() => {
  postStore.startListeningForUpdates();
  commentStore.startListeningForComments();
});
onUnmounted(() => {
  postStore.stopListeningForUpdates();
  commentStore.stopListeningForComments();
});
</script>
<template>
  <div class="relative h-full">
    <HeaderSmall
      class="fixed z-50 w-full bg-surface-100 dark:bg-surface-0 lg:hidden"
    />
    <HeaderLarge
      class="fixed z-50 hidden w-full bg-surface-100 dark:bg-surface-0 md:p-3 lg:grid"
    />
    <div
      class="relative top-[7.9rem] grid md:top-[5rem] md:grid-cols-3 lg:top-16 lg:grid-cols-[1fr,1.5fr,1fr]"
    >
      <div class="hidden h-full w-full lg:col-start-1 lg:block">
        <component v-if="userStore.status" :is="SideLoggedIn" />
        <component v-else :is="SideNotLoggedIn" />
      </div>
      <!-- <component
        class="border-l border-r dark:border-surface-700 md:col-span-2 lg:col-span-2 lg:col-start-2"
        :is="useHomeViews().currentView"
      /> -->
      <div
        class="dark:border-surface-700 md:col-span-2 px-2 lg:col-span-1 lg:col-start-2"
      >
        <router-view v-slot="{ Component }">
          <keep-alive include="PostListView,QuoteView">
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </router-view>
      </div>
      <component
        class="md:top-30 z-10 hidden bg-surface-100 md:sticky md:col-start-3 md:block lg:col-start-3"
        :is="CommunitiesView"
      />
    </div>
  </div>
</template>
