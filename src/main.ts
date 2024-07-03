import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import QuotifyThemePreset from './primevue.preset'
import Ripple from 'primevue/ripple'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('ripple', Ripple)
app.use(PrimeVue, {
  theme: {
    preset: QuotifyThemePreset,
    ripple: true,
    options: {
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
})
app.mount('#app')
