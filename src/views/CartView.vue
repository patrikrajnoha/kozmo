<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Košík</h1>

    <div v-if="cartStore.cart.length === 0" class="text-center py-5 border rounded-4 shadow-sm">
      <p class="mb-3">Váš košík je prázdny.</p>
      <button class="btn btn-primary rounded-pill" @click="$router.push('/shop')">
        Pokračovať v nakupovaní
      </button>
    </div>

    <div v-else>
      <div class="row gy-4">
        <div class="col-12 col-md-6 col-lg-4" v-for="item in cartStore.cart" :key="item.id">
          <div class="card h-100 shadow-sm rounded-4">
            <img :src="item.image" class="card-img-top rounded-top-4" alt="Obrázok produktu" />
            <div class="card-body">
              <h5 class="card-title text-primary">{{ item.name }}</h5>
              <p class="card-subtitle mb-3 text-muted">{{ item.price }} €</p>
              <div class="d-flex align-items-center justify-content-between">
                <input
                  v-model="item.quantity"
                  type="number"
                  min="1"
                  class="form-control rounded-pill w-50 me-2"
                  @change="updateQuantity(item)"
                />
                <button class="btn btn-outline-danger btn-sm rounded-pill" @click="removeFromCart(item.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 text-end">
        <h4 class="mb-3">Celkovo: {{ cartStore.totalPrice.toFixed(2) }} €</h4>
        <button class="btn btn-success rounded-pill px-4 py-2" @click="openCheckoutDialog">
          Dokončiť objednávku
        </button>
      </div>

      <div v-if="checkoutDialog" class="modal fade show" tabindex="-1" style="display: block;" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content rounded-4">
            <div class="modal-header">
              <h5 class="modal-title" style="color: black;">Potvrdenie objednávky</h5>
              <button type="button" class="btn-close" @click="checkoutDialog = false"></button>
            </div>
            <div class="modal-body">
              <h6 style="color: black;">Obsah objednávky:</h6>
              <ul class="list-group list-group-flush mb-3">
                <li class="list-group-item" v-for="item in orderSummary" :key="item.id">
                  {{ item.name }} ({{ item.quantity }} × {{ item.price.toFixed(2) }} €) =
                  {{ (item.quantity * item.price).toFixed(2) }} €
                </li>
              </ul>
              <h6 class="mb-3">Celkovo: {{ totalPrice.toFixed(2) }} €</h6>

              <h6>Dodacie údaje:</h6>
              <CheckoutForm :customer="customer" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary rounded-pill" @click="checkoutDialog = false">
                Zrušiť
              </button>
<a
  class="btn btn-primary rounded-pill"
  :href="generateMailtoLink"
  target="_blank"
  @click="finalizeCheckout"
>
  Odoslať objednávku
</a>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";
import CheckoutForm from "@/components/CheckoutForm.vue";

export default {
  name: "CartView",
  components: {
    CheckoutForm,
  },
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      checkoutDialog: false,
      customer: {
        name: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        email: "",
      },
      orderSummary: [],
      totalPrice: 0,
    };
  },
  computed: {
    generateMailtoLink() {
      if (this.orderSummary.length === 0) return "";

      const orderDetails = this.orderSummary
        .map(
          (item) =>
            `${item.name} (${item.quantity} × ${item.price.toFixed(2)} €)`
        )
        .join(", ");
      const subject = encodeURIComponent("Objednávka z Kozmo");
      const body = encodeURIComponent(
        `Objednávka:\n${orderDetails}\n\n` +
        `Celkovo: ${this.totalPrice.toFixed(2)} €\n\n` +
        `Dodacie údaje:\n` +
        `Meno: ${this.customer.name}\n` +
        `Adresa: ${this.customer.address}, ${this.customer.city}, ${this.customer.postalCode}\n` +
        `Telefón: ${this.customer.phone}\n` +
        `Email: ${this.customer.email}`
      );

      return `mailto:objednavky@kozmo.sk?subject=${subject}&body=${body}`;
    },
  },
  methods: {
    openCheckoutDialog() {
      this.orderSummary = [...this.cartStore.cart];
      this.totalPrice = this.cartStore.totalPrice;
      this.checkoutDialog = true;
    },
    finalizeCheckout() {
      this.cartStore.clearCart();
      this.checkoutDialog = false;
    },
    updateQuantity(item) {
      const parsedQuantity = parseInt(item.quantity, 10);
      if (parsedQuantity < 1 || isNaN(parsedQuantity)) {
        item.quantity = 1;
      } else {
        item.quantity = parsedQuantity;
      }
      this.cartStore.updateQuantity(item.id, item.quantity);
    },
    removeFromCart(id) {
      this.cartStore.removeFromCart(id);
    },
  },
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
}

.card-img-top {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.btn {
  border-radius: 50px;
}

.input-group .form-control {
  border-radius: 50px;
}

.modal-content {
  border-radius: 1rem;
  overflow: hidden;
}
</style>
