import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/helper';
import Base from '../core/Base';
import { deleteCategory, getallCategories, updateCategory } from './helper/adminapicall';

type categoryType={
    _id:string,
    name:string
}

const ManageCategory = ()=>{

    const [categoryId, setCategoryId] = useState("");
    const [categoryName,setCategoryName] = useState("");
    const [categories,setCategories] = useState([])
    const [values,setValues] = useState({
        error:"",
        isSave:"",
        isUpdated:false
    })
    const {error,isSave,isUpdated} = values;
    const {user,token} = isAuthenticate();

    const preloadData=()=>{
        getallCategories().then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setCategories(data)
            }
        })
    }

    useEffect(()=>{
        preloadData()
    },[])

    const deleteThisCategory =(cateId:string)=>{
        deleteCategory(user._id,cateId,token).then(data=>{
            if(data.error){
                setValues({
                    ...values,
                    error:data.error
                })
            }
            else{
                preloadData()
            }
        })
    }

    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setCategoryName(event.target.value)
    }

    const handleSave = (cate:categoryType)=>{
        setValues({
            ...values,
            isSave:cate._id
        })
        setCategoryName(cate.name);
        setCategoryId(cate._id)
    }

    const handleSaveClick = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        updateCategory(user._id, categoryId,token,categoryName)
        .then(data=>{
            if(data.error){
                setValues({
                    ...values,
                    error:data.error
                })
            }
            else{
                preloadData();
                setValues({
                    ...values,
                    isSave:"",
                    isUpdated:true,
                    error:""
                })
                setCategoryId("");
            }
        })
    }

    return(
        <Base title="Welcome admin" description="Manage Category Here">
            <>
                <h3 className="text-white">All Categories</h3>
                <Link className="btn btn-warning" to="/admin/dashboard">
                    <span>Admin Home</span>
                </Link>
                <div className="row mb-3">
                    <div className="col-12">
                        <h4 className="text-white text-center mb-3">Total {categories.length} Categories</h4>
                    </div>
                </div>
                {categories.map((cate:categoryType,index)=>{ 
                return (<div key={index} className="row text-center mb-2">
                    <div className="col-4">
                        {isSave === cate._id ?<div key={index} className="form-group">
                            <input type="text" onChange={handleChange} className="form-control" value={categoryName} />
                        </div> :
                        <h5 key={index} className="text-white ">{cate.name}</h5>}
                    </div>
                
            
                    <div className="col-4">
                        { isSave === cate._id ? <div key={index}>
                            <button onClick={handleSaveClick} className="btn btn-info mx-3">SAVE</button>
                            <button onClick={()=>{setValues({...values,isSave:""})}} className="btn btn-info">CANCEL</button>
                        </div> :
                        <button key={index} onClick={()=>{handleSave(cate)}} className="btn btn-success">
                            UPDATE
                        </button>}
                    </div>               
               
                    <div className="col-4">
                        <button onClick={()=>{deleteThisCategory(cate._id)}} className="btn btn-danger">
                            DELETE
                        </button>
                    </div>
               </div>)})}
            </>
        </Base>
    )
}

export default ManageCategory;