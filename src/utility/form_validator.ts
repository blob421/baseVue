
import {ref, computed} from 'vue'
import type { FormProps, FormFields, FilteredFormFields} from '@/types'


export function FormValidator(props:FormProps, split=false){

    //////////////////////////////////////////// REFS ///////////////////////////////////////////////////////

    const company = props.useCompany ? ref('') : null
    const password = props.usePasswords || props.useAltPassword ? ref('') : null
    const passwordConfirm = props.usePasswords || props.useAltPassword ? ref('') : null
    const email = props.useEmail ? ref('') : null
    const name = props.useFullName? ref('') : null
    const firstName = props.useNames ? ref('') : null
    const lastName = props.useNames ? ref('') : null
    const username = props.useUsername ? ref('') : null
    const message = props.useMessage ? ref('') : null

    ////////////////////////////////////////// FIELDS MAPPING //////////////////////////////////////////////
 
    const fieldMapping:FormFields[] = [

        {'name': "name", 'string': 'Full Name', 'type': 'text', 'value': name},
        {'name': "firstName", 'string': 'First Name', 'type': 'text', 'value': firstName},   
        {'name': "lastName", 'string': 'Last Name', 'type': 'text', 'value': lastName},
        {'name': "email", 'string': 'Email', 'type': 'email', 'value': email},
        
        {'name': "username", 'string': 'Username', 'type': 'text', 'value': username},
        {'name': "password", 'string': 'Password', 'type': 'password', 'value': password},
        {'name': "passwordConfirm", 'string': 'Confirm Password', 'type': 'password', 'value': passwordConfirm},
        {'name': "company", 'string': 'Company', 'type': 'text', 'value': company},
        {'name': 'message', 'string': 'Message', 'type': 'textarea', 'value': message}

    ]
    let fields:any = {}
    if (!split){
        fields['type'] = 'one'
        fields['data'] = [fieldMapping.filter((f)=> {
                if(f.value){
                    return f
                }
            })]
    }
    else {
            let result:Array<FormFields> = []
            let result2:Array<FormFields> = []
            fieldMapping.forEach((o, idx) => {
            if(o.value){
                if(idx <= 3) {
                    result.push(o)
                  }
               
                else {
                  result2.push(o)
                }
            }
            })
            fields['type'] = 'two'
            fields['data'] = [result, result2] 
    }


   ////////////////////////////////////// COMPUTED FIELDS CHECKS //////////////////////////////////////

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#|")(_^-]).{8,}$/;
    const moderatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    const weakPassword = /^(?=.*[a-z\d]).{8,}$/

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const usernameValid = username && computed(() => {
        const regex = /^[a-zA-Z0-9_-]{1,20}$/;
        return regex.test(username.value);
    });

  
  
    const isPasswordStrong = password && computed(() => {
       
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
     
        return passwordRegex.test(password.value);
    });

   
    const passwordStrength = password && computed(()=>{
       

            if (password.value.length < 8 && password.value.length > 1){
                return {code: 1, msg: 'Minimum 8 characters'}
            }
            else if (strongPassword.test(password.value)){
                return {code: 2, msg: 'Strong'}
            }
            else if (moderatePassword.test(password.value)){
                return {code: 3, msg: 'Moderate'}
            }
            else if (weakPassword.test(password.value)){
                return {code: 4, msg: 'Weak'}
            }
        
           return {code: 0, msg:null}
        }
        
    )

    const passwordsMatch = passwordConfirm && password && computed(() => {
        if (passwordConfirm.value.length > 2){
            return passwordConfirm.value == password.value
        }
        return true
    })
    const isEmailValid = email && computed(()=> {
        if (email.value.length > 2){
            return emailRegex.test(email.value)
        }
        return true
    })

    //////////////////////////////////////  FORM HANDLING  //////////////////////////////////////////////////


    const fieldsData = computed(()=>{

        let data:Record<string, any> = {}
        
        if (fields['type'] == 'one'){
            const fieldData = fields['data'] as Array<FilteredFormFields>
                fieldData.forEach(f=> {


                        if (f.value) data[f.name] = f.value.value;

                        })
        }
        else{
            const fieldData = fields['data'] as Array<Array<FilteredFormFields>>
            fieldData.forEach(a => {
                a.forEach(f => {
                    if (f.value) data[f.name] = f.value.value;
                })
            })
        }
        
        
        return data
     }
    )
    


    return {password, passwordConfirm, passwordsMatch,  email, name, firstName, company, fields,
        passwordStrength, isEmailValid, lastName, username, usernameValid, isPasswordStrong, fieldsData}

}

