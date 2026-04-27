<template>
  <div class="d-flex justify-content-center align-items-center py-5" :aria-label="label" role="status">
    <div class="spinner-border" style="color:var(--rw-green)" :style="{ width: size, height: size }">
      <span class="visually-hidden">{{ label }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, default: 'Loading…' },
  size: { type: String, default: '2.5rem' }
})
</script>
