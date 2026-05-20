<script setup lang="ts">

import split_form from '@/components/registration_form.vue';

</script>

<template>
 <split_form title="Register" :useEmail="true" useName="split" apiUrl="test.text.com:8000" 
 shadowColor="rgb(51, 143, 161)" />
</template>

<style>

</style>