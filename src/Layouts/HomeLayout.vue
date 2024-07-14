<script setup lang="ts">
import HeaderSmall from "@/components/Headers/HeaderSmall.vue";
import HeaderLarge from "@/components/Headers/HeaderLarge.vue";
import CommunitiesView from "@/views/Home/CommunitiesView.vue";
import SideLoggedIn from "@/components/SideBar/SideLoggedIn.vue";
import SideNotLoggedIn from "@/components/SideBar/SideNotLoggedIn.vue";
import useUserStore from "@/stores/user.store";

const userStore = useUserStore();
</script>
<template>
  <div class="h-ful relative">
    <HeaderSmall
      class="fixed z-50 w-full bg-surface-100 dark:bg-surface-0 lg:hidden"
    />
    <HeaderLarge
      class="fixed z-50 hidden w-full bg-surface-100 dark:bg-surface-0 lg:grid"
    />
    <div
      class="top-[7rem] grid md:top-[3.6rem] relative md:grid-cols-3 lg:top-20 lg:grid-cols-[1fr,1fr,1fr,1fr]"
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
        class="border-l border-r dark:border-surface-700 md:col-span-2 lg:col-span-2 lg:col-start-2"
      >
        <router-view v-slot="{ Component }">
          <keep-alive include="PostListView,QuoteView">
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </router-view>
      </div>
      <component
        class="hidden bg-surface-100 md:fixed md:col-start-3 md:block lg:col-start-4"
        :is="CommunitiesView"
      />
    </div>
  </div>
</template>
