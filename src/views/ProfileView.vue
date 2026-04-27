<template>
  <div class="card border-0 shadow-sm">
    <div class="card-header fw-bold bg-dark text-white">
      <i class="bi bi-person me-2"></i>Profile Details
    </div>
    <div class="card-body p-4">
      <div class="row g-3">
        <div class="col-sm-6">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-control" :value="authStore.user?.name" readonly />
        </div>
        <div class="col-sm-6">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" :value="authStore.user?.email" readonly />
        </div>
        <div class="col-sm-6">
          <label class="form-label">Location</label>
          <input type="text" class="form-control" value="Kigali, Rwanda" readonly />
        </div>
        <div class="col-sm-6">
          <label class="form-label">Member Since</label>
          <input type="text" class="form-control" :value="new Date().toLocaleDateString()" readonly />
        </div>
      </div>
      <div class="mt-4 p-3 rounded-3" style="background:var(--rw-light)">
        <div class="row text-center g-3">
          <div class="col-4">
            <div class="fw-bold fs-4 text-primary">{{ authStore.orders.length }}</div>
            <small class="text-muted">Orders</small>
          </div>
          <div class="col-4">
            <div class="fw-bold fs-4 text-primary">{{ wishlistStore.count }}</div>
            <small class="text-muted">Wishlist</small>
          </div>
          <div class="col-4">
            <div class="fw-bold fs-4 text-primary">{{ cartStore.count }}</div>
            <small class="text-muted">In Cart</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
</script>
