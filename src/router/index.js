import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Home' }
  },
  {
    path: '/products',
    component: () => import('@/views/ProductsLayout.vue'),
    children: [
      {
        path: '',
        name: 'Products',
        component: () => import('@/views/ProductsListView.vue'),
        meta: { title: 'Products' }
      },
      {
        path: ':id',
        name: 'ProductDetail',
        component: () => import('@/views/ProductDetailView.vue'),
        props: true,
        meta: { title: 'Product Detail' }
      }
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartView.vue'),
    meta: { title: 'Cart' }
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: () => import('@/views/WishlistView.vue'),
    meta: { title: 'Wishlist' }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/CheckoutView.vue'),
    meta: { title: 'Checkout', requiresAuth: true }
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: () => import('@/views/OrderSuccessView.vue'),
    meta: { title: 'Order Placed!' }
  },
  {
    path: '/profile',
    component: () => import('@/views/ProfileLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue'),
        meta: { title: 'My Profile' }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/OrdersView.vue'),
        meta: { title: 'My Orders' }
      },
      {
        path: 'wishlist',
        name: 'ProfileWishlist',
        redirect: '/wishlist'
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Login', guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { title: 'Register', guestOnly: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '404 – Page Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  // Update page title
  document.title = `${to.meta.title || 'Kigali Tech Store'} | Kigali Tech Store`

  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  if (to.meta.guestOnly && authStore.isLoggedIn) {
    return next({ name: 'Profile' })
  }
  next()
})

export default router
