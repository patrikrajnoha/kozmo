<template> 
  <v-card class="product-card">
    <v-img :src="product.image" height="200" cover></v-img>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle>{{ product.price }} €</v-card-subtitle>
    <v-card-text>
      {{ product.description }}
      <p class="availability">
        Dostupnosť: 
        <span :class="product.inStock ? 'in-stock' : 'out-of-stock'">
          {{ product.inStock ? "Skladom" : "Nie je skladom" }}
        </span>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :disabled="!product.inStock"
        outlined
        color="primary"
        @click="addToCart"
      >
        Pridať do košíka
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";

export default {
  name: "ProductItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const cartStore = useCartStore();

    const addToCart = () => {
      if (props.product.inStock) {
        cartStore.addToCart(props.product);
      }
    };

    return { addToCart };
  },
};
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.product-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.2);
}


.in-stock {
  color: green;
  font-weight: bold;
}


.out-of-stock {
  color: red;
  font-weight: bold;
}

.availability {
  margin-top: 10px;
  font-size: 14px;
}


.v-btn[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #ddd !important;
  color: #888 !important;
}

.v-btn {
  font-weight: bold;
  padding: 8px 16px;
}
</style>
