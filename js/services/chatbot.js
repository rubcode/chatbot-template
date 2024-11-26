const BASE_API = "http://127.0.0.1:8000/sendQuestion"

async function fetchHandler(url,options){
    const response = await fetch(url,options)
    if(!response){
        return{
            data: null,
            isError: true
        }
    }
    const data = await response.json()
    return{
        data,
        isError: false
    }
}

export async function getResponseLLM(data){
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return fetchHandler(`${BASE_API}/`,options);
}