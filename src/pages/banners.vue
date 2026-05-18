<script setup lang="ts">

import slide_in_banner from '@/components/slide_in_banner.vue';
import info_banner from '@/components/info_banner.vue';

</script>


<template>
<div :style=" {height: '100vh' }">

</div>

 <info_banner :slides="['test', 'another_text', 'again', '4th', '5th']"/>

<div :style=" {height: '10vh' }"></div>
<slide_in_banner text="Helloooo" :height="20"/>
<div :style=" {height: '100vh' }"></div>

</template>


<style>

</style>