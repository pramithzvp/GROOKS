<script setup lang="ts">
import { ShoppingCart, Search, Moon, Sun } from 'lucide-vue-next'
import { useCartStore } from '../stores/cart'
import { useThemeStore } from '../stores/theme'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const themeStore = useThemeStore()

const cartStore = useCartStore()
const { totalItems } = storeToRefs(cartStore)

const router = useRouter()
const searchQuery = ref('')
const mobileSearchQuery = ref('')

const handleSearch = (query: string) => {
  if (query.trim()) {
    router.push({ path: '/', query: { search: query.trim() } })
    searchQuery.value = ''
    mobileSearchQuery.value = ''
  } else {
    router.push({ path: '/' })
  }
}
</script>

<template>
  <header class="bg-gray-900 text-white sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3">
      <!-- Top Row -->
      <div class="flex items-center justify-between gap-4">
        <!-- Logo -->
        <router-link to="/" class="shrink-0 flex items-center gap-3">
          <img src="../assets/Gemini_Generated_Image_m8s4lqm8s4lqm8s4.png" alt="Grooks Logo" class="h-16 w-auto object-contain drop-shadow-md" />
          <h1 class="text-2xl font-bold tracking-tight">GROOKS</h1>
        </router-link>

        <!-- Search Bar -->
        <div class="hidden md:flex flex-1 max-w-2xl mx-4">
          <div class="flex w-full">
             <input 
              v-model="searchQuery"
              @keyup.enter="handleSearch(searchQuery)"
              type="text" 
              placeholder="Search products..." 
              class="w-full px-4 py-2 bg-white text-gray-900 rounded-l-md focus:outline-none"
            />
            <button 
              @click="handleSearch(searchQuery)"
              class="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-r-md transition-colors text-slate-900"
            >
              <Search class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Right Side Nav -->
        <nav class="flex items-center gap-6">
          <button @click="themeStore.toggleTheme()" class="hover:text-yellow-400 transition-colors" title="Toggle dark mode">
            <Moon v-if="themeStore.theme === 'light'" class="w-6 h-6" />
            <Sun v-else class="w-6 h-6" />
          </button>
          <router-link to="/cart" class="flex items-center gap-1 hover:text-yellow-400 transition-colors relative">
            <div class="relative">
              <ShoppingCart class="w-8 h-8" />
              <span 
                v-if="totalItems > 0"
                class="absolute -top-2 -right-2 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {{ totalItems }}
              </span>
            </div>
            <span class="hidden sm:inline font-semibold mt-auto mb-1">Cart</span>
          </router-link>
        </nav>
      </div>

      <!-- Mobile Search -->
      <div class="mt-3 flex md:hidden">
        <input 
          v-model="mobileSearchQuery"
          @keyup.enter="handleSearch(mobileSearchQuery)"
          type="text" 
          placeholder="Search products..." 
          class="w-full px-4 py-2 text-gray-900 rounded-l-md focus:outline-none"
        />
        <button 
          @click="handleSearch(mobileSearchQuery)"
          class="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-r-md transition-colors text-slate-900"
        >
          <Search class="w-5 h-5" />
        </button>
      </div>
    </div>
    
  </header>
</template>
