<template>
  <div class="container text-center py-5" style="max-width:500px">
    <div style="font-size:7rem;line-height:1" class="fw-bold text-primary opacity-25">404</div>
    <h1 class="fw-bold mt-2 mb-3">Page Not Found</h1>
    <p class="text-muted mb-4">
      Hmm, looks like this page doesn't exist in Kigali or anywhere else. Let's get you back on track.
    </p>
    <div class="d-flex justify-content-center gap-3 flex-wrap">
      <button class="btn btn-outline-secondary" @click="$router.back()">
        <i class="bi bi-arrow-left me-2"></i>Go Back
      </button>
      <RouterLink to="/" class="btn btn-primary px-4">
        <i class="bi bi-house me-2"></i>Home
      </RouterLink>
    </div>
  </div>
</template>
