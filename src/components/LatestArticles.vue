<template>
  <div class="container py-5">
    <h1 class="text-center mb-5">Najnovšie články</h1>

    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 mb-4"
        v-for="article in latestArticles"
        :key="article.slug"
      >
        <div class="card h-100 shadow-sm rounded">
          <img :src="article.image" class="card-img-top rounded-top" alt="Article image">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Autor: {{ article.author }} | Dátum: {{ article.date }}
            </h6>
            <p class="card-text">
              {{ article.content.substring(0, 100) }}...
            </p>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="$router.push(`/blog/${article.slug}`)"
            >
              Čítať viac
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useArticleStore } from "@/stores/articleStore";

export default {
  name: "LatestArticles",
  setup() {
    const articleStore = useArticleStore();

    const latestArticles = computed(() => {
      return [...articleStore.articles]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
    });

    return {
      latestArticles,
    };
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card-subtitle {
  font-size: 0.875rem;
  margin-bottom: 1rem;
  color: #6c757d;
}

.card-text {
  font-size: 0.875rem;
  color: #333;
}

.btn {
  transition: background-color 0.2s ease, color 0.2s ease;
}

.btn:hover {
  background-color: #007bff;
  color: white;
}
</style>
