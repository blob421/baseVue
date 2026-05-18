
const authUrl = import.meta.env.VITE_AUTH_URL


export default async function tokenValid() {


    const response = await fetch(authUrl, {
      method : 'GET',
      credentials: 'include',

    })

    if (response.ok){
        return true

    }

  }
