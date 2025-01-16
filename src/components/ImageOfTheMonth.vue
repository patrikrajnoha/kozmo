<template>
  <div class="container my-5">
    <div class="card mx-auto text-center shadow-lg">
      <div :class="['card-header', isDarkTheme ? 'dark-theme-header' : 'light-theme-header']">
        <h2 class="card-title mb-0">Obrázok mesiaca</h2>
      </div>
      <img :src="image" alt="Obrázok mesiaca" class="card-img-top rounded" />
      <div class="card-body">
        <p :class="['card-text', isDarkTheme ? 'dark-text' : 'light-text']">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageOfTheMonth",
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.card {
  max-width: 90%;
  margin: 0 auto;
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.25);
  background-color: var(--card-bg-color);
  transition: background-color 0.3s ease;
}

.light-theme-header {
  background-color: #f0f0f0;
  color: #000000;
}

.dark-theme-header {
  background-color: #131415;
  color: #ffffff;
}

.card-img-top {
  max-height: 450px;
  object-fit: cover;
  border-bottom: 3px solid #e9ecef;
}

.light-text {
  color: #000000;
  font-size: 1.2rem;
  line-height: 1.8;
}

.dark-text {
  color: #f1f1f1;
  font-size: 1.2rem;
  line-height: 1.8;
}
</style>
