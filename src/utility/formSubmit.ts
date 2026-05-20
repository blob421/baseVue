import { useRouter } from "vue-router"

const router = useRouter()

export async function submitForm(url:string, fallbackRoute:string, successRoute: string, data:object){
    
    const resp = await fetch(url, {
        credentials: 'include',
        body: JSON.stringify(data)
    })

    if (resp.ok){
       await router.push(successRoute)
    }
    else{
       await router.push(fallbackRoute)
    }
}