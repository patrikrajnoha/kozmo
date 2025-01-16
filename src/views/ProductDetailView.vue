<template>
  <v-container v-if="product">
    <v-card class="product-detail-card">
      <v-img :src="product.image" height="300" cover></v-img>
      <v-card-title class="title">{{ product.name }}</v-card-title>
      <v-card-subtitle class="price">{{ product.price }} €</v-card-subtitle>
      <v-card-text>
        <p class="description">{{ product.description }}</p>
        <p class="availability">
          Dostupnosť:
          <span :class="{ 'text-success': product.inStock, 'text-error': !product.inStock }">
            {{ product.inStock ? "Skladom" : "Nie je skladom" }}
          </span>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="product.inStock" outlined color="primary" @click="addToCart">
          Pridať do košíka
        </v-btn>
        <v-btn outlined color="secondary" @click="$router.push('/shop')">
          Späť do obchodu
        </v-btn>
        <v-btn outlined color="success" @click="$router.push('/cart')">
          Prejsť do košíka
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  <p v-else class="error-message">Produkt neexistuje alebo nebol nájdený.</p>
</template>

<script>
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";

export default {
  name: "ProductDetailView",
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
  data() {
    return {
      product: null,
    };
  },
  mounted() {
    const productStore = useProductStore();
    this.product = productStore.productBySlug(this.slug);
  },
  methods: {
    addToCart() {
      if (this.product) {
        const cartStore = useCartStore();
        cartStore.addToCart(this.product);
      }
    },
  },
};
</script>

<style scoped>
.product-detail-card {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-detail-card:hover {
  transform: scale(1.02);
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #3f51b5;
  margin-bottom: 10px;
}

.price {
  font-size: 20px;
  color: #757575;
  margin-bottom: 20px;
}

.description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
}

.availability {
  font-size: 14px;
  margin-top: 10px;
}

.text-success {
  color: green;
  font-weight: bold;
}

.text-error {
  color: red;
  font-weight: bold;
}

.v-btn {
  margin-top: 20px;
}

.error-message {
  text-align: center;
  font-size: 18px;
  color: red;
  margin-top: 20px;
}
</style>
