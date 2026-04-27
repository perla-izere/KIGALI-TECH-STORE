<template>
  <div class="container py-4">
    <h1 class="fw-bold mb-4">All Products</h1>

    <!-- Filters row -->
    <div class="row g-3 mb-4 align-items-end">
      <!-- Category filter -->
      <div class="col-sm-6 col-md-3">
        <label class="form-label fw-semibold" for="cat-select">Category</label>
        <select id="cat-select" class="form-select" v-model="productsStore.activeCategory" @change="productsStore.fetchAll()">
          <option value="">All Categories</option>
          <option v-for="cat in productsStore.categories" :key="cat" :value="cat" class="text-capitalize">
            {{ cat }}
          </option>
        </select>
      </div>

      <!-- Sort -->
      <div class="col-sm-6 col-md-3">
        <label class="form-label fw-semibold" for="sort-select">Sort By</label>
        <select id="sort-select" class="form-select" v-model="productsStore.sortBy">
          <option value="default">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <!-- Search -->
      <div class="col-md-4">
        <label class="form-label fw-semibold" for="search-input">Search</label>
        <input
          id="search-input"
          type="search"
          class="form-control"
          placeholder="Search products…"
          v-model="productsStore.search"
          aria-label="Search products"
        />
      </div>

      <!-- Results count -->
      <div class="col-md-2 text-muted text-end align-self-end">
        {{ productsStore.filtered.length }} results
      </div>
    </div>

    <!-- Loading / Error -->
    <LoadingSpinner v-if="productsStore.loading" />

    <div v-else-if="productsStore.error" class="alert alert-danger" role="alert">
      <i class="bi bi-exclamation-triangle me-2"></i>{{ productsStore.error }}
    </div>

    <!-- Empty state -->
    <div v-else-if="productsStore.filtered.length === 0" class="text-center py-5">
      <i class="bi bi-search fs-1 text-muted"></i>
      <p class="mt-3 text-muted">No products found. Try adjusting your filters.</p>
      <button class="btn btn-outline-primary" @click="clearFilters">Clear Filters</button>
    </div>

    <!-- Product grid -->
    <div v-else class="row g-4">
      <div
        v-for="product in productsStore.filtered"
        :key="product.id"
        class="col-6 col-md-4 col-lg-3"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ui/ProductCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const productsStore = useProductsStore()

onMounted(() => productsStore.fetchAll())

function clearFilters() {
  productsStore.search = ''
  productsStore.activeCategory = ''
  productsStore.sortBy = 'default'
}
</script>
