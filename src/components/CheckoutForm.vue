<template>
  <form ref="orderForm" class="p-4 rounded-4 shadow-sm bg-light">
    <div class="mb-3">
      <label for="name" class="form-label">Meno a priezvisko</label>
      <input
        v-model="customer.name"
        type="text"
        id="name"
        class="form-control rounded-pill"
        placeholder="Zadajte meno a priezvisko"
        required
      />
    </div>
    <div class="mb-3">
      <label for="address" class="form-label">Adresa</label>
      <input
        v-model="customer.address"
        type="text"
        id="address"
        class="form-control rounded-pill"
        placeholder="Zadajte adresu"
        required
      />
    </div>
    <div class="mb-3">
      <label for="city" class="form-label">Mesto</label>
      <input
        v-model="customer.city"
        type="text"
        id="city"
        class="form-control rounded-pill"
        placeholder="Zadajte mesto"
        required
      />
    </div>
    <div class="mb-3">
      <label for="postalCode" class="form-label">PSČ</label>
      <input
        v-model="customer.postalCode"
        type="text"
        id="postalCode"
        class="form-control rounded-pill"
        placeholder="Zadajte PSČ"
        required
      />
    </div>
    <div class="mb-3">
      <label for="phone" class="form-label">Telefónne číslo</label>
      <input
        v-model="customer.phone"
        type="tel"
        id="phone"
        class="form-control rounded-pill"
        placeholder="Zadajte telefónne číslo"
        required
      />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        v-model="customer.email"
        type="email"
        id="email"
        class="form-control rounded-pill"
        placeholder="Zadajte email"
        required
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "CheckoutForm",
  props: {
    customer: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
form {
  background-color: #f8f9fa; 
  border: 1px solid #e9ecef;
}

.form-control {
  padding: 0.75rem 1.25rem; 
  font-size: 1rem;
  box-shadow: none; 
}

.form-control:focus {
  border-color: #0d6efd; 
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25); 
}

.form-label {
  font-weight: bold;
  color: #495057; 
}
</style>
