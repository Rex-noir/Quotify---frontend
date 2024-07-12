<script setup lang="ts">
import HeaderSmall from "@/components/Headers/HeaderSmall.vue";
import HeaderLarge from "@/components/Headers/HeaderLarge.vue";
import useHomeViews from "@/stores/homeviews.store";
import CommunitiesView from "@/views/Home/CommunitiesView.vue";
import SideLoggedIn from "@/components/SideBar/SideLoggedIn.vue";
import SideNotLoggedIn from "@/components/SideBar/SideNotLoggedIn.vue";
import useUserStore from "@/stores/user.store";

const userStore = useUserStore();
</script>
<template>
  <div class="relative h-full">
    <HeaderSmall
      class="fixed z-50 w-full bg-surface-100 dark:bg-surface-0 lg:hidden"
    />
    <HeaderLarge
      class="fixed z-50 hidden w-full bg-surface-100 dark:bg-surface-0 lg:grid"
    />
    <div
      class="relative top-[6rem] grid h-full md:top-[3.4rem] md:grid-cols-3 lg:top-11 lg:grid-cols-[250px,1fr,1fr,1fr]"
    >
      <div
        class="hidden h-screen lg:fixed lg:col-start-1 lg:block lg:w-80 lg:max-w-[250px]"
      >
        <component v-if="userStore.status" :is="SideLoggedIn" />
        <component v-else :is="SideNotLoggedIn" />
      </div>
      <component
        class="border-l border-r dark:border-surface-700 md:col-span-2 lg:col-span-2 lg:col-start-2"
        :is="useHomeViews().currentView"
      />
      <component
        class="hidden bg-surface-100 md:fixed md:col-start-3 md:block lg:col-start-4"
        :is="CommunitiesView"
      />
    </div>
  </div>
</template>
