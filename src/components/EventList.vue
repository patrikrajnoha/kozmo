<template>
  <div :class="['container mt-5', themeClass]">
    <h1 :class="['text-center fw-bold mb-3', themeTextClass]">Nadchádzajúce udalosti v roku 2025</h1>
    <h2 class="text-center mb-5" :class="themeMutedTextClass">
      Rok 2025 prinesie viaceré zaujímavé vesmírne javy, ktoré budeme môcť
      pozorovať na nočnej oblohe počas nasledujúcich mesiacov. Na ktoré sa
      môžeme tešiť?
    </h2>

  
    <div class="row mb-4">
      <div class="col-12 col-sm-6 mb-3 mb-sm-0">
        <select
          class="form-select shadow-none border-0"
          :class="['rounded-pill', themeSelectClass]"
          v-model="selectedCategory"
        >
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
      </div>
      <div class="col-12 col-sm-6">
        <select
          class="form-select shadow-none border-0"
          :class="['rounded-pill', themeSelectClass]"
          v-model="selectedSort"
        >
          <option v-for="option in sortOptions" :key="option">{{ option }}</option>
        </select>
      </div>
    </div>

  
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 mb-4"
        v-for="event in filteredEvents"
        :key="event.id"
      >
        <div
          class="card event-card h-100"
          :class="['rounded-4', themeCardClass]"
          @click="$router.push(`/events/${event.id}`)"
        >
          <img :src="event.image" class="card-img-top rounded-top-4" alt="Event Image" />
          <div class="card-body">
            <h5 class="card-title" :class="themeTextClass">{{ event.name }}</h5>
            <h6 class="card-subtitle mb-2" :class="themeMutedTextClass">
              {{ event.date }} - {{ event.location }}
            </h6>
            <p class="card-text" :class="themeMutedTextClass">
              {{ event.description.substring(0, 100) }}...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import events from "@/assets/events.json";

export default {
  name: "EventList",
  data() {
    return {
      events,
      selectedCategory: "Všetko",
      selectedSort: "Najbližšie",
      categories: ["Všetko", "Astronomické úkazy", "Prednášky", "Workshopy"],
      sortOptions: ["Najbližšie", "Najvzdialenejšie"],
      isDarkTheme: true, 
    };
  },
  computed: {
    themeClass() {
      return this.isDarkTheme ? "bg-dark text-light" : "bg-light text-dark";
    },
    themeTextClass() {
      return this.isDarkTheme ? "text-light" : "text-dark";
    },
    themeMutedTextClass() {
      return this.isDarkTheme ? "text-secondary" : "text-muted";
    },
    themeCardClass() {
      return this.isDarkTheme ? "bg-dark text-light border-light" : "bg-white text-dark border-light";
    },
    themeSelectClass() {
      return this.isDarkTheme ? "bg-dark text-light border-light" : "bg-light text-dark border-dark";
    },
    filteredEvents() {
      let filtered = this.events;

   
      if (this.selectedCategory !== "Všetko") {
        filtered = filtered.filter(
          (event) => event.category === this.selectedCategory
        );
      }

   
      if (this.selectedSort === "Najbližšie") {
        filtered = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (this.selectedSort === "Najvzdialenejšie") {
        filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      return filtered;
    },
  },
};
</script>

