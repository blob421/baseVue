<script setup lang="ts">

import { ref } from 'vue';
import { toRefs, onMounted, onUnmounted } from 'vue';


type carouselProps = {feats: {title:string, text: string, img:string}[], rowColor?:string,
color?:string}

const props = defineProps<carouselProps>()

const {feats, rowColor, color} = toRefs(props)
const current_idx = ref(0)


const interval = ref(0)


const rotate = () => {
   
   current_idx.value = (current_idx.value + 1) % feats.value.length
}

const HandleInterval = () => {

    if (!interval.value){
        interval.value = window.setInterval(() => rotate(), 8000)
    }
    else{
        window.clearInterval(interval.value)
        interval.value = 0
    }
    

}

onMounted(()=> {
    window.addEventListener("visibilitychange", HandleInterval)

    HandleInterval()

})

onUnmounted(()=> {
    if (interval.value){
        window.clearInterval(interval.value)
    }
     window.removeEventListener("visibilitychange", HandleInterval)
  
})


</script>

<template>

<div class="row p-3 pb-0 pt-4 pt-sm-5 pt-lg-4 pb-lg-2 pb-sm-3 m-0 d-flex justify-content-center" 
     :style="{'background-color': rowColor?? 'none', 
                                             'color': color?? 'black'}">
    <div class="col-sm-11 col-12 col-lg-6 mt-lg-4 mb-lg-3 p-2 d-flex justify-content-center align-items-center 
    txt_xl carousel_title_container">
        
  
             {{ feats[current_idx].title }}
  

    </div>
</div>
<div class="row p-0 m-0 pb-2 pt-0 pt-sm-2 d-flex justify-content-center justify-content-lg-end 
carousel_row" 
     :style="{'background-color': rowColor?? 'none', 
                         'color': color?? 'black'}">

    <div class="col-sm-11 col-lg-9 p-3 p-sm-3 mb-sm-5 pb-sm-0 pb-md-2 mb-md-0 pt-3 pt-sm-2 col-car-frame">
         <div class="carousel_frame m-1">

               <Transition name="fade" mode="out-in">
               <img :key="current_idx" :src="feats[current_idx].img" class="w-100 img-fluid"/>
               </Transition>
               
         </div>
    </div>
    <div class="col-sm-11 col-lg-3 p-3 p-sm-2 p-lg-3 pt-1 pt-sm-0 pe-lg-4">
          <div class="carousel_text_container txt_md pt-3 p-3 m-1 p-sm-4 h-100">

        
            {{ feats[current_idx].text }}
         
          </div>
    </div>

</div>

</template>

<style scoped>

/* Vue Transition Classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.carousel_row{
  
}
 .carousel_frame {
    border-radius: 10px; overflow: hidden;
    
    aspect-ratio: 16/7.5 !important;
  
 }
.carousel_text_container{
  background-color: rgba(240, 248, 255, 0.077); border-radius: 10px;
  line-height: 1.7;
  
}
.carousel_title_container{
    background-color: rgba(240, 248, 255, 0.077);border-radius: 10px;
    height: max(10vh, 6vw);
}
.carousel_frame img {
     border: 2px solid black; border-radius: 10px; overflow: hidden;
}
@media (orientation: portrait) and (max-width: 992px){
    .carousel_text_container{
         height: 26vh !important;
    }
}
@media (orientation: portrait) and (min-width:800px){
    .row > [class*='col-lg']{
      flex: 0 0 90% !important;
    }
        .carousel_text_container{
         height: 17vh !important;
    }
    .col-car-frame{
        padding-bottom: 5vh !important;
    }
}
</style>