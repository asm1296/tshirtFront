import { API } from "../../backend";

export const getTokenFromServer=(userId:string,token:string)=>{
    return fetch(`${API}/payment/getToken/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{return response.json()})
    .catch(error=>console.log(error))
}

export const processPaymentInit =(userId:string,token:string,paymentInfo:object)=>{
    return fetch(`${API}/payment/processPayment/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(paymentInfo)
    })
    .then(response=>{return response.json()})
    .catch(error=>console.log(error))
}