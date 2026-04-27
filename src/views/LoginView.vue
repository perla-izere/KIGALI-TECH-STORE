<template>
  <div class="container py-5 d-flex justify-content-center">
    <div class="card border-0 shadow-sm w-100" style="max-width:420px">
      <div class="card-body p-4">
        <h1 class="fw-bold mb-1 fs-3">Welcome back</h1>
        <p class="text-muted mb-4">Sign in to your Kigali Tech Store account</p>

        <div v-if="errorMsg" class="alert alert-danger py-2" role="alert">{{ errorMsg }}</div>

        <div class="mb-3">
          <label class="form-label" for="email">Email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-control"
            placeholder="you@example.com"
            autocomplete="email"
            required
          />
        </div>
        <div class="mb-4">
          <label class="form-label" for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-control"
            placeholder="••••••••"
            autocomplete="current-password"
            @keyup.enter="submit"
            required
          />
        </div>
        <button class="btn btn-primary w-100 fw-semibold py-2" @click="submit" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Signing in…' : 'Sign In' }}
        </button>

        <p class="text-center mt-3 text-muted small">
          Don't have an account?
          <RouterLink to="/register" class="text-primary fw-semibold">Create one</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function submit() {
  errorMsg.value = ''
  loading.value = true
  try {
    await authStore.login(email.value, password.value)
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (e) {
    errorMsg.value = e.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
