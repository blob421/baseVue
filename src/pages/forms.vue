<script setup lang="ts">

import split_form from '@/components/registration_form.vue';
import single_col_registration from '@/components/single_col_registration.vue';
</script>

<template>
 <split_form title="Register" :useEmail="true" useName="split" apiUrl="test.text.com:8000" 
 shadowColor="rgb(51, 143, 161)" :useUsername="false"/>

 <single_col_registration :useEmail="true" formTitle="Register" url="test.test.com:8000"/>
</template>

<style>

</style>