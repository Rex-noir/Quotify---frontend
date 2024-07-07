<script setup lang="ts">
import HeaderSmall from "@/components/Headers/HeaderSmall.vue";
import HeaderLarge from "@/components/Headers/HeaderLarge.vue";
import useHomeViews from "@/stores/homeviews.store";
import CommunitiesView from "@/views/Home/CommunitiesView.vue";
import SideLoggedIn from "@/components/SideBar/SideLoggedIn.vue";
import SideNotLoggedIn from "@/components/SideBar/SideNotLoggedIn.vue";

const currentView = useHomeViews().currentView;
</script>
<template>
  <div class="relative h-full">
    <HeaderSmall class="fixed z-50 w-full bg-surface-100 lg:hidden" />
    <HeaderLarge class="fixed z-50 hidden w-full bg-surface-100 lg:grid" />
    <div
      class="relative top-[6.5rem] grid h-full md:grid-cols-3 lg:top-14 lg:grid-cols-4"
    >
      <component
        class="hidden lg:fixed lg:col-span-1 lg:col-start-1 lg:block"
        :is="SideNotLoggedIn"
      />
      <component
        class="md:col-span-2 lg:col-span-2 lg:col-start-2"
        :is="currentView"
      />
      <component
        class="hidden md:fixed md:col-start-3 md:block lg:col-start-4"
        :is="CommunitiesView"
      />
    </div>
  </div>
</template>
