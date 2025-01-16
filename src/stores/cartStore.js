import { defineStore } from "pinia";
import { watch } from "vue";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    cart: [],
  }),
  getters: {
    totalItems: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  actions: {
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId);
    },
    updateQuantity(productId, quantity) {
      const product = this.cart.find((item) => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },
    clearCart() {
      this.cart = [];
    },
    loadCart() {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    },
  },
});

export function useCartPersistence(cartStore) {
  watch(
    () => cartStore.cart,
    (newCart) => {
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    { deep: true }
  );
}
