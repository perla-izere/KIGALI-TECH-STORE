<template>
  <div class="container py-5 d-flex justify-content-center">
    <div class="card border-0 shadow-sm w-100" style="max-width:420px">
      <div class="card-body p-4">
        <h1 class="fw-bold mb-1 fs-3">Create Account</h1>
        <p class="text-muted mb-4">Join Kigali Tech Store today</p>

        <div v-if="errorMsg" class="alert alert-danger py-2" role="alert">{{ errorMsg }}</div>

        <div class="mb-3">
          <label class="form-label" for="name">Full Name</label>
          <input id="name" v-model="name" type="text" class="form-control" placeholder="Jean Mutabazi" required />
        </div>
        <div class="mb-3">
          <label class="form-label" for="reg-email">Email address</label>
          <input id="reg-email" v-model="email" type="email" class="form-control" placeholder="you@example.com" required />
        </div>
        <div class="mb-4">
          <label class="form-label" for="reg-password">Password</label>
          <input id="reg-password" v-model="password" type="password" class="form-control" placeholder="Min 6 characters" @keyup.enter="submit" required />
        </div>
        <button class="btn btn-primary w-100 fw-semibold py-2" @click="submit" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Creating Account…' : 'Create Account' }}
        </button>

        <p class="text-center mt-3 text-muted small">
          Already have an account?
          <RouterLink to="/login" class="text-primary fw-semibold">Sign in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function submit() {
  errorMsg.value = ''
  if (password.value.length < 6) { errorMsg.value = 'Password must be at least 6 characters.'; return }
  loading.value = true
  try {
    await authStore.register(name.value, email.value, password.value)
    router.push('/')
  } catch (e) {
    errorMsg.value = e.message || 'Registration failed.'
  } finally {
    loading.value = false
  }
}
</script>
