export async function apiClient(url, options={}){
    try{
    const response=await fetch(url, options);
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
     if (response.status === 204) {
     return null;
    }
     const data=await response.json();
    return data;
    }catch(error){
    console.error("API Client Error:", error);
    throw error;
    }
}
