<script setup>
import { ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToastStore } from '@/stores/toast'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const props = defineProps({ id: { type: String, required: true } })

const productsStore = useProductsStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toastStore = useToastStore()

const product = ref(null)
const loading = ref(true)
const qty = ref(1)

onMounted(async () => {
  product.value = await productsStore.fetchOne(props.id)
  loading.value = false
})

function addToCart() {
  if (!product.value) return

  const cleanProduct = {
    id: product.value.id || product.value._id,
    title: product.value.title || product.value.name,
    price: product.value.price,
    image: product.value.image,
    category: product.value.category
  }

  cartStore.add(cleanProduct, qty.value)

  toastStore.show(
    `Added ${qty.value}× "${cleanProduct.title?.slice(0, 25) || 'Product'}…" to cart!`
  )
}
</script>