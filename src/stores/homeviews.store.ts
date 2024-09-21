import { HomeViews, HomeViewsEnum } from "@/types/Views/homeviews.type";
import PostListView from "@/views/Home/PostListView.vue";
import { defineStore } from "pinia";
import { shallowRef, type DefineComponent } from "vue";

const useHomeViews = defineStore("homeviews", () => {
  const currentView = shallowRef<DefineComponent>(PostListView as DefineComponent);

  function setView(view: HomeViewsEnum) {
    currentView.value = HomeViews[view];
  }
  return { currentView, setView };
});
export default useHomeViews;
