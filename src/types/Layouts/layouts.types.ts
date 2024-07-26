import HomeLayout from "@/Layouts/HomeLayout.vue";
import AuthLayout from "@/Layouts/AuthLayout.vue";
import SplashLayout from "@/Layouts/SplashLayout.vue";
import PostLayout from "@/Layouts/PostLayout.vue";
import MenuLayout from "@/Layouts/MenuLayout.vue";
import type { DefineComponent } from "vue";

export enum LayoutNames {
  HOME = "HOME",
  AUTH = "AUTH",
  SPLASH = "SPLASH",
  POST = "POST",
  MENU = "Menu",
}
export const layouts: { [key in LayoutNames]: DefineComponent } = {
  [LayoutNames.HOME]: HomeLayout as DefineComponent,
  [LayoutNames.AUTH]: AuthLayout as DefineComponent,
  [LayoutNames.SPLASH]: SplashLayout as DefineComponent,
  [LayoutNames.POST]: PostLayout as DefineComponent,
  [LayoutNames.MENU]: MenuLayout as DefineComponent,
};
