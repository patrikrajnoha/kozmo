import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { useCartStore, useCartPersistence } from "@/stores/cartStore";
import "@/assets/styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "v-calendar/dist/style.css";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        dark: true,
        colors: {
          background: "#131415",
          primary: "#BB86FC",
          navbar: "#191919",
          footer: "#191919",
        },
      },
      light: {
        dark: false,
        colors: {
          background: "#ffffff",
          primary: "#1976D2",
          navbar: "#f5f5f5",
          footer: "#f5f5f5",
        },
      },
    },
  },
});

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(vuetify);
app.use(router);

const cartStore = useCartStore();
cartStore.loadCart();
useCartPersistence(cartStore);

app.mount("#app");
