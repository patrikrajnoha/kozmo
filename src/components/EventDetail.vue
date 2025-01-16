<template>
  <div v-if="event" class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8">
        <div class="card border-0 shadow-lg rounded-4 event-detail-card">
          <img :src="event.image" class="card-img-top rounded-top-4" alt="Obrázok udalosti" />
          <div class="card-body">
            <h1 class="card-title fs-3 text-primary">{{ event.name }}</h1>
            <p class="card-subtitle mb-3 text-muted small">
              {{ event.date }} - {{ event.location }}
            </p>
            <p class="card-text">{{ event.description }}</p>
            <div class="d-flex justify-content-between align-items-center mt-4">
              <!-- Share button -->
              <div class="d-flex align-items-center">
                <button
                  class="btn btn-outline-primary btn-sm rounded-pill me-2"
                  @click="shareEvent"
                >
                  <i class="mdi mdi-share-variant"></i>
                </button>
                <span class="small">Zdieľať</span>
              </div>

              <!-- Favorite button -->
              <div class="d-flex align-items-center">
                <button
                  class="btn btn-outline-danger btn-sm rounded-pill me-2"
                  @click="toggleFavorite"
                >
                  <i :class="isFavorite ? 'mdi mdi-heart' : 'mdi mdi-heart-outline'"></i>
                </button>
                <span class="small">
                  {{ isFavorite ? 'Odstrániť z obľúbených' : 'Pridať do obľúbených' }}
                </span>
              </div>
            </div>

            <button
              class="btn btn-secondary btn-sm rounded-pill mt-4"
              @click="$router.push('/events')"
            >
              Späť na zoznam udalostí
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p v-else>Udalosť neexistuje alebo nebola nájdená.</p>
</template>

<script>
import events from "@/assets/events.json";

export default {
  name: "EventDetail",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      event: null,
      isFavorite: false,
    };
  },
  mounted() {
    const eventId = parseInt(this.id, 10);
    this.event = events.find((e) => e.id === eventId) || null;

    if (this.event) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      this.isFavorite = favorites.includes(this.event.id);
    }
  },
  methods: {
    shareEvent() {
      if (navigator.share) {
        navigator
          .share({
            title: this.event.name,
            text: `Pozrite si udalosť: ${this.event.name} - ${this.event.description}`,
            url: window.location.href,
          })
          .catch((error) => console.log("Error sharing", error));
      } else {
        alert("Zdieľanie nie je podporované v tomto prehliadači.");
      }
    },
    toggleFavorite() {
      if (!this.event) return;

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (this.isFavorite) {
        const index = favorites.indexOf(this.event.id);
        if (index > -1) favorites.splice(index, 1);
        this.isFavorite = false;
      } else {
        favorites.push(this.event.id);
        this.isFavorite = true;
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    },
  },
};
</script>
