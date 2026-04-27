<template>
  <div class="card h-100 product-card shadow-sm border-0" @click="goToDetail" :aria-label="`View ${product.title}`">
    <img
      :src="product.image"
      :alt="product.title"
      class="card-img-top"
      loading="lazy"
    />
    <div class="card-body d-flex flex-column">
      <span class="badge text-capitalize mb-2" style="background:var(--rw-green);width:fit-content">
        {{ product.category }}
      </span>
      <h6 class="card-title fw-semibold" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">
        {{ product.title }}
      </h6>

      <!-- Rating -->
      <div class="d-flex align-items-center gap-1 mb-2" :aria-label="`Rating: ${product.rating?.rate} out of 5`">
        <span class="stars">
          <i v-for="n in 5" :key="n"
            class="bi"
            :class="n <= Math.round(product.rating?.rate) ? 'bi-star-fill' : 'bi-star'"
          ></i>
        </span>
        <small class="text-muted">({{ product.rating?.count }})</small>
      </div>

      <div class="mt-auto d-flex align-items-center justify-content-between">
        <span class="fs-5 fw-bold text-primary">${{ product.price?.toFixed(2) }}</span>
        <div class="d-flex gap-2">
          <!-- Wishlist toggle -->
          <button
            class="btn btn-sm btn-outline-danger"
            @click.stop="wishlistStore.toggle(product)"
            :aria-label="wishlistStore.isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
          >
            <i class="bi" :class="wishlistStore.isWishlisted(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
          </button>
          <!-- Add to cart -->
          <button
            class="btn btn-sm btn-primary"
            @click.stop="addToCart"
            aria-label="Add to cart"
          >
            <i class="bi bi-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToastStore } from '@/stores/toast'

const props = defineProps({ product: { type: Object, required: true } })

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toastStore = useToastStore()

function goToDetail() {
  router.push({ name: 'ProductDetail', params: { id: props.product.id } })
}

function addToCart() {
  cartStore.add(props.product)
  toastStore.show(`"${props.product.title.slice(0, 30)}…" added to cart!`)
}
</script>
