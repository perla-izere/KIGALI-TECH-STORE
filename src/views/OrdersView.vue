<template>
  <div class="card border-0 shadow-sm">
    <div class="card-header fw-bold bg-dark text-white">
      <i class="bi bi-bag me-2"></i>My Orders
    </div>
    <div class="card-body">
      <div v-if="authStore.orders.length === 0" class="text-center py-5 text-muted">
        <i class="bi bi-bag-x fs-1"></i>
        <p class="mt-3">No orders yet.</p>
        <RouterLink to="/products" class="btn btn-primary btn-sm">Start Shopping</RouterLink>
      </div>
      <div v-else class="accordion" id="ordersAccordion">
        <div
          v-for="(order, i) in authStore.orders"
          :key="order.id"
          class="accordion-item border-0 mb-2 shadow-sm rounded-2 overflow-hidden"
        >
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#order-${i}`"
            >
              <div class="d-flex justify-content-between w-100 pe-3">
                <span>Order #{{ String(order.id).slice(-6) }}</span>
                <span class="text-muted fw-normal small">{{ new Date(order.date).toLocaleDateString() }}</span>
                <span class="text-primary fw-bold">${{ order.total?.toFixed(2) }}</span>
              </div>
            </button>
          </h2>
          <div :id="`order-${i}`" class="accordion-collapse collapse" data-bs-parent="#ordersAccordion">
            <div class="accordion-body bg-light">
              <p class="small text-muted mb-2"><i class="bi bi-geo-alt me-1"></i>{{ order.address }}</p>
              <ul class="list-group list-group-flush">
                <li
                  v-for="item in order.items"
                  :key="item.id"
                  class="list-group-item bg-transparent d-flex gap-2 align-items-center small"
                >
                  <img :src="item.image" width="32" height="32" style="object-fit:contain" class="bg-white rounded p-1" :alt="item.title" />
                  <span class="flex-grow-1 text-truncate">{{ item.title }}</span>
                  <span class="text-muted">×{{ item.qty }}</span>
                  <span class="fw-semibold">${{ (item.price * item.qty).toFixed(2) }}</span>
                </li>
              </ul>
              <p class="mb-0 mt-2 text-end fw-bold small">Total: ${{ order.total?.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>
