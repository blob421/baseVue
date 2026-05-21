<script setup lang="ts">
import {ref, toRefs, computed} from 'vue'
import {FormValidator} from '@/utility/form_validator.ts';

import type { FormProps} from '@/types';
import { submitForm } from '@/utility/formSubmit';


const form = defineProps<FormProps>()
const propsCopy = {...form}
const validator = FormValidator(propsCopy)
const {title, apiEndpoint, bgColor, shadowColor, color} = toRefs(form)
const apiUrl = import.meta.env.VITE_API_URL
</script>



<template>

<div class="row d-flex justify-content-center p-0 m-0" form_row>

    <div class="col-11 col-sm-9 pt-lg-3 pt-4 p-4 p-lg-5 p-2 p-sm-5 pb-5 split_form_main" 
         :class="validator.fields.data.length == 2? 'col-lg-7 col-md-9': 'col-lg-5 col-md-7'"
         :style="{backgroundColor: bgColor? bgColor : 'rgb(52, 55, 65)',
            boxShadow: shadowColor ? `inset 0 0 12px min(0.4vw, 0.7vh) ${shadowColor}` 
                                   : 'none'}">

    <form @submit.prevent="submitForm(apiUrl + apiEndpoint, '/', '/success', validator.fieldsData.value)">

        <h1 class="title_form pt-lg-5 pt-4 p-4 txt_xl" :style="{color: color? color : 'white'}">{{title}}</h1>
       
        <div class="row justify-content-center d-flex p-0 m-0">
       

            <div v-for="(a, aidx) in validator.fields.data" :key="aidx"
                class="form_col txt_sm p-4 pb-0 pt-0 gap-2" 
                :class="validator.fields.data.length == 2? 'col-12 col-md-6': 'col-12'">

                <template v-for="(f, i) in validator.fields.data[aidx]" :key="i">
                        <div class="field_wrapper d-flex flex-column 
                                                 justfy-content-center align-items-start gap-1 gap-md-2">

                            <div class="field_name pb-2" :style="{color: color? color : 'white'}">
                                {{ f.string }}
                            </div>
                            
                            <input v-if="f.type !== 'textarea'" :type="f.type" 
                                   v-model="f.value.value" required/>

                            <textarea v-if="f.type == 'textarea'" 
                                      v-model="f.value.value" :placeholder="f.string" 
                                      :maxlength="200" class="textarea_form" required>

                            </textarea>
                            <div class="error_cont p-0 m-0">
                                <div v-if="f.type == 'email' && !validator.isEmailValid?.value" 
                                class="txt_xs error_password">
                                    Invalid email
                                </div>

                                  <div v-if="f.name == 'password' && validator.passwordStrength?.value.code" 
                                class="txt_xs error_password pl-1" 

                                :class="{'pass_strong':  validator.passwordStrength.value?.code == 2,
                                        'pass_moderate':  validator.passwordStrength.value?.code == 3,
                                        'pass_weak':  validator.passwordStrength.value?.code == 4
                                }">
                                {{  validator.passwordStrength.value?.msg }}
                                </div>

                                <div v-if="f.string == 'Confirm Password' && ! validator.passwordsMatch?.value" 
                                class="txt_xs error_password">
                                    Passwords don't match
                                </div>
                              </div>

                        </div>

         
                    
                </template> 
            </div>

               
        </div>
         <div class="input_cont p-4 pt-4 pt-md-0 pb-md-0 pt-md-5 txt_md">
              <input :disabled="!validator.passwordsMatch?.value 
                      || validator.passwordStrength?.value.code == 0" type="submit" value="submit" class="form_submit"/>

         </div>
      
    </form>
    </div>
</div>

</template>

<style scoped>
.split_form_main {
    border: 5px solid black;
    border-radius: 9px; color: white; 

}
.field_wrapper{
    display: flex; position: relative; align-items: center; 
    width: 101%; 
}
.field_name{
  font-weight: bold;
}
.form_col{
    display: flex; flex-direction: column; 
}
.title_form{
   margin-bottom: min(10vh, 10vw);
}

input {
  width: 99.5%; padding-left: max(0.3vw, 0.5vh);
}
.error_cont{
    height: 5vh;  width: 100%;
}
.error_password{
    background-color: rgb(225, 209, 102); color: black;
    height: 4.2vh;
    display: flex; align-items: center; padding-left: max(0.3vw, 0.5vh);
    width: 100%; border: 2px solid black; border-radius: 4px; margin: 0; 
}
.pass_weak{
  background-color: rgb(238, 116, 102);
}
.pass_strong {
   background-color: greenyellow; border: 2px solid rgb(0, 0, 0); border-radius: 4px;
   
}
.pass_moderate{
    background-color: rgb(227, 207, 73);
}
.input_cont{
    display: flex; justify-content: flex-end;
}
.form_submit{
     width: max(12vw, 18vh); height: max(7vh, 4vw); display: flex; align-items: center;
}
.textarea_form{
    min-height: 25vh; width: 99.5%;
}
@media (orientation: portrait) and (min-width: 820px) {
   .split_form_main {
    flex: 0 0 90% !important
   }
}
</style>

