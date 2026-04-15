<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans">
    <Header />
    <main class="flex-grow bg-gray-100 dark:bg-gray-800 transition-colors duration-200">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
