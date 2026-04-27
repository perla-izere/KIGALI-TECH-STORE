<template>
  <div class="container py-5">
    <div class="row g-4">
      <!-- Sidebar -->
      <div class="col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body text-center py-4">
            <img
              :src="authStore.user?.avatar"
              width="72" height="72"
              class="rounded-circle mb-3"
              :alt="`${authStore.user?.name} avatar`"
            />
            <h6 class="fw-bold mb-0">{{ authStore.user?.name }}</h6>
            <small class="text-muted">{{ authStore.user?.email }}</small>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item p-0">
              <RouterLink to="/profile" exact-active-class="active text-white" class="list-group-item list-group-item-action border-0">
                <i class="bi bi-person me-2"></i>Profile
              </RouterLink>
            </li>
            <li class="list-group-item p-0">
              <RouterLink to="/profile/orders" active-class="active text-white" class="list-group-item list-group-item-action border-0">
                <i class="bi bi-bag me-2"></i>My Orders
              </RouterLink>
            </li>
            <li class="list-group-item p-0">
              <RouterLink to="/wishlist" class="list-group-item list-group-item-action border-0">
                <i class="bi bi-heart me-2"></i>Wishlist
              </RouterLink>
            </li>
            <li class="list-group-item p-0">
              <button class="list-group-item list-group-item-action border-0 text-danger w-100 text-start" @click="logout">
                <i class="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Content -->
      <div class="col-md-9">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()
function logout() { authStore.logout(); router.push('/') }
</script>
