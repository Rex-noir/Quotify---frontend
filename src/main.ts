import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import router from "./router";
import QuotifyThemePreset from "./config/primevue.preset";
import Ripple from "primevue/ripple";
import boot from "./config/boot.config";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.directive("ripple", Ripple);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: QuotifyThemePreset,
    options: {
      darkModeSelector: ".dark",
      cssLayer: {
        name: "primevue",
        order: "tailwind-base, primevue, tailwind-utilities",
      },
    },
  },
});
app.use(ToastService);
app.mount("#app");
boot();
