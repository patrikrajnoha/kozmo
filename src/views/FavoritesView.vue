<template> 
  <v-container>
    <h1 class="text-center">Obľúbené udalosti</h1>
    <v-row>
      <v-col
        v-for="event in favoriteEvents"
        :key="event.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card @click="$router.push(`/events/${event.id}`)" class="favorite-card rounded shadow">
          <v-img :src="event.image" height="200" cover class="card-image"></v-img>
          <v-card-title class="card-title text-truncate">{{ event.name }}</v-card-title>
          <v-card-subtitle class="card-subtitle">{{ event.date }} - {{ event.location }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import events from "@/assets/events.json";

export default {
  name: "FavoritesView",
    props: {
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      favoriteEvents: [],
    };
  },
  mounted() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    this.favoriteEvents = events.filter((event) => favorites.includes(event.id));
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
}

.favorite-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid #dee2e6;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.favorite-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  background-color: #f8f9fa;
}

.card-image {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 10px;
  padding: 0 15px;
  color: #343a40;
}

.card-subtitle {
  font-size: 1rem;
  color: #6c757d;
  padding: 0 15px 10px;
}

.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded {
  border-radius: 1rem;
}
</style>
