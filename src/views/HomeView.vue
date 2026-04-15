<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useProductStore } from '../stores/products'
import { storeToRefs } from 'pinia'
import { Star } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'

const productStore = useProductStore()
const { categories } = storeToRefs(productStore)
const router = useRouter()
const route = useRoute()

const selectedCategory = ref('All')

// React to query parameters (category and search)
const searchQuery = ref('')
watch(() => route.query, (newQuery) => {
  if (newQuery.category) {
    selectedCategory.value = newQuery.category as string
  } else {
    selectedCategory.value = 'All'
  }
  
  if (newQuery.search) {
    searchQuery.value = newQuery.search as string
  } else {
    searchQuery.value = ''
  }
}, { immediate: true, deep: true })

const filteredProducts = computed(() => {
  let products = productStore.getProductsByCategory(selectedCategory.value)
  
  if (searchQuery.value) {
    const term = searchQuery.value.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term)
    )
  }
  
  return products
})

function filterByCategory(category: string) {
  selectedCategory.value = category
  if (category === 'All') {
    router.push({ path: '/' })
  } else {
    router.push({ path: '/', query: { category } })
  }
}

function viewProduct(id: number) {
  router.push(`/product/${id}`)
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Categories Hub -->
    <div class="mb-8" v-if="!searchQuery">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Shop by Category</h2>
      <div class="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        <button 
          @click="filterByCategory('All')"
          :class="['px-6 py-3 rounded-full font-medium whitespace-nowrap transition-colors shadow-sm', selectedCategory === 'All' ? 'bg-yellow-500 text-gray-900' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200']"
        >
          All Categories
        </button>
        <button 
          v-for="category in categories" 
          :key="category"
          @click="filterByCategory(category)"
          :class="['px-6 py-3 rounded-full font-medium whitespace-nowrap transition-colors shadow-sm cursor-pointer border border-gray-200', selectedCategory === category ? 'bg-yellow-500 text-gray-900 border-yellow-500' : 'bg-white text-gray-700 hover:bg-gray-100']"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Products Grid -->
    <div>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">
          <template v-if="searchQuery">
            Search Results for "{{ searchQuery }}"
          </template>
          <template v-else>
            {{ selectedCategory === 'All' ? 'Featured Products' : `${selectedCategory} Products` }}
          </template>
        </h2>
        <button 
          v-if="searchQuery" 
          @click="router.push('/')"
          class="text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          Clear Search
        </button>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col group"
          @click="viewProduct(product.id)"
        >
          <div class="relative h-64 overflow-hidden bg-gray-100">
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-5 flex flex-col flex-grow">
            <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{{ product.category }}</div>
            <h3 class="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
              {{ product.name }}
            </h3>
            
            <div class="flex items-center gap-1 mb-4 text-sm text-gray-600">
              <div class="flex text-yellow-500">
                <Star v-for="i in 5" :key="i" class="w-4 h-4" :fill="i <= Math.round(product.rating) ? 'currentColor' : 'none'" />
              </div>
              <span class="ml-1 font-medium">{{ product.rating }}</span>
              <span>({{ product.reviews.toLocaleString() }})</span>
            </div>
            
            <div class="mt-auto flex items-end justify-between pt-4 border-t border-gray-100">
              <div class="text-2xl font-bold text-gray-900">
                ${{ product.price.toFixed(2) }}
              </div>
              <button class="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors shadow">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredProducts.length === 0" class="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
        <h3 class="text-xl font-medium text-gray-600">
          {{ searchQuery ? `No products found matching "${searchQuery}".` : `No products found for this category.` }}
        </h3>
        <button 
          v-if="searchQuery" 
          @click="router.push('/')"
          class="mt-4 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors"
        >
          View All Products
        </button>
      </div>
    </div>
  </div>
</template>
