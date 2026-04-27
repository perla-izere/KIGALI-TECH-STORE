import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State — load from localStorage on init
  const items = ref(JSON.parse(localStorage.getItem('kts_cart') || '[]'))

  // Getters
  const count = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
  const subtotal = computed(() => items.value.reduce((sum, i) => sum + i.price * i.qty, 0))
  const tax = computed(() => subtotal.value * 0.18)          // 18% VAT (Rwanda rate)
  const shipping = computed(() => subtotal.value > 50 ? 0 : 5.99)
  const total = computed(() => subtotal.value + tax.value + shipping.value)

  // Actions
  function add(product, qty = 1) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({ ...product, qty })
    }
  }

  function remove(productId) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  function updateQty(productId, qty) {
    const item = items.value.find(i => i.id === productId)
    if (item) {
      if (qty <= 0) remove(productId)
      else item.qty = qty
    }
  }

  function clear() {
    items.value = []
  }

  // Persist to localStorage
  watch(items, val => localStorage.setItem('kts_cart', JSON.stringify(val)), { deep: true })

  return { items, count, subtotal, tax, shipping, total, add, remove, updateQty, clear }
})
