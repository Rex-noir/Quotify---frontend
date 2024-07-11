import PostListView from "@/views/Home/PostListView.vue";
import type { DefineComponent } from "vue";

export enum HomeViewsEnum {
  POSTS,
}

export const HomeViews: { [key in HomeViewsEnum]: DefineComponent } = {
  [HomeViewsEnum.POSTS]: PostListView as DefineComponent,
};
