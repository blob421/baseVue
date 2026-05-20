<script setup lang="ts">

import router from './router';

const paths = ['/banners', '/forms']
</script>

<template>
  <div class="container-fluid p-0 m-0">
  <nav>
    <button v-for="(b, idx) in paths" v-on:click="router.push(b)" :key="idx">
       {{b.charAt(1)?.toUpperCase() + b.slice(2)}}
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

 .txt_lg{
    font-size: max(1.5vw, 2.7vh) !important; 
}
.txt_md{
font-size: max(1.3vw, 2.5vh) !important;
}
.txt_sm{
font-size: max(1.3vw, 2.2vh) !important;
}
.txt_xs{
    font-size: max(1.2vw, 1.9vh) !important;
}
.txt_xl{
    font-size: max(2.3vw, 3vh) !important;
}

</style>
