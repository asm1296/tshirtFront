import React, {FC, useEffect, useState} from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { isAuthenticate } from '../auth/helper';
import Base from '../core/Base';
import { createProduct, getallCategories, getProduct, updateProduct } from './helper/adminapicall';

type categoryType={
  _id:string,
  name:string
}

type updateProductProps=RouteComponentProps<any>

const UpdateProduct:FC<updateProductProps> = ({match})=>{

    const [values,setValues] = useState({
        name:"",
        description:"",
        price:"",
        availableUnits:"",
        photo:File,
        categories:[],
        category:"",
        getRedirected:false,
        loading:false,
        formData:new FormData,
        error:"",
        updatedProduct:"",
        isProductUpdated:false
    })

    const {user, token} = isAuthenticate();

    const { 
      name, description, price, availableUnits, 
      photo, categories,category, getRedirected, 
      loading, formData,error,updatedProduct, isProductUpdated} = values;

    const preloadData =(productId:string)=>{

        let promises = [];
        promises.push(getallCategories());
        promises.push(getProduct(productId))
        Promise.all(promises).then((response)=>{
            let categoryData = response[0]
            let productData = response[1].ProductSearched
            if(categoryData.error && productData.error){
                setValues({
                    ...values,
                    error:categoryData.error
                })
            }
            else {
                setValues({
                    ...values,
                    name:productData.name,
                    description:productData.description,
                    price: productData.price,
                    availableUnits:productData.availableUnits,
                    category:productData.category._id,
                    categories:categoryData,
                    formData:new FormData
                })
            }
        }).catch(error=>console.log(error))

        /* getProduct(productId)
      .then((data)=>{
        if(data.error){
          setValues({...values, error:data.error})
        }else{
          setValues({
            ...values,
            name:data.name,
            description:data.description,
            price: data.price,
            availableUnits:data.availableUnits,
            category:data.category._id,
            formData:new FormData
        })
        }
      }) */
    }

    useEffect(()=>{
      preloadData(match.params.productId)
    },[])

    useEffect(()=>{
      setTimeout(()=>{
        redirectToAdmin()
      },2000)
    },[getRedirected])


    const handleChange = (name:string) => (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
      const value = event.target.value
      if(value){      
      formData.set(name,value);
      setValues({...values,[name]:value})
      }
  }

    const handlePhotoChange = (name:string) => (event:React.ChangeEvent<HTMLInputElement>) =>{
        const value = event.target.files
        if(value){      
        formData.set(name,value[0]);
        setValues({...values,[name]:value})
        }
    }

    const onSubmit = (event:React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault();
        setValues({...values, error:"",loading:true})
        updateProduct(match.params.productId,user._id,token,formData)
        .then((data)=>{
          if(data.error){
            setValues({...values,error:data.error, loading:false})
          }else{
            setValues({...values,error:"",loading:false,
              name:"", price:"",description:"",availableUnits:"", photo:File,category:"",
              getRedirected:true,updatedProduct:data.name, formData:new FormData, isProductUpdated:true})
          }
        })
    }

    const successMessage=()=>{
      return(
        <div className="alert alert-success mt-3"
      style={{display:isProductUpdated?"":"none"}}>
        <p>Product {updatedProduct} updated successfully</p>
      </div>
      )
    }

    const errorMessage=()=>{
      return(
        <div className="alert alert-danger mt-3"
        style={{display:error?"":"none"}}>
          <p>{error}</p>
        </div>
      )
    }

    const redirectToAdmin =()=>{
        if(getRedirected){
          <Redirect to="/admin/dashboard" />
        }
    }

    const createProductForm = () => (
        <form>
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handlePhotoChange("photo")}
                type="file"
                name="photo"
                accept="image/*"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control my-2"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control my-2"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control my-2"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              value={category}
              onChange={handleChange("category")}
              className="form-control my-2"
              placeholder="Category"
            >
              <option>Select Category</option>
              {categories.map((cate:categoryType, index)=><option key={index} value={cate._id}>{cate.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("availableUnits")}
              type="number"
              className="form-control my-2"
              placeholder="Quantity"
              value={availableUnits}
            />
          </div>
    
          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-success mb-3"
          >
            Update Product
          </button>
        </form>
      );

    return(
        <Base title="Add Product" description="Add your new products here..">
            <div className="row container mx-auto bg-success p-4">
                <div className="col-md-12">
                    <Link to="/admin/dashboard" className="btn btn-md btn-warning mb-3">Admin Home</Link>
                </div>
                <div className="row bg-dark text-white rounded">
                    <div className="col-md-8 offset-md-2">
                        {errorMessage()}
                        {successMessage()}
                        {createProductForm()}
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default UpdateProduct;