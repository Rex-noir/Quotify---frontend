<script setup lang="ts">
import { type Post } from "@/types/Post/post.types";
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import PostActions from "./PostActionsBar.vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import useHomeViews from "@/stores/homeviews.store";
import { HomeViewsEnum } from "@/types/Views/homeviews.type";
import Button from "primevue/button";
import usePostStore from "@/stores/posts.store";

const router = useRouter();
const postStore = usePostStore();

const props = defineProps<{ post: Post }>();
const homeView = useHomeViews();

const handleBackClick = () => {
  homeView.setView(HomeViewsEnum.POSTS);
  router.go(-1);
};

const viewPost = () => {
  postStore.viewPost(props.post.id);
  // if (responsive.layout !== "desktop") {
  //   postStore.viewPost(props.post.id);
  // } else if (route.name !== "viewQuote") {
  //   postStore.toggleModal(true);
  // }
};

const headerClickFilter = (e: Event) => {
  const headerDiv = document.querySelector(`div#header-${props.post.id}`);
  if (e.target === headerDiv) {
    viewPost();
  }
};
</script>
<template>
  <div>
    <div class="w-full">
      <Panel
        toggleable
        class="mb-1 cursor-pointer divide-purple-400 rounded-lg border-none bg-surface-100 shadow-md transition-all dark:bg-[#2d2a2a]"
      >
        <template #toggleicon="{ collapsed }">
          <div class="">
            <span
              :class="collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up'"
            ></span>
          </div>
        </template>
        <template #header>
          <div v-if="$route.name !== 'home'">
            <Button
              icon="pi pi-arrow-left"
              @click="handleBackClick"
              class="prose border-none bg-inherit dark:prose-invert"
            />
          </div>
          <div
            @click="headerClickFilter"
            v-ripple
            :id="`header-${post.id}`"
            class="prose flex h-full w-full max-w-none items-center gap-2 p-2 dark:prose-invert"
          >
            <Avatar
              :label="post.user.name.charAt(0)"
              ass="mr-2"
              shape="circle"
              size="small"
            />
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
        </template>

        <template #footer>
          <PostActions :key="post.id" :post="post"></PostActions>
        </template>

        <div
          v-ripple
          @click="viewPost"
          class="prose flex max-w-none flex-col gap-5 p-2 dark:prose-invert"
        >
          <span class="text-xl font-semibold leading-tight">
            {{ post?.title ? post?.title : "Title" }}
          </span>

          <div
            @click="viewPost"
            class="prose mt-2 grid max-w-none grid-rows-[5fr,1fr] place-items-center gap-6 text-center text-xl leading-normal dark:prose-invert md:grid-rows-[7fr,1fr]"
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
  @apply border-none;
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
