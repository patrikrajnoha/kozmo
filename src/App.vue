<template>
  <v-app style="display: flex">
    <Navbar :isDarkTheme="isDarkTheme" @toggle-theme="toggleTheme" />
    <v-main style="flex: 1">
      <RouterView :isDarkTheme="isDarkTheme" />
    </v-main>
    <Footer :isDarkTheme="isDarkTheme" />
    <CookieConsent />
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import CookieConsent from "./components/CookieConsent.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    CookieConsent,
  },
  data() {
    return {
      isDarkTheme: true,
    };
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      this.$vuetify.theme.global.name = this.isDarkTheme ? "dark" : "light";
      localStorage.setItem("theme", this.isDarkTheme ? "dark" : "light");
    },
  },
  created() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.isDarkTheme = savedTheme === "dark";
      this.$vuetify.theme.global.name = savedTheme;
    }
  },
};
</script>
