import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const BASE = 'https://fakestoreapi.com'

export const useProductsStore = defineStore('products', () => {
  const all = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Filters
  const search = ref('')
  const activeCategory = ref('')
  const sortBy = ref('default')
  const priceRange = ref([0, 1000])

  const filtered = computed(() => {
    let result = [...all.value]

    if (activeCategory.value)
      result = result.filter(p => p.category === activeCategory.value)

    if (search.value.trim())
      result = result.filter(p =>
        p.title.toLowerCase().includes(search.value.toLowerCase()))

    result = result.filter(p =>
      p.price >= priceRange.value[0] && p.price <= priceRange.value[1])

    if (sortBy.value === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (sortBy.value === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortBy.value === 'rating')     result.sort((a, b) => b.rating.rate - a.rating.rate)

    return result
  })

  async function fetchAll() {
    if (all.value.length) return   // already loaded
    loading.value = true
    error.value = null
    try {
      const [products, cats] = await Promise.all([
        axios.get(`${BASE}/products`),
        axios.get(`${BASE}/products/categories`)
      ])
      all.value = products.data
      categories.value = cats.data
    } catch (e) {
      error.value = 'Failed to load products. Please try again.'
    } finally {
      loading.value = false
    }
  }

  async function fetchByCategory(category) {
    loading.value = true
    error.value = null
    try {
      const { data } = await axios.get(`${BASE}/products/category/${category}`)
      all.value = data
    } catch (e) {
      error.value = 'Failed to load category.'
    } finally {
      loading.value = false
    }
  }

  async function fetchOne(id) {
    try {
      const { data } = await axios.get(`${BASE}/products/${id}`)
      return data
    } catch {
      return null
    }
  }

  return {
    all, categories, loading, error,
    search, activeCategory, sortBy, priceRange, filtered,
    fetchAll, fetchByCategory, fetchOne
  }
})
