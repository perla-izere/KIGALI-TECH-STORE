import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref(JSON.parse(localStorage.getItem('kts_wishlist') || '[]'))

  const count = computed(() => items.value.length)
  const ids = computed(() => items.value.map(i => i.id))

  function toggle(product) {
    const idx = items.value.findIndex(i => i.id === product.id)
    if (idx === -1) items.value.push(product)
    else items.value.splice(idx, 1)
  }

  function isWishlisted(productId) {
    return ids.value.includes(productId)
  }

  function remove(productId) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  watch(items, val => localStorage.setItem('kts_wishlist', JSON.stringify(val)), { deep: true })

  return { items, count, ids, toggle, isWishlisted, remove }
})
