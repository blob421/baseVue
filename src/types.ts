import type { Ref } from "vue"

export type FormProps = {
    usePasswords?: boolean, useEmail?: boolean, useFullName?: boolean, useNames?: boolean, 
    useUsername?: boolean, useAltPassword?: boolean, useCompany?: boolean, useMessage?: boolean
    apiEndpoint:string, title:string, splitCol?: boolean,
    color?: string, shadowColor? :string, bgColor?: string
}

export type FormFields = {
    name: string, string: string, type: string, value: Ref<any, any> | null
}

export type FilteredFormFields = {
   name: string, string: string, type: string, value: Ref<any, any> 
}