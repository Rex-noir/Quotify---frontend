import NestedComments from "@/Layouts/NestedComments.vue";
import PostListView from "@/views/Home/PostListView.vue";
import QuoteView from "@/views/Quote/QuoteView.vue";
import type { DefineComponent } from "vue";

export enum HomeViewsEnum {
  POSTS,
  QUOTE,
  NESTED_COMMENTS,
}

export const HomeViews: { [key in HomeViewsEnum]: DefineComponent } = {
  [HomeViewsEnum.POSTS]: PostListView as DefineComponent,
  [HomeViewsEnum.QUOTE]: QuoteView as DefineComponent,
  [HomeViewsEnum.NESTED_COMMENTS]: NestedComments as DefineComponent,
};
