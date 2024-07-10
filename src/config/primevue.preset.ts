import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

const QuotifyThemePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{neutral.50}",
      100: "{neutral.100}",
      200: "{neutral.200}",
      300: "{neutral.300}",
      400: "{neutral.400}",
      500: "{neutral.500}",
      600: "{neutral.600}",
      700: "{neutral.700}",
      800: "{neutral.800}",
      900: "{neutral.900}",
      950: "{neutral.950}",
    },
    colorScheme: {
      light: {
        primary: {
          color: "{neutral.950}",
          inverseColor: "#ffffff",
          hoverColor: "{neutral.900}",
          activeColor: "{neutral.800}",
        },
        highlight: {
          background: "{neutral.950}",
          focusBackground: "{neutral.700}",
          color: "#ffffff",
          focusColor: "#ffffff",
        },
        surface: {
          0: "#ffffff",
          50: "{neutral.50}",
          100: "{neutral.100}",
          200: "{neutral.200}",
          300: "{neutral.300}",
          400: "{neutral.400}",
          500: "{neutral.500}",
          600: "{neutral.600}",
          700: "{neutral.700}",
          800: "{neutral.800}",
          900: "{neutral.900}",
          950: "{neutral.950}",
        },
      },
      dark: {
        primary: {
          color: "{neutral.50}",
          inverseColor: "{neutral.950}",
          hoverColor: "{neutral.100}",
          activeColor: "{neutral.200}",
        },
        highlight: {
          background: "rgba(250, 250, 250, .16)",
          focusBackground: "rgba(250, 250, 250, .24)",
          color: "rgba(255,255,255,.87)",
          focusColor: "rgba(255,255,255,.87)",
        },
        surface: {
          0: "#212121",
          50: "{slate.50}",
          100: "{slate.100}",
          200: "{slate.200}",
          300: "{slate.300}",
          400: "{slate.400}",
          500: "{slate.500}",
          600: "{slate.600}",
          700: "{slate.700}",
          800: "{slate.800}",
          900: "{slate.900}",
          950: "{slate.950}",
        },
      },
    },
  },
});

export default QuotifyThemePreset;
