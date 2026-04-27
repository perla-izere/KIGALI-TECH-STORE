<template>
  <div class="container py-5 text-center" style="max-width:560px">
    <div class="card border-0 shadow-sm p-5">
      <div class="mb-4">
        <i class="bi bi-check-circle-fill text-success" style="font-size:5rem"></i>
      </div>
      <h1 class="fw-bold mb-2">Order Placed!</h1>
      <p class="text-muted mb-4">
        Thank you for shopping at <strong>Kigali Tech Store</strong>. Your order has been received and will be delivered across Rwanda within 2–5 business days.
      </p>
      <div class="d-flex justify-content-center gap-3 flex-wrap">
        <RouterLink to="/profile/orders" class="btn btn-primary px-4">
          <i class="bi bi-bag me-2"></i>View Orders
        </RouterLink>
        <RouterLink to="/products" class="btn btn-outline-secondary px-4">
          Continue Shopping
        </RouterLink>
      </div>
    </div>
  </div>
</template>
