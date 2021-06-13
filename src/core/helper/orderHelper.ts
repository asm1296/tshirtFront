import { API } from "../../backend";

export const createOrder=(userId:string,token:string,orderData:object)=>{
    return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers:{
            accept:"application/json",
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify({order:orderData})
    }).then(response=>{
        return response.json()
    }).catch(error=>console.log(error))
}

export const getSingleOrder=(userId:string,token:string,orderId:string)=>{
    return fetch(`${API}/order/${orderId}/${userId}`,{
        method:"GET",
        headers:{
            accept:"application/json",
            authorization:`Bearer ${token}`
        }
    }).then((response)=>{
        return response.json();
    }).catch(error=>{
        console.log(error)
    })
}

export const getMyOrders=(userId:string, token:string)=>{
    return fetch(`${API}/order/getMyOrders/${userId}`,{
        method:"GET",
        headers:{
            accept:"application/json",
            authorization:`Bearer ${token}`
        }
    }).then((response)=>{
        return response.json();
    }).catch((err)=>{
        console.log(err);
    })
}