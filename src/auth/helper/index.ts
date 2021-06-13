import { FunctionBody } from 'typescript';
import { API } from '../../backend';



export const signup = (user:object) =>{
    console.log("signup method")
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response =>{return response.json()} )
    .catch(err => console.log(err))
}

export const signin =(user:object)=>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const authenticate = (data:object, next:()=>void) =>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next();
    }
}

export const signout = (next:()=>void) =>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next()
        return fetch(`${API}/signout`,{
            method:"GET"
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
}

export const isAuthenticate = (next?:()=>void) =>{
    if(typeof window == "undefined"){
        return false
    }
    else if(localStorage.getItem("jwt")){
        let local = localStorage.getItem("jwt") || ""
         return JSON.parse(local)
    }
    else{
        return false
    }
}