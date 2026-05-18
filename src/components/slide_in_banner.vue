<script setup lang="ts">

import { ref, toRefs } from 'vue';
import { onMounted, onUnmounted } from 'vue';

type BannerProps = {text: string, height?: number}
const Props = defineProps<BannerProps>()

const {text, height} = toRefs(Props)
const slide = ref(false)
const banner = ref<HTMLDivElement | null>(null)

const handleScroll = () => {
   const rect = banner.value?.getBoundingClientRect()
   let banner_center
   if (rect && banner.value){
      banner_center = rect.top + (rect.height / 2)
   }
  
   const screen_center = window.innerHeight / 2

   if (banner_center !== undefined){
       if (banner_center < (screen_center + 200) && banner_center > (screen_center - 200)){
        slide.value = true
       }
       else{
        slide.value = false
       }
    }
   }
  
onMounted(()=> {
    //banner.value = document.querySelector('.slide_in_banner') ref on div instead
    window.addEventListener('scroll', handleScroll)
})
onUnmounted(()=> {
    window.removeEventListener('scroll', handleScroll)
})

</script>


<template>

 <div ref="banner" class="slide_in_banner" :class="{'slide_in_banner_show': slide }" 
                              :style="{height: height? height + 'vh': '15vh'}">
  {{text}}

 </div>

</template>


<style>
 .slide_in_banner {
    width: 100%; transform: translateX(-100%); transition: transform 2s ease;
    background-color: black; color: white;
 }
 .slide_in_banner_show {
    transform: translateX(0%) !important;
 }
</style>