

import router from '../router';

export async function submitForm(url:string, fallbackRoute:string, successRoute: string, data:object){
   
    const resp = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data)
    })

    if (resp.ok){
       router.push(successRoute)
    }
    else{
       router.push(fallbackRoute)
    }
}

