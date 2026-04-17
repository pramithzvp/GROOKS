import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)
  
  const isAuthenticated = computed(() => currentUser.value !== null)

  const login = async (email: string) => {
    // Simulate network delay to make it feel real
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Extract first name from email nicely
    let namePart = email.split('@')[0] || 'User'
    // Clean up name part if it has dots or numbers (e.g. john.doe -> John Doe)
    namePart = namePart.replace(/[.-_]/g, ' ').replace(/[0-9]/g, '').trim()
    const name = namePart.split(' ').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ') || 'User'

    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: name,
      email: email
    }
    
    currentUser.value = mockUser
  }

  const logout = () => {
    currentUser.value = null
  }

  return {
    currentUser,
    isAuthenticated,
    login,
    logout
  }
})
