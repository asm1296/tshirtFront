import React, { ChangeEvent, useState } from 'react';
import { isAuthenticate } from '../auth/helper';
import Base from '../core/Base';
import { Link} from 'react-router-dom'
import { createCategory } from './helper/adminapicall'

const AddCategory = ()=>{

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAuthenticate();

    const catgoryChange=(event:ChangeEvent<HTMLInputElement>)=>{
        setError(false);
        setName(event.target.value)
    }

    const onSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setError(false);setSuccess(false);
        createCategory(user._id, token, {name})
        .then((data)=>{
            if(data.error){
                setError(true)
            }
            else{
                setError(false);setSuccess(true);
                setName("");
            }
        })
    }

    const successMessage = ()=>{
       return (
           <div className="row">
               <div className="col-md-12 mt-2">
               <div
                    style={{display:success?"":"none"}}
                    className="alert alert-success p-2">Category Added Successfully</div>
               </div>
           </div>
       )
    }

    const errorMessage = ()=>{
        return (
            <div className="row">
                <div className="col-md-12 mt-2">
                <div
                     style={{display:error?"":"none"}}
                     className="alert alert-danger p-2">Unsuccessful attempt to add Category</div>
                </div>
            </div>
        )
     }

    const addCategoryForm = ()=>{
        return(
            <form>
                <div className="px-3">
                    {errorMessage()}
                    {successMessage()}
                </div>
                <div className="form-group px-3">
                    <label>Enter New Category</label>
                    <input type="text" onChange={catgoryChange} className="form-control my-3" value={name} autoFocus placeholder="For Ex. Summer" />
                    <button onClick={onSubmit} className="btn btn-outline-info mb-3">Create Category</button>
                </div>
            </form>
        )
    }

    const goBack=()=>{
        return(
            <div className="mt-3 pb-3 px-3">
                <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Admin Dashboard</Link>
            </div>
        )
    }

    return(
        <Base title="Add Category" description="Add new categories of products">
            <div className="row container bg-success p-4 mx-auto">
                <div className="col-md-10 offset-md-1 bg-white rounded">
                    {addCategoryForm()} {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory;