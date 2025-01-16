<template>
  <div class="container">
   
    <h2 class="text-center gallery-title" :class="themeClass">Galéria</h2>


    <div class="main-image-container text-center mb-4">
      <div class="main-image-wrapper position-relative">
        <img :src="activeImage" alt="Hlavný obrázok" class="main-image" />
        <a
          :href="activeImage"
          download
          class="btn btn-primary download-button position-absolute"
          title="Stiahnuť obrázok"
        >
          <i class="bi bi-download"></i> Stiahnuť
        </a>
      </div>
    </div>

    <div class="row g-3">
      <div
        class="col-3 col-md-2 col-lg-1"
        v-for="(image, index) in images"
        :key="index"
      >
        <div
          class="gallery-thumbnail"
          :class="{ 'active-thumbnail': image === activeImage }"
          @click="setActiveImage(image)"
        >
          <img
            :src="image"
            alt="Galéria náhľad"
            class="thumbnail-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  props: {
    images: {
      type: Array,
      required: true,
    },
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      activeImage: this.images[0],
    };
  },
  computed: {
    themeClass() {
      return this.isDarkTheme ? "dark-text" : "light-text";
    },
  },
  methods: {
    setActiveImage(image) {
      this.activeImage = image;
    },
  },
};
</script>

<style scoped>

.gallery-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.dark-text {
  color: #ffffff; 
}

.light-text {
  color: #000000; 
}


.main-image-container {
  position: relative;
}

.main-image-wrapper {
  display: inline-block;
  position: relative;
}

.main-image {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.download-button {
  top: 10px;
  right: 10px;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
}

.download-button:hover {
  background-color: #0056b3;
}

.download-button i {
  margin-right: 5px;
}


.gallery-thumbnail {
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.gallery-thumbnail:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.active-thumbnail {
  border: 2px solid #007bff;
}

.thumbnail-image {
  width: 100%;
  height: 60px;
  object-fit: cover;
}


@media (max-width: 768px) {
  .thumbnail-image {
    height: 50px;
  }
}

@media (max-width: 576px) {
  .thumbnail-image {
    height: 40px;
  }
}
</style>
