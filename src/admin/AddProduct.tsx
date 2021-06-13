import React, {useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticate } from '../auth/helper';
import Base from '../core/Base';
import { createProduct, getallCategories } from './helper/adminapicall';

type categoryType={
  _id:string,
  name:string
}

const AddProduct = ()=>{

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
        createdProduct:"",
        isProductCreated:false
    })

    const {user, token} = isAuthenticate();

    const { 
      name, description, price, availableUnits, 
      photo, categories,category, getRedirected, 
      loading, formData,error,createdProduct, isProductCreated} = values;

    const preloadData =()=>{
      getallCategories()
      .then((data)=>{
        if(data.error){
          setValues({...values, error:data.error})
        }else{
          setValues({...values,categories:data})
        }
      })
    }

    useEffect(()=>{
      preloadData()
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
        createProduct(user._id,token,formData)
        .then((data)=>{
          if(data.error){
            setValues({...values,error:data.error, loading:false})
          }else{
            setValues({...values,error:"",loading:false,
              name:"", price:"",description:"",availableUnits:"", photo:File,category:"",
              getRedirected:true,createdProduct:data.name, formData:new FormData, isProductCreated:true})
          }
        })
    }

    const successMessage=()=>{
      return(
        <div className="alert alert-success mt-3"
      style={{display:isProductCreated?"":"none"}}>
        <p>Product {createdProduct} created successfully</p>
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
            Create Product
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

export default AddProduct;