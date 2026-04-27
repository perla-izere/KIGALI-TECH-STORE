<template>
  <div class="container py-5">
    <h1 class="fw-bold mb-4"><i class="bi bi-cart3 me-2"></i>Shopping Cart</h1>
    <div v-if="cartStore.items.length === 0" class="text-center py-5">
      <i class="bi bi-cart-x fs-1 text-muted"></i>
      <p class="mt-3 text-muted fs-5">Your cart is empty.</p>
      <RouterLink to="/products" class="btn btn-primary px-4">
        <i class="bi bi-grid me-2"></i>Browse Products
      </RouterLink>
    </div>

    <div v-else class="row g-4">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
          <ul class="list-group list-group-flush">
            <li
              v-for="item in cartStore.items"
              :key="item.id"
              class="list-group-item p-3"
            >
              <div class="d-flex gap-3 align-items-center">
                <img :src="item.image" :alt="item.title" width="70" height="70" style="object-fit:contain" class="rounded bg-light p-1" />
                <div class="flex-grow-1 min-width-0">
                  <p class="fw-semibold mb-1 text-truncate">{{ item.title }}</p>
                  <small class="text-muted text-capitalize">{{ item.category }}</small>
                </div>
                <div class="text-end">
                  <p class="fw-bold text-primary mb-2">${{ (item.price * item.qty).toFixed(2) }}</p>
                  <div class="input-group input-group-sm" style="max-width:110px" aria-label="Quantity">
                    <button class="btn btn-outline-secondary" @click="cartStore.updateQty(item.id, item.qty - 1)" aria-label="Decrease">-</button>
                    <input
                      type="number"
                      class="form-control text-center"
                      :value="item.qty"
                      min="1"
                      @change="cartStore.updateQty(item.id, +$event.target.value)"
                      aria-label="Quantity"
                    />
                    <button class="btn btn-outline-secondary" @click="cartStore.updateQty(item.id, item.qty + 1)" aria-label="Increase">+</button>
                  </div>
                </div>
                <button
                  class="btn btn-sm btn-outline-danger ms-2"
                  @click="cartStore.remove(item.id)"
                  :aria-label="`Remove ${item.title}`"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </li>
          </ul>
        </div>
        <button class="btn btn-outline-danger btn-sm mt-3" @click="cartStore.clear()">
          <i class="bi bi-trash me-1"></i>Clear Cart
        </button>
      </div>
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-header fw-bold bg-dark text-white">Order Summary</div>
          <div class="card-body">
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal ({{ cartStore.count }} items)</span>
              <span>${{ cartStore.subtotal.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2 text-muted">
              <span>Tax (18% VAT)</span>
              <span>${{ cartStore.tax.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3 text-muted">
              <span>Shipping</span>
              <span>{{ cartStore.shipping === 0 ? 'FREE' : '$' + cartStore.shipping.toFixed(2) }}</span>
            </div>
            <hr />
            <div class="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>Total</span>
              <span class="text-primary">${{ cartStore.total.toFixed(2) }}</span>
            </div>
            <RouterLink to="/checkout" class="btn btn-primary w-100 fw-semibold">
              <i class="bi bi-lock me-2"></i>Proceed to Checkout
            </RouterLink>
            <RouterLink to="/products" class="btn btn-outline-secondary w-100 mt-2">
              Continue Shopping
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>
