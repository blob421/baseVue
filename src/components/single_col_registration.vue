<script setup lang="ts">

import { FormValidator } from '@/utility/form_validator';
import { submitForm } from '@/utility/formSubmit';
import { computed, toRefs, ref } from 'vue';

const {password, passwordConfirm, passwordsMatch, email, name, isEmailValid,
    firstName, lastName, passwordStrength, userName, usernameValid, isPasswordValid
} = FormValidator(true)




type Form = {
    fields?: {name: string, type: string, value: string}, url: string, formTitle: string, useEmail:boolean
}
const formProps = defineProps<Form>()
const {fields, url, formTitle, useEmail} = toRefs(formProps)

const company = ref('')
const fieldsData = computed(()=>{

    let init:Record<string, any> = {}

    formFields.forEach(field => {
        if (field.use){
            init = {...init, ...field.value}
        }
    })
    return init
  
})

const formFields = [{name: 'First Name', type: 'text', value: firstName, use:true},
                  {name: 'Last Name', type: 'text', value: lastName, use:true},
                  {name: 'Username', type: 'text', value: userName, use: true},
                  {name: 'New Password', type: 'password', value: password, use: true},
                  {name: 'Confirm Password', type: 'password', value: passwordConfirm, use:true},
                  {name: 'Email', type: 'email', value: email, use: useEmail.value},
                  {name: 'Company', type: 'text', value: company, use: true},
                 ]
</script>


<template>

  <div class="row d-flex justify-content-center">
     
    <form class="user_form" @submit.prevent="submitForm(url, '/', '/success', fieldsData)">

        <div class="col-11 col-md-4">

            <h1 class="txt_xl pb-5">

             {{ formTitle }}

            </h1>
           

        </div>
        <div v-for="(f, idx) in formFields" class="input_div txt_sm">
               <input :type="f.type" :placeholder="f.name" v-model="f.value.value" required>

               <div v-if="!usernameValid && f.name == 'Username'" class="text_guide txt_xs pt-3 pb-2">
                1-21 characters
              </div>

               <ul v-if="!isPasswordValid && f.name == 'New Password'" class="text_guide_ul txt_xs pt-3 pb-0">
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

                <div v-if="!passwordsMatch && f.name == 'Confirm Password'" class="txt_xs pt-2 pb-2">
                     Passwords don't match
                </div>

                 <div v-if="!isEmailValid && f.name == 'Email'" class="text_guide pt-2 pb-2"> 
                    example@provider.com   
                 </div>
        </div>
     

           <div class="input_div txt_md pt-3">
          <input type="submit" value="Register" style="height: 6vh;" />
          </div>
    </form>
    
  </div>


</template>



<style scoped>



.input_div{
  width: 90%;
}

.user_form{
  gap: 1vh; display: flex; flex-direction: column; background-color: antiquewhite;
  padding: 3%; justify-content: center;  align-items: center; padding-top: 4vh;
  border-radius: 4px; border: 1px solid black; position: relative; width: 30vw;
 
}
ul {
  padding-left: 1.1vw;
 
}
input{
  width: 100%; height: 5.5vh; 
}

</style>