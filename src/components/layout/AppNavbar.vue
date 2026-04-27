<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" aria-label="Main navigation">
    <div class="container">
      <!-- Brand -->
      <RouterLink class="navbar-brand fw-bold fs-5" to="/">
        <i class="bi bi-cpu-fill me-2" aria-hidden="true"></i>
        Kigali <span>Tech Store</span>
      </RouterLink>

      <!-- Mobile toggle -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
        aria-controls="navMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMenu">
        <!-- Search -->
        <form class="d-flex mx-auto my-2 my-lg-0" style="max-width:340px;width:100%" @submit.prevent="doSearch" role="search">
          <input
            v-model="searchQuery"
            class="form-control form-control-sm rounded-start-pill"
            type="search"
            placeholder="Search products…"
            aria-label="Search products"
          />
          <button class="btn btn-warning btn-sm rounded-end-pill px-3" type="submit" aria-label="Submit search">
            <i class="bi bi-search" aria-hidden="true"></i>
          </button>
        </form>

        <!-- Nav links -->
        <ul class="navbar-nav ms-auto align-items-lg-center gap-1">
          <li class="nav-item">
            <RouterLink class="nav-link" :to="{ name: 'Products' }" active-class="active">
              <i class="bi bi-grid me-1" aria-hidden="true"></i>Products
            </RouterLink>
          </li>

          <!-- Wishlist -->
          <li class="nav-item">
            <RouterLink class="nav-link position-relative" to="/wishlist" aria-label="Wishlist">
              <i class="bi bi-heart" aria-hidden="true"></i>
              <span v-if="wishlistStore.count > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ wishlistStore.count }}
              </span>
            </RouterLink>
          </li>

          <!-- Cart -->
          <li class="nav-item">
            <RouterLink class="nav-link position-relative" to="/cart" aria-label="Shopping cart">
              <i class="bi bi-cart3" aria-hidden="true"></i>
              <span v-if="cartStore.count > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill" style="background:var(--rw-yellow);color:#000;">
                {{ cartStore.count }}
              </span>
            </RouterLink>
          </li>

          <!-- Auth -->
          <li v-if="!authStore.isLoggedIn" class="nav-item">
            <RouterLink class="btn btn-outline-light btn-sm" to="/login">Login</RouterLink>
          </li>
          <li v-else class="nav-item dropdown">
            <a class="nav-link dropdown-toggle d-flex align-items-center gap-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img :src="authStore.user?.avatar" width="28" height="28" class="rounded-circle" alt="User avatar" />
              {{ authStore.user?.name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><RouterLink class="dropdown-item" to="/profile"><i class="bi bi-person me-2"></i>Profile</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/profile/orders"><i class="bi bi-bag me-2"></i>Orders</RouterLink></li>
              <li><hr class="dropdown-divider" /></li>
              <li><button class="dropdown-item text-danger" @click="logout"><i class="bi bi-box-arrow-right me-2"></i>Logout</button></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useAuthStore } from '@/stores/auth'
import { useProductsStore } from '@/stores/products'

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()
const productsStore = useProductsStore()

const searchQuery = ref('')

function doSearch() {
  productsStore.search = searchQuery.value
  router.push({ name: 'Products' })
}

function logout() {
  authStore.logout()
  router.push('/')
}
</script>
