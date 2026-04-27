<template>
  <div id="app-wrapper">
    <AppNavbar />
    <div class="accent-bar"></div>

    <main style="min-height: 70vh;">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />

    <!-- Global Toast -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="toast show align-items-center border-0"
        :class="`text-bg-${toast.type}`"
        role="alert"
        aria-live="assertive"
      >
        <div class="d-flex">
          <div class="toast-body fw-semibold">{{ toast.message }}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            aria-label="Close"
            @click="toastStore.remove(toast.id)"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useToastStore } from '@/stores/toast'
const toastStore = useToastStore()
</script>
