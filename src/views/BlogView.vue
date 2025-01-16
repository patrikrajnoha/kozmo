<template>
  <div :class="['container', themeClass]">
    <h1 :class="['text-center my-4', isDarkTheme ? 'text-white' : 'text-dark']">Blog</h1>

    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-4 mb-4"
        v-for="article in articles"
        :key="article.slug"
      >
        <div class="card article-card border-0 shadow-sm rounded-4">
          <img :src="article.image" class="card-img-top rounded-top-4" alt="Náhľad článku" />
          <div class="card-body p-3">
            <h5 class="card-title fw-bold text-primary">{{ article.title }}</h5>
            <p class="card-subtitle mb-2 text-muted small">
              Autor: {{ article.author }} | Dátum: {{ article.date }}
            </p>
            <p class="card-text text-secondary small mb-3">
              {{ article.content.substring(0, 100) }}...
            </p>
            <button
              class="btn btn-outline-primary btn-sm rounded-pill px-3"
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
import { useArticleStore } from "@/stores/articleStore";

export default {
  name: "BlogView",
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const articleStore = useArticleStore();

    return {
      articles: articleStore.articles,
    };
  },
  computed: {
    themeClass() {
      return this.isDarkTheme ? "dark-theme" : "light-theme";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1100px;
}

h1 {
  font-size: 1.75rem;
  font-weight: bold;
}

.article-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.15);
}

.card-title {
  font-size: 1rem;
}

.card-subtitle {
  font-size: 0.875rem;
}

.article-content {
  font-size: 0.9rem;
  color: #495057;
}

.btn {
  font-size: 0.875rem;
}

.light-theme {
  background-color: #ffffff;
  color: #212529;
}

.light-theme .article-card {
  background-color: #fff;
  color: #212529;
}

.dark-theme {
  background-color: #131415;
  color: #f8f9fa;
}

.dark-theme .article-card {
  background-color: #495057;
  color: #f8f9fa;
}

.dark-theme .card-title {
  color: #bb86fc;
}

.dark-theme .card-subtitle {
  color: #adb5bd;
}

.dark-theme .btn-outline-primary {
  border-color: #bb86fc;
  color: #bb86fc;
}

.dark-theme .btn-outline-primary:hover {
  background-color: #bb86fc;
  color: #fff;
}
</style>
