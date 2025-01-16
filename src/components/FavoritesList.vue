<template>
  <v-container>
    <h1 class="text-center">Obľúbené udalosti</h1>

    <v-row>
      <v-col v-for="event in favorites" :key="event.id" cols="12" sm="6" md="4">
        <v-card @click="$router.push(`/events/${event.id}`)">
          <v-img :src="event.image" height="200" cover></v-img>
          <v-card-title>{{ event.name }}</v-card-title>
          <v-card-subtitle>{{ event.date }}</v-card-subtitle>
          <v-card-text>{{ event.description.substring(0, 100) }}...</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <p v-if="favorites.length === 0" class="text-center">Nemáte žiadne obľúbené udalosti.</p>
  </v-container>
</template>

<script>
import { useFavoriteStore } from "@/stores/favoriteStore";

export default {
  name: "FavoritesList",
  setup() {
    const favoriteStore = useFavoriteStore();
    return { favorites: favoriteStore.favorites };
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
  margin-bottom: 20px;
}

.v-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

.v-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.2);
}
</style>
