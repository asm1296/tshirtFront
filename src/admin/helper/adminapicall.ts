import { API } from "../../backend";

// category call

// Create Category
export const createCategory = (userId:string, token:string, category:object)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then((response)=>{
        return response.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

// Get All Categories
export const getallCategories =()=>{
    return fetch(`${API}/category/getCategories`,{
        method:"GET"
    })
    .then((response)=>{
        return response.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

// Update Category
export const updateCategory = (userId:string,categoryId:string,token:string,category:string)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({categoryName:category})
    }).then(response =>{
        return response.json()
    }).catch(error => console.log(error))
}

// Delete Category
export const deleteCategory = (userId:string,categoryId:string,token:string)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            authorization:`Bearer ${token}`,
            accept:"application/json"
        }
    }).then(response=>{
       return response.json()
    }).catch(error=>console.log(error))
}

// Product Calls

//Create Product
export const createProduct = (userId:string, token:string, product:BodyInit)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            accept:"application/json",
            authorization:`Bearer ${token}`
        },
        body:product
    })
    .then((response)=>{
        return response.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

// Update Product
export const updateProduct = (productId:string,userId:string,token:string,product:BodyInit) =>{
    return fetch(`${API}/product/update/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            accept:"application/json",
            authorization:`Bearer ${token}`
        },
        body:product
    })
    .then((response)=>{
        return response.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

//Delete Product
export const deleteProduct = (productId:string,userId:string,token:string) =>{
    return fetch(`${API}/product/remove/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            accept:"application/json",
            authorization:`Bearer ${token}`
        }
    })
    .then((response)=>{
        return response.json()
    })
    .catch((error)=>{
        console.log(error)
    })
}

// Get Product based on Id
export const getProduct = (productId:string) =>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then((response)=>{
        return response.json()
    })
    .catch(error=>{
        console.log(error)
    })
}

// Get All Products
export const getAllProducts = () =>{
    return fetch(`${API}/products`,{
        method:"GET"
    })
    .then((response)=>{
        return response.json()
    })
    .catch(error=>{
        console.log(error)
    })
}