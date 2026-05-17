<script setup lang="ts">

import router from './router';

</script>

<template>
  <div class="container-fluid p-0 m-0">
  <nav>
    <button v-on:click="router.push('/banners')">
       Banners
    </button>

  </nav>
</div>


  <RouterView/>

</template>

<style scoped>

</style>
<style>
 html, body {
  margin: 0 !important; padding: 0 !important;
 }
</style>
