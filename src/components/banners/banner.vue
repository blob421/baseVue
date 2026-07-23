<script setup lang="ts">



type banner = {text: string, color?:string, bgColor?: string, borders?: string, height:number,
    emoji?: string
}

const {text, color, bgColor, borders, height} = defineProps<banner>()


</script>

<template>

    <div class="row p-3 m-0 p-sm-2" :style="{height: `max(${height}vh, ${height - 7}vw)`,
                                      borderTop: `2px solid ${borders?? 'none'}`,
                                      borderBottom: `2px solid ${borders?? 'none'}`,
                                      backgroundColor: bgColor ?? 'none',
                                      color: color ?? 'black'
    }">
        <div class="col-12  d-flex justify-content-center text-center align-items-center txt_xl"
        >
            
            <span class="text_span d-flex align-items-center gap-3 gap-sm-5 gap-md-3">
                {{ text }}
                 <span v-if="emoji" class="emoji">{{ emoji }}</span>
            </span>

         
        </div>
    </div>

</template>

<style scoped>

.text_span{
    font-family: "Inter", sans-serif; margin-left: max(4vw, 6vh);

}
.emoji{
    font-size: max(3vw, 4vh); margin-bottom: 1vh;
}
</style>