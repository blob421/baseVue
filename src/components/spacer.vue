
<script setup lang="ts">

import {toRefs} from 'vue'

type spacer = {
    h: number
}
const props = defineProps<spacer>()
const {h} = toRefs(props)

</script>


<template> 


  <div class="row" p-0 m-0 :style="{height: `${h}vh`}">

  </div>


</template>