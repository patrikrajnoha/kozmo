<template>
  <div class="carousel-container">
    
    <div class="centered-text">
      Swipni si udalosti v roku 2025
    </div>

   
    <div
      class="card event-card"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
    >
      <img :src="currentEvent.image" class="card-img-top carousel-image" alt="Event Image" />
      <div class="card-body">
        <h5 class="card-title">{{ currentEvent.name }}</h5>
        <p class="card-text">
          {{ currentEvent.date }} - {{ currentEvent.location }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import events from "@/assets/events.json";

export default {
  name: "CarouselCards",
  props: {
    isLightTheme: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      events,
      currentIndex: 0,
      touchStartX: 0,
      touchEndX: 0,
      isMouseDown: false,
      mouseStartX: 0,
      mouseEndX: 0,
    };
  },
  computed: {
    currentEvent() {
      return this.events[this.currentIndex];
    },
  },
  methods: {
    onTouchStart(event) {
      this.touchStartX = event.changedTouches[0].clientX;
    },
    onTouchEnd(event) {
      this.touchEndX = event.changedTouches[0].clientX;
      this.handleSwipe(this.touchStartX, this.touchEndX);
    },
    onMouseDown(event) {
      this.isMouseDown = true;
      this.mouseStartX = event.clientX;
    },
    onMouseUp(event) {
      if (this.isMouseDown) {
        this.mouseEndX = event.clientX;
        this.handleSwipe(this.mouseStartX, this.mouseEndX);
        this.isMouseDown = false;
      }
    },
    onMouseLeave() {
      this.isMouseDown = false;
    },
    handleSwipe(startX, endX) {
      const deltaX = endX - startX;
      if (deltaX > 50) {
        this.prevEvent();
      } else if (deltaX < -50) {
        this.nextEvent();
      }
    },
    nextEvent() {
      this.currentIndex = (this.currentIndex + 1) % this.events.length;
    },
    prevEvent() {
      this.currentIndex =
        (this.currentIndex - 1 + this.events.length) % this.events.length;
    },
  },
};
</script>

<style scoped>
.carousel-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  padding: 30px;
}

.centered-text {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--text-color);
}

.event-card {
  max-width: 500px;
  margin: 0 auto;
  border: none;
  border-radius: 20px;
}
</style>
