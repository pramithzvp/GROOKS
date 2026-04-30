<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'
import { CreditCard, Landmark, Banknote, ShieldCheck } from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()
const { items, totalPrice, totalItems } = storeToRefs(cartStore)

const selectedPayment = ref('credit_card')
const isProcessing = ref(false)
const isSuccess = ref(false)
const showGatewayModal = ref(false)
const gatewayStatus = ref('waiting') // waiting, processing, success

const handleCheckout = () => {
  if (items.value.length === 0) return

  if (selectedPayment.value === 'credit_card') {
    // Show dummy payment gateway
    showGatewayModal.value = true
    gatewayStatus.value = 'waiting'
    return
  }

  isProcessing.value = true
  // Simulate network request for COD / Bank transfer
  setTimeout(() => {
    isProcessing.value = false
    isSuccess.value = true
    cartStore.clearCart()
  }, 2000)
}

const processDummyPayment = () => {
  gatewayStatus.value = 'processing'
  setTimeout(() => {
    gatewayStatus.value = 'success'
    setTimeout(() => {
      showGatewayModal.value = false
      isSuccess.value = true
      cartStore.clearCart()
    }, 1000)
  }, 2000)
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <h1 class="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Checkout</h1>

    <!-- Success Screen -->
    <div v-if="isSuccess" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
        <ShieldCheck class="w-10 h-10" />
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
      <p class="text-gray-600 mb-8">Thank you for shopping with GROOKS. Your confirmation email will be sent shortly.</p>
      <button 
        @click="router.push('/')"
        class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-xl transition-colors shadow-sm"
      >
        Continue Shopping
      </button>
    </div>

    <!-- Empty Cart Warning -->
    <div v-else-if="items.length === 0" class="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 class="text-xl font-medium text-gray-600 mb-4">Your cart is empty</h2>
      <button @click="router.push('/')" class="text-yellow-600 font-semibold hover:underline">Return to Home</button>
    </div>

    <!-- Checkout Flow -->
    <div v-else class="flex flex-col lg:flex-row gap-8">
      
      <!-- Left Column: Forms -->
      <div class="grow space-y-6">
        
        <!-- 1. Shipping Address -->
        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">1</span> 
            Shipping Address
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700">First Name</label>
              <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" placeholder="John">
            </div>
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700">Last Name</label>
              <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" placeholder="Doe">
            </div>
            <div class="space-y-1 md:col-span-2">
              <label class="text-sm font-semibold text-gray-700">Address Line 1</label>
              <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" placeholder="123 Main St">
            </div>
            <div class="space-y-1 md:col-span-2">
              <label class="text-sm font-semibold text-gray-700">City / District</label>
              <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" placeholder="Colombo">
            </div>
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700">Postal Code</label>
              <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" placeholder="00100">
            </div>
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700">Phone Number</label>
              <input type="tel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none" placeholder="07XXXXXXXX">
            </div>
          </div>
        </div>

        <!-- 2. Payment Method -->
        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">2</span> 
            Payment Method
          </h2>
          
          <div class="space-y-4">
            
            <!-- Online Payment / Credit Card -->
            <label :class="['flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors', selectedPayment === 'credit_card' ? 'border-yellow-500 bg-yellow-50/30' : 'border-gray-200 hover:bg-gray-50']">
              <input type="radio" value="credit_card" v-model="selectedPayment" class="mt-1 shrink-0 text-yellow-500 focus:ring-yellow-400">
              <div class="grow">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-bold text-gray-900">Credit / Debit Card</span>
                  <div class="flex gap-1 ml-auto">
                    <CreditCard class="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p class="text-sm text-gray-500 mb-4">Pay securely using Visa, Mastercard, or AMEX.</p>
                
                <div v-if="selectedPayment === 'credit_card'" class="space-y-3 mt-4 pt-4 border-t border-gray-200">
                  <input type="text" placeholder="Card Number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
                  <div class="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="MM/YY" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
                    <input type="text" placeholder="CVC" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" />
                  </div>
                </div>
              </div>
            </label>

            <!-- Bank Transfer -->
            <label :class="['flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors', selectedPayment === 'bank_transfer' ? 'border-yellow-500 bg-yellow-50/30' : 'border-gray-200 hover:bg-gray-50']">
              <input type="radio" value="bank_transfer" v-model="selectedPayment" class="mt-1 shrink-0 text-yellow-500 focus:ring-yellow-400">
              <div class="grow">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-bold text-gray-900">Direct Bank Transfer</span>
                  <Landmark class="w-5 h-5 text-gray-600 ml-auto" />
                </div>
                <p class="text-sm text-gray-500">Deposit directly into our corporate bank account.</p>
                <div v-if="selectedPayment === 'bank_transfer'" class="text-sm bg-gray-100 p-4 rounded-lg mt-3 text-gray-700">
                  <p class="font-semibold mb-1">Bank Details:</p>
                  <p>Bank: VP Savings Bank</p>
                  <p>Account: 1234-5678-9012</p>
                  <p>Branch: Colombo Main</p>
                </div>
              </div>
            </label>

            <!-- Cash on Delivery -->
            <label :class="['flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors', selectedPayment === 'cod' ? 'border-yellow-500 bg-yellow-50/30' : 'border-gray-200 hover:bg-gray-50']">
              <input type="radio" value="cod" v-model="selectedPayment" class="mt-1 shrink-0 text-yellow-500 focus:ring-yellow-400">
              <div class="grow">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-bold text-gray-900">Cash on Delivery (COD)</span>
                  <Banknote class="w-5 h-5 text-green-600 ml-auto" />
                </div>
                <p class="text-sm text-gray-500">Pay with cash when your order is delivered.</p>
              </div>
            </label>

          </div>
        </div>

      </div>

      <!-- Right Column: Order Summary -->
      <div class="lg:w-[400px] shrink-0">
        <div class="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24 shadow-sm">
          <button 
            @click="handleCheckout"
            :disabled="isProcessing"
            class="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 disabled:opacity-75 disabled:cursor-not-allowed text-gray-900 font-bold py-4 rounded-xl transition-all shadow-md shadow-yellow-200 mb-6 text-lg"
          >
            {{ isProcessing ? 'Processing Order...' : 'Place your order' }}
          </button>
          
          <div class="text-xs text-center text-gray-500 border-b border-gray-200 pb-6 mb-6">
            By placing your order, you agree to GROOKS's <a href="#" class="text-blue-600 hover:underline">privacy notice</a> and <a href="#" class="text-blue-600 hover:underline">conditions of use</a>.
          </div>

          <h3 class="font-bold text-lg text-gray-900 mb-4">Order Summary</h3>

          <div class="space-y-3 text-sm text-gray-600 mb-6">
            <div class="flex justify-between">
              <span>Items ({{ totalItems }}):</span>
              <span>${{ totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping & handling:</span>
              <span>$0.00</span>
            </div>
            <div class="flex justify-between">
              <span>Estimated tax:</span>
              <span>$0.00</span>
            </div>
            <div class="flex justify-between text-red-600">
              <span>Promotion Applied:</span>
              <span>-$0.00</span>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4 mb-6">
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold text-red-800">Order total:</span>
              <span class="text-2xl font-extrabold text-red-800">${{ totalPrice.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Review Items Mini List -->
          <div class="border-t border-gray-200 pt-4">
            <h4 class="font-bold text-gray-900 text-sm mb-3">Review items</h4>
            <div class="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="item in items" :key="item.product.id" class="flex items-center gap-3">
                <img :src="item.product.image" class="w-12 h-12 object-contain border border-gray-100 rounded" />
                <div class="grow">
                  <div class="text-xs font-semibold text-gray-800 line-clamp-1">{{ item.product.name }}</div>
                  <div class="text-xs text-gray-500">Qty: {{ item.quantity }} | <span class="text-red-700 font-bold">${{ (item.product.price * item.quantity).toFixed(2) }}</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

  <!-- Dummy Payment Gateway Modal -->
  <div v-if="showGatewayModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
      <div class="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
        <div class="font-bold text-gray-900 flex items-center gap-2">
          <ShieldCheck class="w-5 h-5 text-green-600" />
          Secure Payment Gateway
        </div>
        <button v-if="gatewayStatus === 'waiting'" @click="showGatewayModal = false" class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      
      <div class="p-6">
        <div class="text-center mb-6">
          <p class="text-sm text-gray-500 mb-1">GROOKS LLC</p>
          <div class="text-3xl font-bold text-gray-900">${{ totalPrice.toFixed(2) }}</div>
        </div>
        
        <div v-if="gatewayStatus === 'waiting'" class="space-y-4">
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-700">Card Number</label>
            <div class="relative">
              <input type="text" value="4242 4242 4242 4242" readonly class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 outline-none font-mono tracking-widest text-sm">
              <CreditCard class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700">Expiry</label>
              <input type="text" value="12/28" readonly class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 outline-none font-mono">
            </div>
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700">CVC</label>
              <input type="password" value="123" readonly class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 outline-none font-mono tracking-widest">
            </div>
          </div>
          <p class="text-xs text-center text-gray-400 mt-2">This is a simulated payment interface. No real money will be charged.</p>
          <button @click="processDummyPayment" class="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-blue-200">
            Pay ${{ totalPrice.toFixed(2) }}
          </button>
        </div>
        
        <div v-else-if="gatewayStatus === 'processing'" class="py-8 text-center flex flex-col items-center">
          <svg class="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600 font-medium animate-pulse">Processing your payment...</p>
          <p class="text-xs text-gray-400 mt-2">Please do not close this window</p>
        </div>
        
        <div v-else-if="gatewayStatus === 'success'" class="py-8 text-center flex flex-col items-center animate-in zoom-in duration-300">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <p class="text-gray-900 font-bold text-xl">Payment Successful!</p>
          <p class="text-gray-500 mt-1">Redirecting...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #d1d5db;
}
</style>
