<template>
  <div class="planet-weather">
    <div class="container">
      <div class="row">
        <div
          class="col-12 col-md-4 mb-4"
          v-for="planet in planets"
          :key="planet.name"
        >
          <div
            class="card text-center shadow-sm planet-card"
            :class="themeClass"
          >
            <div
              class="card-header planet-card-header"
              :class="headerThemeClass"
            >
              <h5 class="mb-0">{{ planet.name }}</h5>
            </div>
            <div class="card-body">
              <img
                :src="planet.icon"
                alt="Planet Icon"
                class="planet-icon"
              />
              <p class="card-text">Teplota: <strong>{{ planet.temperature }}°C</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanetWeather",
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      planets: [],
    };
  },
  computed: {
    themeClass() {
      return this.isDarkTheme ? "bg-dark text-white" : "bg-light text-dark";
    },
    headerThemeClass() {
      return this.isDarkTheme ? "bg-dark text-white" : "bg-light text-dark";
    },
  },
  mounted() {
    fetch("/data/planetsData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP chyba: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        this.planets = data;
      })
      .catch((error) => {
        console.error("Chyba pri načítaní planét:", error);
      });
  },
};
</script>

<style scoped>

.planet-weather {
  padding: 2rem 0;
  background: var(--background-color);
  color: var(--text-color);
}

.planet-card {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: var(--card-background);
}

.planet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.planet-card-header {
  background: var(--header-background);
  color: var(--header-text-color);
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
}

.planet-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  display: block;
  border-radius: 50%;
  border: 3px solid var(--icon-border-color);
}

.card-text {
  font-size: 1rem;
  color: var(--text-color-secondary);
  font-weight: 500;
}
:root {
  --background-color: #f8f9fa;
  --text-color: #212529;
  --text-color-secondary: #6c757d;
  --card-background: #ffffff;
  --border-color: #dee2e6;
  --header-background: #e9ecef;
  --header-text-color: #495057;
  --icon-border-color: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --background-color:  #121212 ;
  --text-color: #e0e0e0;
  --text-color-secondary: #b0b0b0;
  --card-background: #1e1e1e;
  --border-color: #323232;
  --header-background: #292929;
  --header-text-color: #f1f1f1;
  --icon-border-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .planet-card {
    margin-bottom: 1.5rem;
  }
}
</style>
