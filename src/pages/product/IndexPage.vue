<script setup>

import ProductMenu from "../../components/product/ProductMenu.vue";
</script>

<template>
  <div>
    <div class="head">Product Index Page</div>

    <ProductMenu/>


    <div>
      <RouterView/>
    </div>

  </div>
</template>

<style scoped>

.head {
  @apply text-2xl font-bold;
}

</style>