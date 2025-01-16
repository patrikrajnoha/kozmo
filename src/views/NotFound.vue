<template>
  <div :class="['not-found-container d-flex flex-column align-items-center justify-content-center', themeClass]">
    <h1 class="display-4 mb-3">Stránka nenájdená</h1>
    <p class="lead mb-4">Je nám ľúto, ale stránka, ktorú hľadáte, neexistuje.</p>
    <button class="btn btn-primary" @click="$router.push('/')">
      Späť na domovskú stránku
    </button>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    themeClass() {
      return this.isDarkTheme ? "bg-dark text-white" : "bg-light text-dark";
    },
  },
};
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  text-align: center;
}
</style>
