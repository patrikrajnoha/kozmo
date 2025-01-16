import { defineStore } from "pinia";
import articlesData from "@/assets/articles.json";

export const useArticleStore = defineStore("articleStore", {
  state: () => ({
    articles: articlesData,
  }),
  actions: {
    addArticle(article) {
      this.articles.push({
        ...article,
        id: String(this.articles.length + 1),
        slug: article.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      });
    },
    updateArticle(updatedArticle) {
      const index = this.articles.findIndex((a) => a.id === updatedArticle.id);
      if (index !== -1) {
        this.articles[index] = updatedArticle;
      }
    },
    deleteArticle(slug) {
      this.articles = this.articles.filter((article) => article.slug !== slug);
    },
  },
});
