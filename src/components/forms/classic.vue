<script setup lang="ts">

import { FormValidator } from '@/utility/form_validator';
import type { FormProps } from '@/types';
import { toRefs } from 'vue';
import { submitForm } from '@/utility/formSubmit';

const props = defineProps<FormProps>()
const propsCopy = {...props}
const apiUrl = import.meta.env.VITE_API_URL
const validator = FormValidator(propsCopy)
const {title, apiEndpoint, color, bgColor} = toRefs(props)
console.log(apiUrl)

</script>

<template>
<div class="row d-flex justify-content-center p-0 m-0" >
    <div class="col-11 col-sm-8 form_main p-4 p-sm-5" 
         :style="{backgroundColor: bgColor? bgColor: 'antiquewhite', color: color? color: 'black'}" 
         :class="validator.fields.data.length == 2? 'col-lg-7 col-md-10': 'col-lg-4 col-md-6'">

        <form @submit.prevent="submitForm(apiUrl + apiEndpoint, '/', '/success', validator.fieldsData.value)">
            <h1 class="form_title txt_xl text-start text-lg-start mt-3 mb-5">{{ title }}</h1>

            <div class="row d-flex justify-content-center txt_md pt-md-2">
                <div v-for="(s, sidx) in validator.fields.data" class="form_cols d-flex flex-column"
                    :class="validator.fields.data.length == 2 ? 'col-md-6 col-12'
                                                            : 'col-12'" :key="sidx">


                    <div v-for="(f, idx) in validator.fields.data[sidx]" :key="idx">
                        <input v-if="f.type !== 'textarea'" :type="f.type" class="input_form" 
                                                            :class="{'red_borders':!validator.isEmailValid?.value && f.name =='email'}"
                                                            v-model="f.value.value" :placeholder="f.string">

                        <textarea v-if="f.type == 'textarea'" v-model="f.value.value" required
                                                              :placeholder="f.string" 
                                                              :maxlength="200" class="textarea_form">

                        </textarea>
                        <div class="error_container txt_sm">
                            <div v-if="f.name == 'email' && !validator.isEmailValid?.value">
                                        Invalid email
                            </div>
                        </div>
                      
                    </div>


                </div>
            </div>
            <div class="submit_cont p-1 pt-3 pb-0">
                 <input type="submit" value="Submit" class="submit_input txt_md"/>
            </div>

        </form>
    </div>
</div>

</template>

<style scoped>
.form_main{
    border: 2px solid black; border-radius: 5px;
}
.input_form, textarea {
    width: 100%; padding-left: max(0.2vw, 0.5vh);
}

.form_title{
    
}
.error_container{
     height: 4.5vh; color: rgb(209, 92, 92); padding-left: 0.05vw; display: flex; align-items: center;
}
.textarea_form{
    min-height: 25vh;
}
.red_borders{
    border: 1px solid red;
}
.red_borders:focus{
    outline: 1px solid rgba(233, 122, 122, 0.982) !important;
 border: 1px solid red !important; border-radius: 1px;
}
.submit_cont{
    display: flex; justify-content: end;
}
.submit_input{
    width: max(13vw, 18vh); height: max(4vw, 6vh);
}
@media (orientation: portrait) and (max-width: 820px){
    .form_main{
        flex: 0 0 90%;
    }
}
</style>