<template>
  <div v-if="!isConsentGiven" class="cookie-consent">
    <div class="cookie-message">
      <div class="cookie-icon">
        
        <img src="/img/cookie-icon.svg" alt="Cookie Icon" />
      </div>
      <p>
        Táto stránka používa cookies na zlepšenie vášho používateľského zážitku.
        Pokračovaním súhlasíte s používaním cookies.
      </p>
      <button @click="acceptCookies" class="accept-button">Súhlasím</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CookieConsent",
  data() {
    return {
      isConsentGiven: false, 
    };
  },
  mounted() {
   
    this.isConsentGiven = localStorage.getItem("cookiesAccepted") === "true";
  },
  methods: {
    acceptCookies() {
     
      localStorage.setItem("cookiesAccepted", "true");
      this.isConsentGiven = true; 
    },
  },
};
</script>

<style scoped>
.cookie-consent {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: #333;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cookie-message {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cookie-icon img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.cookie-message p {
  margin: 0;
  font-size: 1rem;
  flex: 1;
}

.accept-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-left: 15px;
}

.accept-button:hover {
  background: #0056b3;
}
</style>
