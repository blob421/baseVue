<script setup lang="ts">


import {ref} from 'vue'

type squaresProps = {
    squares: {text:string, img:string, content:string}[], squaresColor?:string, squaresBgColor:string,
    rowColor: string, text:string, glowColor?: string, squareBorders?: string
}

const {squares, squaresBgColor, squaresColor, rowColor, text,
    glowColor, squareBorders
} = defineProps<squaresProps>()

const currentIdx = ref(3)

const isMob = window.screen.orientation.type == 'portrait-primary' && window.innerWidth < 700

const handleSquaresHover = (event:any, direction:string, idx:number) => {

  const style = event.target.style

  if (direction == 'in'){
    style.border = `3px solid ${glowColor?? 'black'}`
    
    if (!isMob){
         style.transform = 'scale(1.05)'
    }
   
  }
  else{
    if (idx != currentIdx.value){
        style.border = `3px solid ${squareBorders?? 'black'}`
    }
  
    style.transform = 'scale(1)'
  }
}

</script>

<template>

<div class="row pt-4 pt-sm-5 p-2 p-lg-4 m-0 pb-4 d-flex justify-content-center" 
:style="{'background-color': rowColor?? 'none'}">



    <div class="col-sm-11 col-12 col-lg-6 g-0 wrapper_cards">
        <div class="row d-flex p-0 m-0 justify-content-start w-100 pt-4 mt-4 mt-sm-2 pt-sm-5 ms-lg-5
                                                                pt-lg-5 pb-4 pb-sm-4 pb-lg-5">

            
                    <div v-for="(s ,idx) in squares" :key="idx" 
                      class="d-flex col-6 gx-1 gx-sm-5 gx-lg-5 col-lg-5 d-flex 
                      justify-content-center align-items-center
                      ">

                            <div class="single_square mb-2 mb-sm-4 mb-lg-4 w-100 p-2 pe-1 pb-3 pt-3 p-sm-4 
                            txt_md 
                           "
                            :style="{border: idx == currentIdx? 
                                `3px solid ${glowColor?? 'black'}`
                                : `3px solid ${squareBorders}`}"
                                
                                 v-on:click="() => currentIdx = idx"
                      v-on:mouseenter="(e) => handleSquaresHover(e, 'in', idx)"
                      v-on:mouseleave="(e) => handleSquaresHover(e, 'out', idx)">
                                
                                <div class="square_text">
                                    {{ s.text }}
                                </div>

                                <div class="square_img">
                                        <img :src="s.img" class="w-100"/>
                                </div>


                      </div>
                    </div>
              </div>
    </div>

    <div class="col-12 col-sm-11 col-lg-6 p-lg-5 gx-1 gx-sm-5 pt-3 pb-5">
        <div class="text_container txt_md p-4 p-sm-5 p-lg-5">
          {{ squares[currentIdx].content }}
        </div>
   
    </div>

</div>

</template>
<style scoped>
.text_container{
    border: 2px solid black; background-color: white;
    border-radius: 8px; line-height: 1.7; height: 100%;
    background-color: antiquewhite;
}
.wrapper_cards{
  
}
.single_square{
    display: flex; 
    border: 1px solid rgb(11, 11, 11) ;
    border-radius: 10px; gap: 2%; cursor: pointer; transition: transform 1s ease;
}
.square_text{
    width: 70%; display: flex; align-items: center;
}
.square_img{
   aspect-ratio: 1/1; width: 30%; display: flex; align-items: center;
}
.square_img img {
    width: 100%; aspect-ratio: 1/1;
}

</style>