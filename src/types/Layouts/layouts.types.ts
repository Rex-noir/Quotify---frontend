import HomeLayout from "@/Layouts/HomeLayout.vue";
import AuthLayout from "@/Layouts/AuthLayout.vue";
import SplashLayout from "@/Layouts/SplashLayout.vue";
import type { DefineComponent } from "vue";

export enum LayoutNames {
  HOME = "HOME",
  AUTH = "AUTH",
  SPLASH = "SPLASH",
}
export const layouts: { [key in LayoutNames]: DefineComponent } = {
  [LayoutNames.HOME]: HomeLayout as DefineComponent,
  [LayoutNames.AUTH]: AuthLayout as DefineComponent,
  [LayoutNames.SPLASH]: SplashLayout as DefineComponent,
};
