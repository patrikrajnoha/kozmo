<template>
  <div class="container mt-4">
    <h1 class="text-center mb-3 display-5 fw-bold">Nadchádzajúce udalosti 2025</h1>
    <h2 class="text-center mb-4 text-secondary small">
      Rok 2025 prinesie zaujímavé vesmírne javy. Ktoré budeme môcť pozorovať?
    </h2>

    <div class="row mb-3">
      <div class="col-6">
        <select
          class="form-select rounded-pill shadow-sm"
          v-model="selectedCategory"
        >
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
      </div>
      <div class="col-6">
        <select
          class="form-select rounded-pill shadow-sm"
          v-model="selectedSort"
        >
          <option v-for="option in sortOptions" :key="option">{{ option }}</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div
        class="col-12 col-md-4 mb-3"
        v-for="event in filteredEvents"
        :key="event.id"
      >
        <div
          class="card border-0 shadow-sm h-100 event-card"
          @click="$router.push(`/events/${event.id}`)"
        >
          <img
            :src="event.image"
            class="card-img-top rounded-top"
            alt="Event Image"
          />
          <div class="card-body p-3">
            <h5 class="card-title fw-bold small">{{ event.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted small">
              {{ event.date }} - {{ event.location }}
            </h6>
            <p class="card-text text-secondary small mb-0">
              {{ event.description.substring(0, 80) }}...
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
    };
  },
  computed: {
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

<style scoped>
.container {
  max-width: 1200px;
}

h1 {
  font-size: 1.75rem;
}

h2 {
  font-size: 1rem;
  color: #666;
}

.event-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
}

.card-title {
  font-size: 1rem;
}

.card-subtitle {
  font-size: 0.75rem;
}

.card-text {
  font-size: 0.8rem;
  color: #6c757d;
}

.form-select {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ced4da;
  background-color: #f8f9fa;
  border-radius: 1.5rem;
}

.form-select:focus {
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
  border-color: #80bdff;
}
</style>
