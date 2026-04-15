<script setup lang="ts">
</script>

<template>
  <footer class="bg-gray-900 text-white pt-10 pb-6 mt-auto">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="font-bold text-lg mb-4">Get to Know Us</h3>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li><router-link to="/info/careers" class="hover:underline">Careers</router-link></li>
            <li><router-link to="/info/blog" class="hover:underline">Blog</router-link></li>
            <li><router-link to="/info/about-grooks" class="hover:underline">About GROOKS</router-link></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-4">Make Money with Us</h3>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li><router-link to="/info/sell-products" class="hover:underline">Sell products on GROOKS</router-link></li>
            <li><router-link to="/info/become-affiliate" class="hover:underline">Become an Affiliate</router-link></li>
            <li><router-link to="/info/advertise-products" class="hover:underline">Advertise Your Products</router-link></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-4">GROOKS Payment Products</h3>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li><router-link to="/info/business-card" class="hover:underline">GROOKS Business Card</router-link></li>
            <li><router-link to="/info/shop-with-points" class="hover:underline">Shop with Points</router-link></li>
            <li><router-link to="/info/reload-balance" class="hover:underline">Reload Your Balance</router-link></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-lg mb-4">Let Us Help You</h3>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li><router-link to="/info/your-account" class="hover:underline">Your Account</router-link></li>
            <li><router-link to="/info/your-orders" class="hover:underline">Your Orders</router-link></li>
            <li><router-link to="/info/shipping-policies" class="hover:underline">Shipping Rates & Policies</router-link></li>
            <li><router-link to="/info/returns" class="hover:underline">Returns & Replacements</router-link></li>
            <li><router-link to="/info/help" class="hover:underline">Help</router-link></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-700 pt-6 mt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <div class="mb-4 md:mb-0">
          <span>&copy; {{ new Date().getFullYear() }} GROOKS PVT LTD. All rights reserved.</span>
        </div>
        <div class="flex gap-4">
          <router-link to="/info/conditions-of-use" class="hover:underline">Conditions of Use</router-link>
          <router-link to="/info/privacy-notice" class="hover:underline">Privacy Notice</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>
