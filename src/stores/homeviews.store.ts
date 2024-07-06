import { HomeViews, HomeViewsEnum } from "@/types/Views/homeviews.type";
import PostsView from "@/views/Home/PostsView.vue";
import { defineStore } from "pinia";
import { shallowRef, type DefineComponent } from "vue";

const useHomeViews = defineStore("homeviews", () => {
  const currentView = shallowRef<DefineComponent>(PostsView as DefineComponent);

  function setView(view: HomeViewsEnum) {
    currentView.value = HomeViews[view];
  }
  return { currentView, setView };
});
export default useHomeViews;
