<script setup lang="ts">

import { FormValidator } from '@/utility/form_validator';
import { submitForm } from '@/utility/formSubmit';
import { toRefs } from 'vue';
import type { FormProps } from '@/types';


const formProps = defineProps<FormProps>()
const PropsCopy = {...formProps}

const validator = FormValidator(PropsCopy)
const {url, title} = toRefs(formProps)

</script>


<template>

  <div class="row d-flex justify-content-center">
      <div class="col-11 col-md-8 col-lg-4 form_main_col">
    <form class="user_form" @submit.prevent="submitForm(url, '/', '/success', validator.fieldsData.value)">

       

            <h1 class="txt_xl pb-5">

             {{ title }}

            </h1>
           

        
        <div v-for="(f, idx) in validator.fields.data" class="input_div txt_sm" :key="idx">
               <input :type="f.type" :placeholder="f.string" v-model="f.value.value" required>

               <div v-if="!validator.usernameValid?.value && f.string == 'Username'" class="txt_xs pt-3 pb-2">
                1-21 characters
              </div>

               <ul v-if="!validator.isPasswordStrong?.value && f.name == 'password'" class="text_guide_ul txt_xs pt-3 pb-0">
                    <li>
                        At least one uppercase letter
                    </li>
                    <li>
                        At least one digit
                    </li>
                    <li>
                        One special character (@$!%*?&)
                    </li>
                    <li>
                        Min 8 characters
                    </li>
                </ul>

                <div v-if="!validator.passwordsMatch?.value && f.string == 'Confirm Password'" class="txt_xs pt-2 pb-2">
                     Passwords don't match
                </div>

                 <div v-if="!validator.isEmailValid?.value && f.string == 'Email'" class="pt-2 pb-2"> 
                    example@provider.com   
                 </div>
        </div>
     

           <div class="input_div txt_md pt-3">
          <input type="submit" value="Register" style="height: 6vh;" />
          </div>

    </form>
    </div>
  </div>


</template>



<style scoped>



.input_div{
  width: 90%;
}

.user_form{
  gap: 1vh; display: flex; flex-direction: column; background-color: antiquewhite;
  padding: 3%; justify-content: center;  align-items: center; padding-top: 4vh;
  border-radius: 4px; border: 1px solid black;
 
}
ul {
  padding-left: max(1.1vw, 1.8vh);
 
}
input{
  width: 100%; height: 5.5vh; 
}

@media (orientation: portrait) and (min-width: 820px){
    .form_main_col{
        flex: 0 0 90%;
    }
}
</style>