
import {ref, computed} from 'vue'

export function FormValidator(){

    const password = ref('')
    const passwordConfirm = ref('')
    const email = ref('')
    const name = ref('')
    const firstName = ref('')
    const lastName = ref('')

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#|")(_^-]).{8,}$/;
    const moderatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    const weakPassword = /^(?=.*[a-z\d]).{8,}$/

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const passwordStrength = computed(()=>{
        if (password.value.length < 8 && password.value.length > 1){
            return {code: 0, msg: 'Minimum 8 characters'}
        }
        else if (strongPassword.test(password.value)){
            return {code: 1, msg: 'Strong'}
        }
        else if (moderatePassword.test(password.value)){
            return {code: 2, msg: 'Moderate'}
        }
        else if (weakPassword.test(password.value)){
            return {code: 3, msg: 'Weak'}
        }
    })

    const passwordsMatch = computed(() => {
        if (passwordConfirm.value.length > 2){
            return passwordConfirm.value == password.value
        }
        return true
    })
    const isEmailValid = computed(()=> {
        if (email.value.length > 2){
            return emailRegex.test(email.value)
        }
        return true
    })



    return {password, passwordConfirm, passwordsMatch,  email, name, firstName, 
        passwordStrength, isEmailValid, lastName}

}
