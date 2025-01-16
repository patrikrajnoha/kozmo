<template>
  <footer :class="['footer py-4', footerClass]">
    <div class="container">
      <div class="row">
     
        <div class="col-12 col-md-4 text-center mb-3">
          <RouterLink to="/">
            <img
              :src="isDarkTheme ? '/img/logo.png' : '/img/logo2.png'"
              alt="Kozmo Logo"
              class="img-fluid"
              style="max-height: 40px;"
            />
          </RouterLink>
        </div>

       
        <div class="col-12 col-md-4 text-center mb-3">
          <h5 class="footer-title">Navigácia</h5>
          <ul class="list-unstyled">
            <li><RouterLink to="/" class="footer-link">Domov</RouterLink></li>
            <li><RouterLink to="/events" class="footer-link">Udalosti</RouterLink></li>
            <li><RouterLink to="/blog" class="footer-link">Blog</RouterLink></li>
            <li><RouterLink to="/shop" class="footer-link">Obchod</RouterLink></li>
          </ul>
        </div>

     
        <div class="col-12 col-md-4 text-center">
          <h5 class="footer-title">Sledujte nás</h5>
          <div class="d-flex justify-content-center gap-3">
            <a href="https://www.facebook.com" target="_blank" class="social-icon">
              <i class="mdi mdi-facebook"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" class="social-icon">
              <i class="mdi mdi-instagram"></i>
            </a>
            <a href="https://www.x.com" target="_blank" class="social-icon">
              <i class="mdi mdi-twitter"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" class="social-icon">
              <i class="mdi mdi-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="text-center mt-3 footer-bottom">
        © 2025 Kozmo - Všetky práva vyhradené
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    isDarkTheme: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    footerClass() {
      return this.isDarkTheme ? "bg-dark text-white" : "bg-light text-dark";
    },
  },
};
</script>

<style scoped>

.footer-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}


.footer-link {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #ff9800;
}


.social-icon {
  font-size: 24px;
  color: inherit;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #ff9800;
}


.footer-bottom {
  font-size: 12px;
}
</style>
