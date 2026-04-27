<template>
  <div>
    <!-- Hero Banner -->
    <section class="hero-section d-flex align-items-center text-white" aria-label="Hero banner">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <span class="badge mb-3 px-3 py-2" style="background:var(--rw-yellow);color:#000;font-size:.85rem">
              🇷🇼 Made for Kigali
            </span>
            <h1 class="display-4 fw-bold mb-3">Tech That Moves <br/><span style="color:var(--rw-yellow)">Rwanda Forward</span></h1>
            <p class="lead mb-4 text-white-50">
              Smartphones, laptops, and accessories at unbeatable prices. Delivered across Rwanda.
            </p>
            <div class="d-flex gap-3 flex-wrap">
              <RouterLink to="/products" class="btn btn-warning btn-lg fw-semibold px-4">
                <i class="bi bi-grid me-2"></i>Shop Now
              </RouterLink>
              <RouterLink to="/register" class="btn btn-outline-light btn-lg px-4">
                Create Account
              </RouterLink>
            </div>
          </div>
          <div class="col-lg-5 text-center mt-4 mt-lg-0">
            <i class="bi bi-laptop" style="font-size:9rem;color:var(--rw-yellow);opacity:.8" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <div style="background:var(--rw-green)" class="text-white py-3">
      <div class="container">
        <div class="row text-center gy-2">
          <div class="col-6 col-md-3"><i class="bi bi-truck me-2"></i>Free Shipping over $50</div>
          <div class="col-6 col-md-3"><i class="bi bi-shield-check me-2"></i>1-Year Warranty</div>
          <div class="col-6 col-md-3"><i class="bi bi-arrow-return-left me-2"></i>30-Day Returns</div>
          <div class="col-6 col-md-3"><i class="bi bi-headset me-2"></i>24/7 Support</div>
        </div>
      </div>
    </div>

    <!-- Categories -->
    <section class="container py-5" aria-labelledby="categories-heading">
      <h2 id="categories-heading" class="fw-bold mb-4">Shop by Category</h2>
      <LoadingSpinner v-if="productsStore.loading" />
      <div v-else class="row g-3">
        <div
          v-for="cat in productsStore.categories"
          :key="cat"
          class="col-6 col-md-3"
        >
          <div
            class="card text-center border-0 shadow-sm h-100 product-card"
            style="cursor:pointer"
            @click="goToCategory(cat)"
            :aria-label="`Browse ${cat}`"
            tabindex="0"
            @keyup.enter="goToCategory(cat)"
            role="button"
          >
            <div class="card-body py-4">
              <i class="bi fs-1 mb-3 text-primary" :class="categoryIcon(cat)" aria-hidden="true"></i>
              <p class="fw-semibold text-capitalize mb-0">{{ cat }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="container pb-5" aria-labelledby="featured-heading">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 id="featured-heading" class="fw-bold mb-0">Featured Products</h2>
        <RouterLink to="/products" class="btn btn-outline-primary btn-sm">View All</RouterLink>
      </div>
      <LoadingSpinner v-if="productsStore.loading" />
      <div v-else class="row g-4">
        <div
          v-for="product in featured"
          :key="product.id"
          class="col-6 col-md-4 col-lg-3"
        >
          <ProductCard :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ui/ProductCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const router = useRouter()
const productsStore = useProductsStore()

onMounted(() => productsStore.fetchAll())

const featured = computed(() => productsStore.all.slice(0, 8))

function goToCategory(cat) {
  productsStore.activeCategory = cat
  router.push({ name: 'Products' })
}

function categoryIcon(cat) {
  const icons = {
    "electronics": "bi-phone",
    "jewelery": "bi-gem",
    "men's clothing": "bi-person",
    "women's clothing": "bi-bag-heart"
  }
  return icons[cat] || 'bi-box'
}
</script>
