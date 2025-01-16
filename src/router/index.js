import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EventsView from '../views/EventsView.vue';
import BlogView from '../views/BlogView.vue';
import ShopView from '../views/ShopView.vue';
import EventDetail from "@/components/EventDetail.vue";
import CartView from "@/views/CartView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import ArticleDetailView from "@/views/ArticleDetailView.vue";
import NotFound from "@/views/NotFound.vue";
import FavoritesView from "@/views/FavoritesView.vue";



const routes = [
  
  { path: '/', name: 'home', component: HomeView },
  { path: '/events', name: 'events', component: EventsView },
  { path: '/blog', name: 'blog', component: BlogView },
  { path: '/shop', name: 'shop', component: ShopView },


  { path: '/events/:id', name: 'eventDetail', component: EventDetail, props: true },


  {
    path: '/shop/:slug',
    name: 'productDetail',
    component: ProductDetailView,
    props: true,
  },


  { path: '/cart', name: 'cart', component: CartView },


  {
    path: '/blog/:slug',
    name: 'articleDetail',
    component: ArticleDetailView,
    props: (route) => ({ slug: route.params.slug }),
  },

  { path: '/:catchAll(.*)', name: 'NotFound', component: NotFound },

  { path: "/favorites", name: "favorites", component: FavoritesView },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(`Navigating from ${from.path} to ${to.path}`);
  next();
});

export default router;
