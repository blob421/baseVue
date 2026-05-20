<script setup lang="ts">
import {ref, toRefs, computed} from 'vue'

import {FormValidator} from '@/utility/form_validator.ts';

const {password, passwordConfirm, passwordsMatch, email, name, isEmailValid,
    firstName, lastName, passwordStrength
} = FormValidator()

type Form = {
    title: string, useName?: 'full' | 'split', age?: boolean, tickboxes?: {label: string, value:boolean}[],
                   useEmail: boolean, apiUrl: string, bgColor?: string, color?: string, shadowColor?: string
}

const form = defineProps<Form>()

const {useName, useEmail, title, apiUrl} = toRefs(form)

const left_col_inputs = [{name: 'First Name', type: 'text', value: firstName, use: useName.value == 'split'}, 
                         {name: 'Last Name', type: 'text', value: lastName, use: useName.value == 'split'},
                         {name: 'Full Name', type: 'text', value: name, use: useName.value == 'full'}, 
                         {name: 'Email', type: 'email', value: email, use: useEmail.value}]

const right_col_inputs = [ 
                          {name: 'New Password', type: 'password', value: password, use: true},
                          {name: 'Confirm Password', type: 'password', value: passwordConfirm, use:true}]


</script>

<template>

<div class="row d-flex justify-content-center p-0 m-0">
    <form class="split_form_main col-lg-7 col-sm-12 col-11 pt-lg-3 pt-4 p-sm-5 p-2 p-lg-5 pb-5" 
          method="POST" :action="apiUrl" 
           :style="{backgroundColor: bgColor? bgColor : 'rgb(52, 55, 65)',
            boxShadow: shadowColor ? `inset 0 0 12px min(0.4vw, 0.7vh) ${shadowColor}` 
                                   : 'none'
          }">

        <h1 class="title_form pt-lg-5 pt-4 p-4 txt_xl" :style="{color: color? color : 'white'}">{{title}}</h1>
        <div class="row justify-content-center d-flex p-0 m-0">
       

            <div class="col-lg-6 col-12 form_col txt_sm p-4 gap-5">

                <template v-for="(f, i) in left_col_inputs" :key="i">
                        <div v-if='f.use' class="field_wrapper d-flex flex-column 
                                                 justfy-content-center align-items-start gap-3 gap-md-2">

                            <div class="field_name" :style="{color: color? color : 'white'}">
                                {{ f.name }}
                            </div>

                            <input :type="f.type" v-model="f.value.value" required/>
                              <div v-if="f.type == 'email' && !isEmailValid" 
                              class="txt_xs error_password">
                                   Invalid email
                              </div>
                        </div>

         
                    
                </template> 
            </div>

                <div class="col-lg-6 col-12 form_col txt_sm p-4 pt-lg-4 pt-4 pt-sm-4 gap-5 pb-5">
                    
                    <template v-for="(f, i) in right_col_inputs" :key="i">
                            <div v-if='f.use' class="field_wrapper d-flex flex-column 
                            justfy-content-center align-items-start gap-3 gap-md-2">

                                    <div class="field_name" :style="{color: color? color : 'white'}">
                                        {{ f.name }}
                                    </div>
                                    <input :type="f.type"  v-model="f.value.value" required/>

                            <div v-if="f.name == 'New Password' && passwordStrength" 
                            class="txt_xs error_password pl-1" 

                            :class="{'pass_strong': passwordStrength && passwordStrength.code == 1,
                                     'pass_moderate': passwordStrength && passwordStrength.code == 2,
                                     'pass_weak': passwordStrength && passwordStrength.code == 3
                            }">
                               {{ passwordStrength.msg }}
                           </div>

                            <div v-if="f.name == 'Confirm Password' && !passwordsMatch" 
                            class="txt_xs error_password">
                                 Passwords don't match
                            </div>
                            </div>
          
                        

                   </template> 
            </div>
        </div>
         <div class="input_cont p-4 pt-2 pt-md-5 txt_md">
              <input :disabled="password.length < 8 || !passwordsMatch || passwordConfirm.length < 8" type="submit" value="submit" class="form_submit"/>

         </div>
      
    </form>
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
  font-weight: bold; margin-top: 1vh;
}
.form_col{
    display: flex; flex-direction: column; 
}
.title_form{
   margin-bottom: min(5vh, 3vw);
}

input {
  width: 99.5%; padding-left: max(0.3vw, 0.5vh);
}
.error_password{
    background-color: rgb(225, 209, 102); color: black; position: absolute; bottom: -5.2vh; 
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
    margin-top: 5vh;  width: max(12vw, 18vh); height: max(7vh, 4vw); display: flex; align-items: center;
}
</style>