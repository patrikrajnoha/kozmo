<template>
  <div :class="themeClass">
    <section class="section-slider">
      <Slider :slides="slides" />
    </section>

    <section class="section-latest-articles">
      <v-container>
        <LatestArticles :articles="latestArticles" />
      </v-container>
    </section>

    <section class="section-solar-system">
      <v-container>
        <h2>Astronomický kalendár a počasie</h2>
        <v-row justify="center" align="center" dense>
          <v-col cols="12" md="4">
            <LunarCalendar />
          </v-col>
          <v-col cols="12" md="4">
            <WeatherWidget />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="section-planet-weather">
      <v-container>
        <h2>Počasie na iných planétach a hviezdach</h2>
        <PlanetWeather :isDarkTheme="isDarkTheme" />
      </v-container>
    </section>

    <section class="section-image-of-the-month">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8">
            <ImageOfTheMonth 
              :image="imageOfTheMonth" 
              :description="imageDescription" 
              :isDarkTheme="isDarkTheme" 
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="section-carousel-cards">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8">
            <CarouselCards :isLightTheme="!isDarkTheme" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="section-gallery">
      <v-container>
        <Gallery :images="galleryImages" :isDarkTheme="isDarkTheme" />
      </v-container>
    </section>
  </div>
</template>

<script>
import Slider from "@/components/Slider.vue";
import LatestArticles from "@/components/LatestArticles.vue";
import ImageOfTheMonth from "@/components/ImageOfTheMonth.vue";
import Gallery from "@/components/Gallery.vue";
import CarouselCards from "@/components/CarouselCards.vue";
import LunarCalendar from "@/components/LunarCalendar.vue";
import WeatherWidget from "@/components/WeatherWidget.vue";
import PlanetWeather from "@/components/PlanetWeather.vue";
import slides from "@/assets/slides.json";
import { useArticleStore } from "@/stores/articleStore";

export default {
  components: {
    WeatherWidget,
    Slider,
    LatestArticles,
    ImageOfTheMonth,
    Gallery,
    CarouselCards,
    LunarCalendar,
    PlanetWeather,
  },
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const articleStore = useArticleStore();

    const latestArticles = articleStore.articles.slice(-3).reverse();
    const imageOfTheMonth = "/img/ImageOfTheMonth/january.jpg";
    const imageDescription =
      "Najsilnejšia geomagnetická búrka za viac ako dve desaťročia ponúkla úchvatnú polárnu žiaru, ktorá bola viditeľná aj na miestach, kde je to zriedkavé.";
    const galleryImages = Array.from({ length: 24 }, (_, i) => `/img/gallery/image${i + 1}.jpg`);

    return {
      slides,
      latestArticles,
      imageOfTheMonth,
      imageDescription,
      galleryImages,
    };
  },
  computed: {
    themeClass() {
      return this.isDarkTheme ? "dark-theme" : "light-theme";
    },
  },
};
</script>

<style scoped>
.dark-theme {
  --text-color: #ffffff;
  --background-color: #343a40;
}

.light-theme {
  --text-color: #000000;
  --background-color: #f8f9fa;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
