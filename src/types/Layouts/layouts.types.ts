import HomeLayout from "@/Layouts/HomeLayout.vue";
import AuthLayout from "@/Layouts/AuthLayout.vue";
import type { DefineComponent } from "vue";

export enum LayoutNames {
  HOME = "HOME",
  AUTH = "AUTH",
}
export const layouts: { [key in LayoutNames]: DefineComponent } = {
  [LayoutNames.HOME]: HomeLayout as DefineComponent,
  [LayoutNames.AUTH]: AuthLayout as DefineComponent,
};
