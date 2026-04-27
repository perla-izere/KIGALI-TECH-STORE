<template>
  <div class="container py-5">
    <LoadingSpinner v-if="loading" />

    <div v-else-if="!product" class="text-center py-5">
      <i class="bi bi-exclamation-circle fs-1 text-muted"></i>
      <p class="mt-3">Product not found.</p>
      <RouterLink to="/products" class="btn btn-primary">Back to Products</RouterLink>
    </div>

    <div v-else>
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><RouterLink to="/">Home</RouterLink></li>
          <li class="breadcrumb-item"><RouterLink to="/products">Products</RouterLink></li>
          <li class="breadcrumb-item active text-capitalize" aria-current="page">{{ product.category }}</li>
        </ol>
      </nav>

      <div class="row g-5">
        <!-- Image -->
        <div class="col-md-5 text-center">
          <div class="bg-light rounded-3 p-4">
            <img :src="product.image" :alt="product.title" class="img-fluid" style="max-height:360px;object-fit:contain" />
          </div>
        </div>

        <!-- Info -->
        <div class="col-md-7">
          <span class="badge text-capitalize mb-2" style="background:var(--rw-green)">{{ product.category }}</span>
          <h1 class="fs-3 fw-bold mb-3">{{ product.title }}</h1>

          <!-- Rating -->
          <div class="d-flex align-items-center gap-2 mb-3" :aria-label="`Rated ${product.rating?.rate} out of 5`">
            <span class="stars">
              <i v-for="n in 5" :key="n" class="bi" :class="n <= Math.round(product.rating?.rate) ? 'bi-star-fill' : 'bi-star'"></i>
            </span>
            <span class="text-muted">{{ product.rating?.rate }} ({{ product.rating?.count }} reviews)</span>
          </div>

          <p class="fs-2 fw-bold text-primary mb-3">${{ product.price?.toFixed(2) }}</p>
          <p class="text-muted lh-lg mb-4">{{ product.description }}</p>

          <!-- Qty + Actions -->
          <div class="d-flex align-items-center gap-3 flex-wrap">
            <div class="input-group" style="max-width:130px" aria-label="Quantity selector">
              <button class="btn btn-outline-secondary" @click="qty > 1 && qty--" aria-label="Decrease quantity">-</button>
              <input type="number" class="form-control text-center" v-model.number="qty" min="1" max="99" aria-label="Quantity" />
              <button class="btn btn-outline-secondary" @click="qty++" aria-label="Increase quantity">+</button>
            </div>

            <button class="btn btn-primary flex-grow-1" @click="addToCart" aria-label="Add to cart">
              <i class="bi bi-cart-plus me-2"></i>Add to Cart
            </button>

            <button
              class="btn"
              :class="wishlistStore.isWishlisted(product.id) ? 'btn-danger' : 'btn-outline-danger'"
              @click="wishlistStore.toggle(product)"
              :aria-label="wishlistStore.isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'"
            >
              <i class="bi" :class="wishlistStore.isWishlisted(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
            </button>
          </div>

          <div class="mt-4 p-3 bg-light rounded-3 small text-muted">
            <i class="bi bi-truck me-2"></i>Free delivery on orders over $50 across Rwanda<br/>
            <i class="bi bi-shield-check me-2 mt-2"></i>1-year manufacturer warranty
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToastStore } from '@/stores/toast'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const props = defineProps({ id: { type: String, required: true } })

const productsStore = useProductsStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toastStore = useToastStore()

const product = ref(null)
const loading = ref(true)
const qty = ref(1)

onMounted(async () => {
  product.value = await productsStore.fetchOne(props.id)
  loading.value = false
})

function addToCart() {
  cartStore.add(product.value, qty.value)
  toastStore.show(`Added ${qty.value}× "${product.value.title.slice(0, 25)}…" to cart!`)
}
</script>
