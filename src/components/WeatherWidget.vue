<template>
  <div class="weather-widget-row">
    <!-- Počasie pre Nitru -->
    <div class="weather-widget">
      <v-card class="weather-card">
        <v-card-title class="weather-card-title">
          <span v-if="weather">{{ weather.city }}, {{ weather.country }}</span>
          <span v-else>Načítava sa počasie...</span>
        </v-card-title>
        <v-card-text v-if="weather">
          <div class="weather-info">
            <img
              :src="weather.icon"
              alt="Weather Icon"
              class="weather-icon"
              v-if="weather.icon"
            />
            <p>Teplota: <strong>{{ weather.temperature }}°C</strong></p>
            <p>Podmienky: {{ weather.description }}</p>
            <p>Vietor: {{ weather.wind }} km/h</p>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weather: null,
      apiKey: "f2759b0079c9dadfe24668d6dfebfa51",
      city: "Nitra",
    };
  },
  methods: {
    async fetchWeather() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.apiKey}`
        );
        if (!response.ok) {
          throw new Error(`Chyba: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        this.weather = {
          city: data.name || "Neznáme mesto",
          country: data.sys?.country || "Neznáma krajina",
          temperature: data.main?.temp || "N/A",
          description: data.weather?.[0]?.description || "Neznáme podmienky",
          wind: data.wind?.speed || "N/A",
          icon: data.weather && data.weather[0]?.icon
            ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            : "https://via.placeholder.com/100",
        };

        console.log("Počasie:", this.weather);
      } catch (error) {
        console.error("Chyba pri načítaní počasia:", error.message);
        this.weather = null;
      }
    },
  },
  mounted() {
    this.fetchWeather();
  },
};
</script>

<style>
/* Globálne štýly */
.weather-widget-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.weather-widget {
  width: 100%;
  max-width: 400px;
}

.weather-card {
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: linear-gradient(135deg, #6dd5ed, #2193b0);
  color: white;
}

.weather-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.weather-info {
  text-align: center;
  padding: 20px;
}

.weather-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 10px;
  display: block;
}

.weather-info p {
  margin: 5px 0;
  font-size: 1.2rem;
}

.weather-info strong {
  font-weight: 700;
}


@media (max-width: 576px) {
  .weather-card {
    border-radius: 15px;
  }

  .weather-card-title {
    font-size: 1.25rem;
  }

  .weather-info p {
    font-size: 1rem;
  }
}

</style>