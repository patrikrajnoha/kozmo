<template>
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        type="button"
        :data-bs-target="'#carouselExampleIndicators'"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
        :aria-current="index === 0 ? 'true' : undefined"
        :aria-label="'Slide ' + (index + 1)"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :class="['carousel-item', { active: index === 0 }]"
      >
        <img :src="slide.image" class="d-block w-100 carousel-image" alt="Slide image">
        <div class="carousel-caption">
          <h5 class="carousel-title">{{ slide.title }}</h5>
          <p class="carousel-text">{{ slide.content }}</p>
          <button class="btn btn-primary mt-3" @click="$router.push('/blog/nasa-webb-snimky')">
            Prejsť na článok
          </button>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Predchádzajúci</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Ďalší</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.carousel-inner {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.carousel-image {
  object-fit: cover;
  max-height: 700px; /* Zvýšená maximálna výška */
}

.carousel-caption {
  background: rgba(0, 0, 0, 0.6);
  padding: 15px;
  border-radius: 10px;
  animation: fadeInUp 1s ease;
  text-align: center;
  width: 90%;
  max-width: 600px;
  margin: auto;
}

.carousel-title {
  font-size: 1.8rem;
  color: #ffcc00;
  text-transform: uppercase;
  font-weight: bold;
}

.carousel-text {
  font-size: 1rem;
  color: #f1f1f1;
  margin-top: 10px;
}

.btn {
  font-size: 0.9rem;
  padding: 10px 20px;
  border-radius: 25px;
}

@media (max-width: 768px) {
  .carousel-image {
    max-height: 400px; /* Zvýšená výška pre mobilné zariadenia */
  }

  .carousel-title {
    font-size: 1.4rem;
  }

  .carousel-text {
    font-size: 0.9rem;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
