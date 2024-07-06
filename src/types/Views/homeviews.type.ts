import PostsView from "@/views/Home/PostsView.vue";
import type { DefineComponent } from "vue";

export enum HomeViewsEnum {
  POSTS,
}

export const HomeViews: { [key in HomeViewsEnum]: DefineComponent } = {
  [HomeViewsEnum.POSTS]: PostsView as DefineComponent,
};
