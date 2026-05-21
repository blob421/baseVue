<script setup lang="ts">

import {toRefs, ref, computed, watch} from 'vue'
import router from '@/router';

type nav_props = {
    sections: string[], icon?: string, bgColor?:string, color?:string, sideHam?: boolean
}
const hamMenuVisible = ref(false)
const props = defineProps<nav_props>()
const {sections, icon, sideHam, bgColor, color} = toRefs(props)

const menuIsCollapsed = ref(true)

watch(hamMenuVisible, (newVal)=>{
  if (newVal == false){
    setTimeout(()=> {
      menuIsCollapsed.value =  true
    }, 1300)
  }
  menuIsCollapsed.value = false
})

</script>


<template>

<div class="nav_main" :style="{backgroundColor: bgColor? bgColor: 'skyblue',
                          color: color? color: 'black'}">

    <div class="icon_container">
         <img :src="icon" class="nav_icon" v-on:click="router.push('/')"/>
    </div>
   
    <div v-for="(s, i) in sections" class="btn_col" :key="i">
        <div v-on:click="router.push(s)" class="txt_md nav_btn">
           {{s.charAt(1)?.toUpperCase() + s.slice(2)}}
        </div>
         
    </div>

    <div class="ham_logo_container">
         <img src="/hamWhite.png" class="ham_logo" v-on:click="() => hamMenuVisible = !hamMenuVisible"/>
    </div>
</div>

<div v-if="!sideHam" class="hamMenu" :style="{
                              height: !hamMenuVisible? '0': `${(sections.length * 8) + 6}vh`,
                              borderBottom: !menuIsCollapsed? '2px solid black': 'none'}">
    <div class="hamMenuInner">

        <div v-for="(s, i) in sections">
            <div class="hamMenuSection" v-on:click="() => {hamMenuVisible = false ; router.push(s)}">
                {{s.charAt(1)?.toUpperCase() + s.slice(2)}}
            </div>
            
        </div>
    </div>

</div>

<div v-if="sideHam" class="sideHam" :style="{transform: hamMenuVisible? 'translateX(0%)': 'translateX(100%)'
                                            }">
    <div class="sideHamTop txt_lg">
         Navigation
         <img src="/right_arrow.png" class="sideHamImage" v-on:click="()=> hamMenuVisible = false"/>
    </div>
    <div v-for="(s, i) in sections">
 
        <div class="hamSideMenuSection txt_md" v-on:click="() => {hamMenuVisible = false ; router.push(s)}">
                {{s.charAt(1)?.toUpperCase() + s.slice(2)}}
        </div>
            
    </div>
</div>


</template>

<style scoped>
.nav_main{
    height: 12vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(115deg, rgb(81, 237, 143) 70%, rgb(255, 255, 255) 80%, rgb(81, 237, 143));
    border-bottom: 2px solid black; position: relative; gap: 4vw;
}
.btn_col{
     display: flex; justify-content: center; align-items: center;
}
.nav_btn{
    cursor: pointer; padding: 2vh; display: flex; align-items: center; 
    justify-content: center; width: 10vw;  border-radius: 5px; font-weight: bold;
}
.nav_btn:hover{
    background-color: rgba(0, 0, 0, 0.085);
}
.nav_icon{
    cursor: pointer; height: 55%;
}
.icon_container{
    position: absolute; left: max(2.5vw, 2.5vh); display: flex; align-items: center; height: 100%;
}
.ham_logo_container{
    position: absolute; right: 5.5vw; height: 100%;display: none; align-items: center;
}
.ham_logo{
    height: 55%; cursor: pointer; opacity: 0.9;
}
.hamMenu{
    
     transition: height 1.5s ease; overflow: hidden; background-color: rgba(246, 246, 246, 0.934);
     display: none; border-radius: 8px;
}
.hamMenuInner{
    padding: 3vh; display: flex; flex-direction: column; align-items: center; 
}
.hamMenuSection{
    height: 8vh; display: flex; align-items: center; cursor: pointer; width: 90vw; justify-content: center;
   
    
}
.sideHam{
    transform: translateX(100%); width: 100%; height: 100vh;background: linear-gradient(rgb(0, 136, 255), white);
    position: fixed; right: 0; top: 0px; transition: transform 1.5s ease; z-index: 100000;
    display: flex; flex-direction: column; align-items: center; 
    border: 1px solid black; font-weight: bold; box-shadow: inset 0 0 0 2px black;
    
}
.hamSideMenuSection{
    cursor: pointer; display: flex; justify-content: center; height: 15vh;
     padding: 4vh; display: flex; align-items: center;
    width: 90vw; 
}
.sideHamTop{
    height: 12vh; border-bottom: 4px solid black; display: flex; justify-content: center;
     align-items: center; position: relative; width: 100%; background-color: rgba(0, 0, 0, 0.038);
     margin-bottom: 2vh;
    
}
.sideHamImage{
    height: 80%; position: absolute; right: 0; padding-right: 3vw; margin-top: 0.3vh;
}

@media (max-width:600px){
    .btn_col{
        display: none;
    }
    .ham_logo_container{
        display: flex;
    }
    .hamMenu{
        display: block;
    }
}
</style>