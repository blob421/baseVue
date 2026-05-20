<script setup lang="ts">

import split_form from '@/components/registration_form.vue';
import single_col_registration from '@/components/single_col_registration.vue';
</script>

<template>
 <split_form title="Register" :useEmail="true" :useFullName="true" url="test.text.com:8000" 
 shadowColor="rgb(51, 143, 161)" :useUsername="true" :use-passwords="true"/>

 <single_col_registration :useEmail="true" title="Register" url="test.test.com:8000"
 :useUsername="true" :use-company="true" :use-full-name="true" :use-alt-password="true"/>
</template>

<style>

</style>