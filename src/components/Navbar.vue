<template>
  <nav :class="['navbar navbar-expand-lg', themeClass]">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">
        <img
          :src="isDarkTheme ? 'img/logo.png' : 'img/logo2.png'"
          alt="Logo Kozmo"
          class="logo"
        />
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <input
              v-model="searchQuery"
              class="form-control me-2"
              type="search"
              placeholder="Vyhľadať"
              aria-label="Vyhľadávanie"
              @input="performSearch"
            />
          </li>

          <li class="nav-item" v-for="link in navLinks" :key="link.to">
            <RouterLink :to="link.to" class="nav-link">
              {{ link.label }}
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/cart" class="nav-link position-relative">
              <i class="mdi mdi-cart"></i>
              <span
                v-if="cartStore.totalItems > 0"
                class="badge bg-danger position-absolute top-0 start-100 translate-middle"
              >
                {{ cartStore.totalItems }}
              </span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/favorites" class="nav-link">
              <i class="mdi mdi-heart"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <button class="btn btn-link nav-link" @click="$emit('toggle-theme')">
              <i :class="isDarkTheme ? 'mdi mdi-weather-sunny' : 'mdi mdi-moon-waning-crescent'"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="search-results text-dark"
      v-if="searchResults.length > 0 && searchQuery"
    >
      <ul class="list-group">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          v-for="result in searchResults"
          :key="result.route"
          @click="navigateTo(result)"
        >
          {{ result.title }} <span class="badge bg-primary">{{ result.type }}</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";
import { useArticleStore } from "@/stores/articleStore";
import { useEventStore } from "@/stores/eventStore";

export default {
  name: "Navbar",
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["toggle-theme"],
  data() {
    return {
      searchQuery: "",
      searchResults: [],
    };
  },
  setup() {
    const cartStore = useCartStore();

    const navLinks = [
      { to: "/", label: "Domov" },
      { to: "/events", label: "Udalosti" },
      { to: "/blog", label: "Blog" },
      { to: "/shop", label: "Obchod" },
    ];

    return { navLinks, cartStore };
  },
  computed: {
    themeClass() {
      return this.isDarkTheme ? "navbar-dark bg-dark" : "navbar-light bg-light";
    },
  },
  methods: {
    performSearch() {
      const productStore = useProductStore();
      const articleStore = useArticleStore();
      const eventStore = useEventStore();

      const productResults = productStore.allProducts
        .filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .map((product) => ({
          title: product.name,
          type: "Produkt",
          route: `/shop/${product.slug}`,
        }));

      const articleResults = articleStore.articles
        .filter((article) =>
          article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .map((article) => ({
          title: article.title,
          type: "Článok",
          route: `/blog/${article.slug}`,
        }));

      const eventResults = eventStore.allEvents
        .filter((event) =>
          event.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .map((event) => ({
          title: event.name,
          type: "Udalosť",
          route: `/events/${event.id}`,
        }));

      this.searchResults = [...productResults, ...articleResults, ...eventResults];
    },
    navigateTo(result) {
      this.$router.push(result.route);
      this.searchQuery = "";
      this.searchResults = [];
    },
  },
};
</script>

<style scoped>
.logo {
  max-height: 40px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.badge {
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
}

.form-control {
  max-width: 200px;
  margin-right: 10px;
}

.search-results {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  z-index: 1000;
}

.list-group-item {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.list-group-item:hover {
  background-color: #f0f0f0;
}
</style>
