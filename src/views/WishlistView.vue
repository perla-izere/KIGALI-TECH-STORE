<template>
  <div class="container py-5">
    <h1 class="fw-bold mb-4"><i class="bi bi-heart me-2"></i>My Wishlist</h1>

    <div v-if="wishlistStore.items.length === 0" class="text-center py-5">
      <i class="bi bi-heart fs-1 text-muted"></i>
      <p class="mt-3 text-muted fs-5">Your wishlist is empty.</p>
      <RouterLink to="/products" class="btn btn-primary px-4">Discover Products</RouterLink>
    </div>

    <div v-else class="row g-4">
      <div
        v-for="item in wishlistStore.items"
        :key="item.id"
        class="col-sm-6 col-md-4 col-lg-3"
      >
        <div class="card h-100 border-0 shadow-sm product-card">
          <img :src="item.image" :alt="item.title" class="card-img-top" loading="lazy" />
          <div class="card-body d-flex flex-column">
            <h6 class="fw-semibold" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">
              {{ item.title }}
            </h6>
            <p class="fw-bold text-primary mt-auto mb-2">${{ item.price?.toFixed(2) }}</p>
            <div class="d-flex gap-2">
              <button class="btn btn-primary btn-sm flex-grow-1" @click="moveToCart(item)">
                <i class="bi bi-cart-plus me-1"></i>Move to Cart
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="wishlistStore.remove(item.id)" :aria-label="`Remove ${item.title}`">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import { useToastStore } from '@/stores/toast'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const toastStore = useToastStore()

function moveToCart(item) {
  cartStore.add(item)
  wishlistStore.remove(item.id)
  toastStore.show(`Moved "${item.title.slice(0, 25)}…" to cart!`)
}
</script>
