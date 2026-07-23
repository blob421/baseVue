<script setup lang="ts">


type buttonProps = {
    buttons: {text: string, url:string}[], 
    color1: string , color2: string, bgColor1: string , bgColor2:string, hoverColor:string
    , hoverBgColor: string, rowColor: string, paddingStart?: number
}
const {buttons, color1, color2, bgColor1, bgColor2, hoverColor, hoverBgColor,
    rowColor, paddingStart
} = defineProps<buttonProps>()

const navigate = (url:string) => {
    window.location.href = url
}
const hover = (event:any | null, direction:string, idx:number) => {
  if (!event) return ;

  const style = event.target.style

  if (direction == 'in'){
      style.backgroundColor = hoverBgColor
      style.color = hoverColor
      style.transform = 'scale(1.05)'

  } 
  else {
    if (idx == 0){
        style.backgroundColor = bgColor1
        style.color = color1
    }
    else {
        style.backgroundColor = bgColor2
        style.color = color2
    }
    style.transform = 'scale(1)'
   
  }
}
</script>

<template>

    <div class="row p-0 m-0 pt-4 pb-5 d-flex justify-content-center" :style="{'background-color': rowColor?? 'none'}"
    :class="`ps-${paddingStart?? '1'}`">

        <div class="col-12 col-sm-11 col-lg-12 d-flex gap-2 justify-content-center justify-content-sm-start">
           <button v-for="(b, idx) in buttons" :key="idx" class="btns txt_lg p-3"
           :style="idx == 0 ? {'background-color': bgColor1, 'color': color1} 
                            : {'background-color': bgColor2, 'color': color2}"

            v-on:mouseenter="(e) => hover(e, 'in', idx)"
            v-on:mouseleave="(e) => hover(e, 'out', idx)"


                   v-on:click="() => {navigate(b.url)}">
             {{ b.text }}
           </button>

        </div>
    </div>

</template>


<style scoped>
.btns{
    border-radius: 100px; transition: transform 1s ease;
    border: 1px solid white;
}
@media (orientation: portrait) and (min-width:800px){
    .row > [class*='col-lg']{
      flex: 0 0 90% !important;
    }
    }
</style>