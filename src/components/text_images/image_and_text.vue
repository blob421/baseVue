<script setup lang="ts">

type imgTextProps = {
    text: string, img: string, imgRight? :boolean, rowColor?: string, color?:string,
    title: string
}

const {text, img, imgRight, rowColor, color, title} = defineProps<imgTextProps>()

</script>
<template>
   <div class="row ps-lg-4 pb-5 pb-sm-4 pb-lg-0 pe-lg-4 p-0 m-0 pt-4 d-flex justify-content-center" 
       :class="imgRight? 'justify-content-lg-end': 'justify-content-lg-start'"
       :style="{'background-color': rowColor?? 'transparent'}">

    <div class="col-12 col-sm-10 p-sm-3 col-lg-6 pe-3 ps-3">
     <div class="title_container p-3 pb-sm-4 pt-sm-4 text-center txt_xl">
             {{title}}
        </div>
    </div>
   </div>
   
    <div class="row p-0 m-0 pb-1 ps-lg-4 pe-lg-4 d-flex justify-content-center" 
    :style="{'background-color': rowColor?? 'transparent',
        color: color?? 'black'
    }">
  


        <div class="col-12 col-sm-10 col-lg-6 p-4 p-lg-3 pb-0 p-sm-4 pt-1 pt-sm-2 mt-lg-2 image_col" 
        :class="imgRight? 'order-lg-2' : ''">
           <img :src="img" class="img-fluid w-100"/>
        </div>

        <div class="col-12 col-sm-10 col-lg-6 p-3 text_col p-lg-3 pt-5 pt-sm-5 mt-lg-2" 
        :class="imgRight? 'order-lg-1' : ''">
            <div class="text_div txt_md p-4 p-lg-5 h-100">
                {{ text }}
            </div>
        </div>
    </div>
</template>

<style scoped>

.text_div{ 
    background-color: rgba(255, 255, 255, 0.078); border-radius: 10px;
    line-height: 1.7;
}
.image_col img {
    border-radius: 10px; border: 1px solid white;
}
@media (orientation: portrait) and (min-width:800px){
    .image_col{
        margin-bottom: 2vh !important; margin-top: 3vh !important;
    }
}
.title_container{
   background-color: rgba(255, 255, 255, 0.075);
    border-radius: 10px; color: white;
}
</style>