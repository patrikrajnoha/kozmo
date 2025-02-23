import { defineStore } from "pinia";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [
      {
        id: 1,
        name: "Teleskop",
        description: "Vysokokvalitný teleskop pre pozorovanie hviezd.",
        price: 199.99,
        image: "/img/products/telescope.png",
        category: "Teleskopy",
        inStock: true,
        slug: "teleskop",
      },
      {
        id: 2,
        name: "Astronomický atlas",
        description: "Kompletný atlas hviezdnej oblohy.",
        price: 39.99,
        image: "/img/products/atlas.png",
        category: "Knihy",
        inStock: true,
        slug: "astronomicky-atlas",
      },
      {
        id: 3,
        name: "Model slnečnej sústavy",
        description: "Model slnečnej sústavy s detailnými planétami.",
        price: 59.99,
        image: "/img/products/solar-system.png",
        category: "Modely",
        inStock: false,
        slug: "model-slnecnej-sustavy",
      },
      {
        id: 4,
        name: "Hviezdna mapa",
        description: "Dekoratívna mapa s vyobrazením nočnej oblohy.",
        price: 29.99,
        image: "/img/products/star-map.png",
        category: "Dekorácie",
        inStock: true,
        slug: "hviezdna-mapa",
      },
      {
        id: 5,
        name: "Astrofotografická kamera",
        description: "Špeciálna kamera pre astrofotografiu.",
        price: 499.99,
        image: "/img/products/astro-camera.png",
        category: "Kamery",
        inStock: true,
        slug: "astrofotograficka-kamera",
      },
      {
        id: 6,
        name: "Lunárne hodiny",
        description: "Hodiny zobrazujúce aktuálnu fázu mesiaca.",
        price: 69.99,
        image: "/img/products/lunar-clock.png",
        category: "Gadgety",
        inStock: true,
        slug: "lunarne-hodiny",
      },
      {
        id: 7,
        name: "Vesmírne puzzle",
        description: "1000-dielne puzzle s témou galaxie.",
        price: 19.99,
        image: "/img/products/space-puzzle.png",
        category: "Hry",
        inStock: false,
        slug: "vesmirne-puzzle",
      },
      {
        id: 8,
        name: "Meteorický prach",
        description: "Pravý meteorický prach v sklenenej ampulke.",
        price: 89.99,
        image: "/img/products/meteor-dust.png",
        category: "Zberateľské predmety",
        inStock: true,
        slug: "meteoricky-prach",
      },
      {
        id: 9,
        name: "Planetárny projektor",
        description: "Projektor premietajúci nočnú oblohu na stenu.",
        price: 119.99,
        image: "/img/products/planet-projector.png",
        category: "Gadgety",
        inStock: false,
        slug: "planetarny-projektor",
      },
    ],
  }),
  getters: {
    allProducts: (state) => state.products,
    availableProducts: (state) => state.products.filter((product) => product.inStock),
    productsByCategory: (state) => (category) =>
      state.products.filter((product) => product.category === category),
    productBySlug: (state) => (slug) =>
      state.products.find((product) => product.slug === slug),
  },
  actions: {
    addProduct(product) {
      this.products.push(product);
    },
    removeProduct(id) {
      this.products = this.products.filter((product) => product.id !== id);
    },
    updateProduct(updatedProduct) {
      const index = this.products.findIndex((product) => product.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
    },
  },
});
