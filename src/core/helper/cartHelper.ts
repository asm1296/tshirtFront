export const addItemToCart=(item:object)=>{
    let cart = [];
    if( typeof window !== undefined){
        if(localStorage.getItem("cart")){
            let local = localStorage.getItem("cart") || ""
            cart = JSON.parse(local)
        }
        cart.push(item);
        localStorage.setItem("cart",JSON.stringify(cart))
    }
}

export const loadCart = ()=>{
    if( typeof window !== undefined){
        if(localStorage.getItem("cart")){
            let local = localStorage.getItem("cart") || ""
            return JSON.parse(local)
        }else{
            let cart:Array<any> = [];
            localStorage.setItem("cart",JSON.stringify(cart))
            return cart;
        }
    }
}

export const removeItemFromCart =(item:string)=>{
    let cart:Array<any>=[]
    if( typeof window !== undefined){
        if(localStorage.getItem("cart")){
            let local = localStorage.getItem("cart") || ""
            cart = JSON.parse(local) 
        }
        cart.map((prod, i)=>{
            if(prod._id === item){
                cart.splice(i,1)
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        let local = localStorage.getItem("cart") || ""
        return JSON.parse(local)
    }
}

export const emptyCart = (next:()=>void)=>{
    if( typeof window !== undefined){
        localStorage.removeItem("cart")
    }
    next();
}