<script setup lang="ts">

import modern from '@/components/forms/modern.vue';
import single_col_compact from '@/components/forms/single_col_compact.vue';
import classic from '@/components/forms/classic.vue';

</script>

<template>
<classic title="Contact Us" url="/" :use-email="true" :use-message="true" :use-names="true"/>

 <modern title="Register" :useEmail="true" :useFullName="true" url="test.text.com:8000" 
 shadowColor="rgb(51, 143, 161)" :use-company="true" :split-col="true"
 :use-message="true"/>

 <single_col_compact :useEmail="true" title="Register" url="test.test.com:8000"
 :useUsername="true" :use-company="true" :use-full-name="true" :use-alt-password="true" />

</template>


<style>

</style>