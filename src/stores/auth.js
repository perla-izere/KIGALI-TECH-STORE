import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('kts_token') || null)
  const user = ref(JSON.parse(localStorage.getItem('kts_user') || 'null'))
  const orders = ref(JSON.parse(localStorage.getItem('kts_orders') || '[]'))

  const isLoggedIn = computed(() => !!token.value)

  // Mock login – in real app, call your backend
  async function login(email, password) {
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 800))

    // Accept any email/password for demo
    if (!email || !password) throw new Error('Email and password required')

    const fakeToken = btoa(`${email}:${Date.now()}`)
    const fakeUser = {
      id: 1,
      name: email.split('@')[0],
      email,
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=20603D&color=FAD201`
    }
    token.value = fakeToken
    user.value = fakeUser
  }

  // Mock register
  async function register(name, email, password) {
    await new Promise(r => setTimeout(r, 800))
    if (!name || !email || !password) throw new Error('All fields required')
    const fakeToken = btoa(`${email}:${Date.now()}`)
    token.value = fakeToken
    user.value = {
      id: 1,
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=20603D&color=FAD201`
    }
  }

  function logout() {
    token.value = null
    user.value = null
  }

  function addOrder(order) {
    orders.value.unshift({ ...order, id: Date.now(), date: new Date().toISOString() })
  }

  // Persist
  watch(token, val => val
    ? localStorage.setItem('kts_token', val)
    : localStorage.removeItem('kts_token'))

  watch(user, val => val
    ? localStorage.setItem('kts_user', JSON.stringify(val))
    : localStorage.removeItem('kts_user'), { deep: true })

  watch(orders, val => localStorage.setItem('kts_orders', JSON.stringify(val)), { deep: true })

  return { token, user, orders, isLoggedIn, login, register, logout, addOrder }
})
