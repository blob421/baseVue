/////// Alternating info banner 

<script setup lang="ts">
import { ref, onMounted, onUnmounted} from 'vue';

type Info = {
    slides: string[], bgColor?: string, color?: string, height?: number
}
const {slides, bgColor, color, height} = defineProps<Info>()

const index_arr = ref<number[] | null>(null)
const interval = ref(0)
const timeout = ref(0)
const iterations = ref(0)


onMounted(()=> {

    index_arr.value = slides.map((_, idx) => idx)


    interval.value = window.setInterval(()=> {
    
        if (index_arr.value){
     
 
        index_arr.value = [...index_arr.value.slice(1), 
                           ...index_arr.value.slice(0, 1)]

        }

        if (iterations.value < 1){
            iterations.value += 1
           
        }

        if (index_arr.value?.length == 2){
            timeout.value = window.setTimeout(()=>{
                const left = document.querySelector('.left')
                left?.classList.remove('left')
                left?.classList.add('next')
            }, 2300)
        }
      
    }, 5000)
})


onUnmounted(()=> {

   window.clearInterval(interval.value)
   if (timeout.value){
       window.clearTimeout(timeout.value)
   }
  
})

</script>

<template>

<div class="info_banner" :style="{backgroundColor: bgColor? bgColor: 'black',
                                  color: color? color: 'white',
                                  height: height? `${height}vh`: '10vh'
}">

    <div v-if="index_arr && index_arr.length > 2" 
         v-for="(s, i) in slides" class="base_info" :key='i' 
                                :class="{
                                        'current': i == index_arr[0],
                                        
                                        'next': i == index_arr[1] 
                                             || i !== index_arr[slides.length - 1] 
                                             || i !== index_arr[0],

                                        'left': i == index_arr[slides.length - 1],
                                       
                                      
                                       
                                        }">
        {{ s }}

    </div>

      <div v-if="index_arr && index_arr.length == 2"
           v-for="(s, i) in slides" class="base_info" :key='i'
                                    :class="{
                                            'current': i == index_arr[0],
                                            
                                            'left': i == index_arr[1] && iterations >=1,

                                            'next': i == index_arr[1] && iterations < 1
                                        
                                        
                                        
                                            }">
            {{ s }}
        
    </div>


</div>


</template>

<style scoped>

.info_banner{
     width: 100vw; 
    position: relative;display: flex; justify-content: center;
     align-items: center;
  
    
}
.base_info{
     text-align: center; position: absolute; width: 100%; 
}

.next {
     transform: translateX(100%); opacity: 0;
}
.current {
   transition: transform 2s ease; transform: translateX(0%); opacity: 1;
}

.left{
    transform: translateX(-100%);  opacity: 1; transition: transform 2s ease;
}

</style>