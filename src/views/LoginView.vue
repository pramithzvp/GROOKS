<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ArrowRight, Lock, Mail, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)

const handleLogin = async () => {
  if (!email.value || !password.value) return
  
  isSubmitting.value = true
  
  try {
    await authStore.login(email.value)
    router.push('/')
  } catch (error) {
    console.error('Login failed', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative">
      
      <!-- Decorative Element -->
      <div class="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-600"></div>

      <div class="p-8 sm:p-12">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Welcome Back</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Please sign in to your GROOKS account</p>
        </div>

        <form class="space-y-6" @submit.prevent="handleLogin">
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
                class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm transition-all" 
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label for="password" class="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
              <a href="#" class="text-xs font-semibold text-yellow-600 hover:text-yellow-500 transition-colors">Forgot password?</a>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock class="h-5 w-5" />
              </div>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autocomplete="current-password" 
                required 
                v-model="password"
                class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm transition-all" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 dark:border-gray-600 rounded cursor-pointer" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              Remember me
            </label>
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed"
            >
              <template v-if="isSubmitting">
                <Loader2 class="w-5 h-5 animate-spin mr-2" />
                Signing in...
              </template>
              <template v-else>
                Sign In
                <ArrowRight class="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </template>
            </button>
          </div>
        </form>
        
        <div class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
           Don't have an account? 
           <router-link to="/register" class="font-bold text-yellow-600 hover:text-yellow-500 transition-colors">Create an account</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
