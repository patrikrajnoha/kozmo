<template>
  <div :class="['container my-4', isDarkTheme ? 'dark-theme' : 'light-theme']">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8">
        <div class="card border-0 shadow-sm rounded-4 article-card" :class="isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'">
          <img :src="article.image" class="card-img-top rounded-top-4" alt="Obrázok článku" />
          <div class="card-body p-3">
            <h1 class="card-title fs-4 mb-2" :class="isDarkTheme ? 'text-primary' : 'text-dark'">{{ article.title }}</h1>
            <p class="card-subtitle mb-2 small" :class="isDarkTheme ? 'text-muted text-light' : 'text-muted'">
              Autor: {{ article.author }} | Dátum: {{ article.date }}
            </p>
            <p class="card-text article-content mb-3 small">
              {{ article.content }}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <button
                class="btn btn-outline-primary btn-sm rounded-pill px-3"
                @click="$router.push('/blog')"
              >
                Späť na Blog
              </button>
              <div class="share-buttons">
                <span class="small me-2" :class="isDarkTheme ? 'text-light' : 'text-muted'">Zdieľaj článok:</span>
                <a
                  :href="`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`"
                  target="_blank"
                  class="btn btn-facebook btn-sm rounded-pill"
                >
                  <i class="mdi mdi-facebook"></i> Facebook
                </a>
                <a
                  :href="`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(article.title)}`"
                  target="_blank"
                  class="btn btn-twitter btn-sm rounded-pill"
                >
                  <i class="mdi mdi-twitter"></i> Twitter
                </a>
                <a
                  :href="`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`"
                  target="_blank"
                  class="btn btn-linkedin btn-sm rounded-pill"
                >
                  <i class="mdi mdi-linkedin"></i> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useArticleStore } from "@/stores/articleStore";

export default {
  name: "ArticleDetailView",
  props: {
    slug: {
      type: String,
      required: true,
    },
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const articleStore = useArticleStore();
    const article = articleStore.articles.find((article) => article.slug === props.slug) || {
      title: "Článok nenájdený",
      author: "",
      date: "",
      image: "/img/default.jpg",
      content: "Článok, ktorý hľadáte, neexistuje.",
    };

    const shareUrl = window.location.href;

    return {
      article,
      shareUrl,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
}

.article-card {
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-subtitle {
  font-size: 0.85rem;
}

.article-content {
  font-size: 0.875rem;
  line-height: 1.5;
}

.share-buttons .btn-facebook {
  background-color: #3b5998;
  color: #fff;
}

.share-buttons .btn-twitter {
  background-color: #1da1f2;
  color: #fff;
}

.share-buttons .btn-linkedin {
  background-color: #0077b5;
  color: #fff;
}

.share-buttons .btn {
  margin-right: 5px;
  font-size: 0.75rem;
  padding: 5px 8px;
}

.share-buttons .btn:hover {
  opacity: 0.9;
}

.light-theme {
  background-color: #f8f9fa;
  color: #212529;
}

.dark-theme {
  background-color: #131415;
  color: #f8f9fa;
}
</style>
