<template>
  <div :class="['container', themeClass, 'py-4']">
    <h1 class="text-center page-title mb-4">Obchod</h1>

    <div class="row filter-bar align-items-center justify-content-center">
      <div class="col-12 col-sm-6 col-md-4 mb-3">
        <div class="input-group rounded-pill">
          <span class="input-group-text bg-primary text-white">
            <i class="bi bi-search"></i>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            class="form-control rounded-end-pill"
            placeholder="Vyhľadať produkt"
          />
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-4 mb-3">
        <div class="input-group rounded-pill">
          <span class="input-group-text bg-primary text-white">
            <i class="bi bi-list"></i>
          </span>
          <select
            v-model="selectedCategory"
            class="form-select rounded-end-pill"
          >
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-md-4 mb-3">
        <div class="input-group rounded-pill">
          <span class="input-group-text bg-primary text-white">
            <i class="bi bi-box"></i>
          </span>
          <select
            v-model="availability"
            class="form-select rounded-end-pill"
          >
            <option value="Všetko">Všetko</option>
            <option value="Skladom">Skladom</option>
            <option value="Nie je skladom">Nie je skladom</option>
          </select>
        </div>
      </div>
    </div>

    <div class="row product-list justify-content-center">
      <div
        class="col-12 col-sm-6 col-md-4 mb-4"
        v-for="product in filteredProducts"
        :key="product.id"
      >
        <ProductItem 
          :product="product" 
          @click="$router.push(`/shop/${product.slug}`)" 
          class="rounded-4 shadow-sm"
        />
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-6">
        <button
          class="btn btn-primary btn-lg w-100 mt-4 rounded-pill"
          @click="$router.push('/cart')"
        >
          Prejsť do košíka ({{ cartStore.totalItems }} položiek)
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem.vue";
import { useCartStore } from "@/stores/cartStore";
import products from "@/assets/products.json";
import { searchItems, filterByCategory, sortItems } from "@/services/filters";

export default {
  name: "ShopView",
  components: {
    ProductItem,
  },
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      products,
      searchQuery: "",
      selectedCategory: "Všetko",
      availability: "Všetko",
      categories: ["Všetko", ...new Set(products.map((product) => product.category))],
    };
  },
  computed: {
    filteredProducts() {
      let filtered = [...this.products];

      filtered = searchItems(filtered, this.searchQuery);
      filtered = filterByCategory(filtered, this.selectedCategory);

      if (this.availability === "Skladom") {
        filtered = filtered.filter((product) => product.inStock);
      } else if (this.availability === "Nie je skladom") {
        filtered = filtered.filter((product) => !product.inStock);
      }

      return sortItems(filtered, "name", true);
    },
    themeClass() {
      return this.isDarkTheme ? "dark-theme" : "light-theme";
    },
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
};
</script>

<style scoped>
.input-group-text {
  border-radius: 50px 0 0 50px;
}

.form-control {
  border-radius: 0 50px 50px 0;
}

.form-select {
  border-radius: 0 50px 50px 0;
}

.product-list .col-md-4 {
  flex: 0 0 auto;
  max-width: 33.333%;
}

.btn-primary {
  border-radius: 50px;
}

.rounded-4 {
  border-radius: 1rem !important;
}
</style>
