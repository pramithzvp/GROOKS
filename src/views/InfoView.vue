<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const pageTitle = computed(() => {
  const page = route.params.page as string
  if (!page) return 'Information Page'
  
  // Convert slug to Title Case (e.g., about-grooks -> About Grooks)
  return page
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})
</script>

<template>
  <div class="container mx-auto px-4 py-12 min-h-[60vh]">
    <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{{ pageTitle }}</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        This is a placeholder page for <strong>{{ pageTitle }}</strong>.
      </p>
      <p class="text-gray-600 dark:text-gray-300">
        You can replace this component or add specific content for each page as your application grows!
      </p>
    </div>
  </div>
</template>
