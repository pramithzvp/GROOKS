<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ArrowRight, Lock, Mail, User, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const isSubmitting = ref(false)

const handleRegister = async () => {
  if (!email.value || !password.value || !name.value) return
  
  isSubmitting.value = true
  
  try {
    // In our simulation, login handles both login and registering state implicitly
    await authStore.login(email.value)
    router.push('/')
  } catch (error) {
    console.error('Registration failed', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative">
      
      <!-- Decorative Element -->
      <div class="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-gray-900 to-gray-700 dark:from-yellow-400 dark:to-yellow-600"></div>

      <div class="p-8 sm:p-12">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Join GROOKS</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Create an account to start shopping securely</p>
        </div>

        <form class="space-y-5" @submit.prevent="handleRegister">
          
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User class="h-5 w-5" />
              </div>
              <input 
                id="name" 
                name="name" 
                type="text" 
                required 
                v-model="name"
                class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-yellow-500 transition-all" 
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label for="email-address" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail class="h-5 w-5" />
              </div>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                v-model="email"
                class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-yellow-500 transition-all" 
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock class="h-5 w-5" />
              </div>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autocomplete="new-password" 
                required 
                v-model="password"
                class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-yellow-500 transition-all" 
                placeholder="••••••••"
              />
            </div>
            <p class="mt-2 text-xs text-gray-500">Must be at least 8 characters.</p>
          </div>

          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gray-900 hover:bg-gray-800 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <template v-if="isSubmitting">
                <Loader2 class="w-5 h-5 animate-spin mr-2" />
                Creating account...
              </template>
              <template v-else>
                Create Account
                <ArrowRight class="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </template>
            </button>
          </div>
        </form>
        
        <div class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
           Already have an account? 
           <router-link to="/login" class="font-bold text-gray-900 dark:text-yellow-500 hover:underline transition-all">Sign in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
