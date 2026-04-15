<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore, type Product } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { Star, Check, ShoppingCart, ArrowLeft, Package, TrendingUp } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const quantity = ref(1)
const addedToCart = ref(false)

const loadProduct = () => {
  const id = Number(route.params.id)
  const found = productStore.getProductById(id)
  if (found) {
    product.value = found
  } else {
    // If not found, reditect or show error (simplified here)
    router.push('/')
  }
}

onMounted(() => {
  loadProduct()
})

watch(() => route.params.id, () => {
  loadProduct()
})

const increaseQuantity = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value)
    addedToCart.value = true
    setTimeout(() => {
      addedToCart.value = false
    }, 2000)
  }
}

// User Rating feature
const userRating = ref(0)
const hoverRating = ref(0)
const hasRated = ref(false)

const submitRating = () => {
  if (userRating.value > 0 && product.value) {
    productStore.addRating(product.value.id, userRating.value)
    hasRated.value = true
  }
}

watch(() => route.params.id, () => {
  hasRated.value = false
  userRating.value = 0
  hoverRating.value = 0
})
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <button @click="router.back()" class="flex items-center text-gray-600 hover:text-yellow-600 mb-6 font-medium transition-colors">
      <ArrowLeft class="w-4 h-4 mr-2" /> Back to Products
    </button>

    <div v-if="product" class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div class="flex flex-col md:flex-row">
        
        <!-- Product Image -->
        <div class="md:w-1/2 lg:w-3/5 bg-gray-50 flex items-center justify-center p-8">
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="max-w-full h-auto max-h-[500px] object-contain drop-shadow-lg mix-blend-multiply"
          />
        </div>

        <!-- Product Details -->
        <div class="md:w-1/2 lg:w-2/5 p-8 flex flex-col border-l border-gray-100">
          <div class="text-sm font-semibold text-yellow-600 uppercase tracking-widest mb-2">{{ product.category }}</div>
          <h1 class="text-3xl font-bold text-gray-900 leading-tight mb-4">
            {{ product.name }}
          </h1>

          <!-- Rating -->
          <div class="flex items-center gap-2 mb-6 text-sm text-gray-600 border-b border-gray-100 pb-6">
            <div class="flex text-yellow-500">
              <Star v-for="i in 5" :key="i" class="w-5 h-5" :fill="i <= Math.round(product.rating) ? 'currentColor' : 'none'" />
            </div>
            <span class="font-bold text-gray-900 text-base">{{ product.rating }}</span>
            <span class="text-blue-600 hover:underline cursor-pointer">{{ product.reviews.toLocaleString() }} ratings</span>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <span class="text-4xl font-extrabold text-gray-900">${{ product.price.toFixed(2) }}</span>
            <span class="text-sm text-gray-500 ml-2 block mt-1">Free Returns & Delivery</span>
          </div>

          <!-- Description -->
          <div class="mb-8 prose prose-sm text-gray-600">
            <p>{{ product.description }}</p>
          </div>

          <!-- Stats: Stock & Sold -->
          <div class="flex gap-4 mb-8">
            <div class="flex-1 bg-green-50 rounded-lg p-4 flex items-center gap-3 border border-green-100">
              <div class="bg-green-100 p-2 rounded-full text-green-600">
                <Package class="w-5 h-5" />
              </div>
              <div>
                <div class="text-xs text-green-800 font-semibold uppercase">Availability</div>
                <div class="text-lg font-bold text-green-700">{{ product.stock }} <span class="text-sm font-medium">in stock</span></div>
              </div>
            </div>
            <div class="flex-1 bg-blue-50 rounded-lg p-4 flex items-center gap-3 border border-blue-100">
              <div class="bg-blue-100 p-2 rounded-full text-blue-600">
                <TrendingUp class="w-5 h-5" />
              </div>
              <div>
                <div class="text-xs text-blue-800 font-semibold uppercase">Popularity</div>
                <div class="text-lg font-bold text-blue-700">{{ product.sold.toLocaleString() }} <span class="text-sm font-medium">sold</span></div>
              </div>
            </div>
          </div>

          <!-- Add to Cart Action -->
          <div class="mt-auto border border-gray-200 p-6 rounded-xl bg-gray-50">
            <div class="flex items-center gap-4 mb-4">
              <span class="font-semibold text-gray-700">Quantity</span>
              <div class="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden h-10">
                <button 
                  @click="decreaseQuantity" 
                  class="px-4 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors h-full"
                  :disabled="quantity <= 1"
                >
                  -
                </button>
                <div class="px-4 font-semibold text-gray-900 min-w-12 text-center border-x border-gray-200">
                  {{ quantity }}
                </div>
                <button 
                  @click="increaseQuantity" 
                  class="px-4 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors h-full"
                  :disabled="quantity >= product.stock"
                >
                  +
                </button>
              </div>
            </div>

            <button 
              @click="addToCart"
              :class="['w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98]', 
                addedToCart 
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200' 
                  : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-200/50'
              ]"
            >
              <template v-if="addedToCart">
                <Check class="w-6 h-6" /> Added to Cart!
              </template>
              <template v-else>
                <ShoppingCart class="w-6 h-6" /> Add to Cart
              </template>
            </button>
            <div class="text-center mt-3 text-xs text-gray-500 flex items-center justify-center gap-1">
              Protected by <span class="font-bold text-gray-700">GROOKS Guarantee</span>
            </div>
          </div>
          
        </div>
      </div>

      <!-- Customer Reviews Section -->
      <div class="border-t border-gray-100 p-8 md:p-12 bg-gray-50">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        <div class="bg-white p-6 rounded-xl border border-gray-100 max-w-2xl shadow-sm">
          <h3 class="text-lg font-bold text-gray-900 mb-2">Rate this product</h3>
          <p class="text-sm text-gray-600 mb-4">Share your thoughts with other customers</p>
          
          <div class="flex items-center gap-2 mb-6" @mouseleave="hoverRating = 0">
            <Star 
              v-for="i in 5" 
              :key="i" 
              class="w-10 h-10 cursor-pointer transition-transform hover:scale-110"
              :class="[(hoverRating || userRating) >= i ? 'text-yellow-500 fill-current' : 'text-gray-300']"
              @mouseover="!hasRated && (hoverRating = i)"
              @click="!hasRated && (userRating = i)"
            />
            <span v-if="userRating > 0 && !hasRated" class="ml-3 font-medium text-gray-700">{{ userRating }} out of 5 stars</span>
          </div>
          
          <button 
            @click="submitRating"
            :disabled="userRating === 0 || hasRated"
            class="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-900 font-bold px-8 py-3 rounded-lg transition-all shadow-sm"
          >
            {{ hasRated ? 'Thanks for your feedback!' : 'Submit Rating' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>
