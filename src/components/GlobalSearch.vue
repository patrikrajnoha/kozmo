<template>
  <v-container>
    <v-text-field
      v-model="searchQuery"
      label="Vyhľadať obsah"
      placeholder="Články, udalosti, produkty..."
      outlined
      clearable
      @input="performSearch"
    ></v-text-field>

    <v-list v-if="results.length > 0">
      <v-list-item
        v-for="(result, index) in results"
        :key="index"
        @click="navigateTo(result)"
      >
        <v-list-item-title>{{ result.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ result.type }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <p v-else>No results found</p>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useArticleStore } from "@/stores/articleStore";
import { useEventStore } from "@/stores/eventStore";
import { useProductStore } from "@/stores/productStore";

export default {
  name: "GlobalSearch",
  setup() {
    const searchQuery = ref("");
    const results = ref([]);
    const articleStore = useArticleStore();
    const eventStore = useEventStore();
    const productStore = useProductStore();

    const performSearch = () => {
      const articles = articleStore.articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
      const events = eventStore.events.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
      const products = productStore.products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );

      results.value = [
        ...articles.map((a) => ({ ...a, type: "Článok", route: `/blog/${a.slug}` })),
        ...events.map((e) => ({ ...e, type: "Udalosť", route: `/events/${e.id}` })),
        ...products.map((p) => ({ ...p, type: "Produkt", route: `/shop/${p.slug}` })),
      ];
    };

    const navigateTo = (item) => {
      window.location.href = item.route;
    };

    return {
      searchQuery,
      results,
      performSearch,
      navigateTo,
    };
  },
};
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: 20px auto;
}

.v-list-item {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.v-list-item:hover {
  background-color: #be7070;
}

p {
  text-align: center;
  color: #bd6565;


}




.search-results.light-theme {
  background-color: #ffffff;
  color: #000000; 
}


.search-results.dark-theme {
  background-color: #1e1e1e;
  color: #ffffff; 
}


.search-result-item {
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.search-result-item:hover {
  background-color: rgba(255, 255, 255, 0.1); 
}


</style>
