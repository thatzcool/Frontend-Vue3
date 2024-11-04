<script setup>
</script>

<template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav class="m-2">
    <RouterLink to="/" >Home</RouterLink>
    <RouterLink to="/product" >Product</RouterLink>
    <RouterLink to="/member" >Member</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

nav a {
  @apply m-2 ;
}

</style>
