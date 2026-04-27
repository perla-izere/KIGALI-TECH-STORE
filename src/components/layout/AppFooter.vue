<template>
  <footer class="bg-dark text-light py-4 mt-5">
    <div class="container">
      <div class="row gy-3">
        <div class="col-md-4">
          <h6 class="fw-bold text-warning">
            <i class="bi bi-cpu-fill me-2"></i>Kigali Tech Store
          </h6>
          <p class="text-secondary small mb-0">
            Your go-to source for affordable tech gadgets and electronics in Rwanda.
          </p>
        </div>
        <div class="col-md-4">
          <h6 class="fw-bold">Quick Links</h6>
          <ul class="list-unstyled small">
            <li><RouterLink class="text-secondary text-decoration-none" to="/">Home</RouterLink></li>
            <li><RouterLink class="text-secondary text-decoration-none" to="/products">Products</RouterLink></li>
            <li><RouterLink class="text-secondary text-decoration-none" to="/cart">Cart</RouterLink></li>
            <li><RouterLink class="text-secondary text-decoration-none" to="/wishlist">Wishlist</RouterLink></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h6 class="fw-bold">Contact</h6>
          <p class="text-secondary small mb-1"><i class="bi bi-geo-alt me-1"></i>KG 123 St, Kigali, Rwanda</p>
          <p class="text-secondary small mb-1"><i class="bi bi-telephone me-1"></i>+250 788 000 000</p>
          <p class="text-secondary small"><i class="bi bi-envelope me-1"></i>hello@kigalitechstore.rw</p>
        </div>
      </div>
      <hr class="border-secondary mt-3 mb-2" />
      <p class="text-secondary text-center small mb-0">
        &copy; {{ new Date().getFullYear() }} Kigali Tech Store. Built with Vue 3 &amp; Bootstrap 5.
      </p>
    </div>
  </footer>
</template>
