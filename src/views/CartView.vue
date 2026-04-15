<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'
import { Trash2, ShieldCheck, ArrowRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const { items, totalItems, totalPrice } = storeToRefs(cartStore)
const router = useRouter()

const updateQty = (productId: number, newQty: number) => {
  cartStore.updateQuantity(productId, newQty)
}

const removeItem = (productId: number) => {
  cartStore.removeFromCart(productId)
}

</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>

    <div v-if="items.length === 0" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
      <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingCart class="w-10 h-10 text-gray-300" />
      </div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Your GROOKS Cart is empty</h2>
      <p class="text-gray-500 mb-8">Shop today's deals and discover new items to add.</p>
      <button 
        @click="router.push('/')"
        class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
      >
        Continue Shopping <ArrowRight class="w-5 h-5" />
      </button>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-8">
      
      <!-- Cart Items List -->
      <div class="grow">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
            <div class="col-span-6">Product</div>
            <div class="col-span-3 text-center">Quantity</div>
            <div class="col-span-3 text-right">Subtotal</div>
          </div>

          <div class="divide-y divide-gray-100">
            <div v-for="item in items" :key="item.product.id" class="p-6 transition-colors hover:bg-gray-50/50">
              <div class="flex flex-col md:grid md:grid-cols-12 gap-6 items-center">
                <!-- Product Info -->
                <div class="col-span-6 flex items-start gap-4 cursor-pointer group w-full" @click="router.push(`/product/${item.product.id}`)">
                  <div class="w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg border border-gray-200 p-2 overflow-hidden shrink-0">
                    <img :src="item.product.image" :alt="item.product.name" class="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div class="flexflex-col w-full text-left">
                    <div class="text-xs font-semibold text-gray-400 mb-1">{{ item.product.category }}</div>
                    <h3 class="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                      {{ item.product.name }}
                    </h3>
                    <div class="text-sm font-bold text-gray-900 mt-2 md:hidden">${{ item.product.price.toFixed(2) }}</div>
                    <div class="text-xs text-green-600 font-semibold mt-1">In Stock</div>
                  </div>
                </div>

                <!-- Quantity Controls -->
                <div class="col-span-3 flex md:justify-center w-full md:w-auto mt-4 md:mt-0">
                  <div class="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden h-10 shadow-sm">
                    <button 
                      @click="updateQty(item.product.id, item.quantity - 1)" 
                      class="px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors h-full"
                    >
                      -
                    </button>
                    <div class="px-3 md:px-4 font-semibold text-gray-900 min-w-10 md:min-w-12 text-center border-x border-gray-200 bg-gray-50">
                      {{ item.quantity }}
                    </div>
                    <button 
                      @click="updateQty(item.product.id, item.quantity + 1)" 
                      class="px-3 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors h-full"
                      :disabled="item.quantity >= item.product.stock"
                    >
                      +
                    </button>
                  </div>
                </div>

                <!-- Price and Delete -->
                <div class="col-span-3 flex justify-between md:justify-end items-center w-full md:w-auto mt-4 md:mt-0">
                  <div class="text-lg font-bold text-gray-900 hidden md:block">
                    ${{ (item.product.price * item.quantity).toFixed(2) }}
                  </div>
                  <button 
                    @click="removeItem(item.product.id)"
                    class="ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors tooltip"
                    title="Remove item"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-end">
           <button @click="cartStore.clearCart()" class="text-sm font-semibold text-red-500 hover:text-red-700 underline underline-offset-4">Empty Cart</button>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:w-96 shrink-0">
        <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24 shadow-sm">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          
          <div class="space-y-4 text-sm mb-6">
            <div class="flex justify-between text-gray-600">
              <span>Items ({{ totalItems }}):</span>
              <span class="font-medium text-gray-900">${{ totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Shipping & handling:</span>
              <span class="font-medium text-green-600">Free</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Estimated tax:</span>
              <span class="font-medium text-gray-900">$0.00</span>
            </div>
          </div>
          
          <div class="border-t border-gray-200 pt-4 mb-8">
            <div class="flex justify-between items-end">
              <span class="text-lg font-bold text-gray-900">Order total:</span>
              <span class="text-3xl font-extrabold text-gray-900">
                ${{ totalPrice.toFixed(2) }}
              </span>
            </div>
          </div>

          <button 
            @click="router.push('/checkout')"
            class="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-bold py-4 rounded-xl transition-all shadow-md shadow-yellow-200 mb-4 text-lg"
          >
            Proceed to Checkout
          </button>

          <div class="flex items-center justify-center gap-2 text-xs text-gray-500 bg-white p-3 rounded-lg border border-gray-100">
            <ShieldCheck class="w-4 h-4 text-green-500" />
            Safe and secure transactions
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
