import React, { useState } from 'react';
import Base from '../core/Base';
import { Link, Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticate } from '../auth/helper/index'

const Login =()=>{

    const [values,setValues] = useState({
        email:"",
        virtualPassword:"",
        error:"",
        loading:false,
        redirectTo:false
    })

    const {email, virtualPassword, error, loading, redirectTo} = values;
    const {user} = isAuthenticate();

    const inputHandler = (name:string) => (event:React.ChangeEvent<HTMLInputElement>)=>{
        setValues({
            ...values,
            [name]:event.target.value
        })
    }

    const onSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        setValues({...values,loading:true,error:""})
        signin({email, virtualPassword})
        .then((data)=>{
            if(data.error){
                setValues({...values,error:data.error, loading:false})
            }
            else{
                authenticate(data, ()=>{
                    setValues({...values, 
                        email:"",
                        virtualPassword:"",
                        loading:false,
                        error:"",
                        redirectTo:true
                    })
                })
            }
        })
        .catch((error)=>{console.log(error)})

    }

    const loginForm =()=>{
        return(
            <div>
                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <form>
                            <div className="form-group pb-3">
                                <label className="text-light" style={{fontWeight:"bold"}}>Email</label>
                                <input value={email} onChange={inputHandler("email")} type="email" className="form-control"/>
                            </div>
                            <div className="form-group pb-3">
                                <label className="text-light" style={{fontWeight:"bold"}}>Password</label>
                                <input value={virtualPassword} onChange={inputHandler("virtualPassword")} type="password" className="form-control"/>
                            </div>
                            <button onClick={onSubmit} className="btn btn-success mb-4 w-100"><b>Submit</b></button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mx-auto text-center text-white">
                        <h6><span className="border border-white p-2 rounded"><b>New User ?</b></span></h6>
                        <Link to="/signup"><button className="btn btn-success w-100 my-3"><b>Sign Up Now</b></button></Link>
                    </div>
                </div>
            </div>
        )
    }

    const performRedirect =()=>{
        if(redirectTo){
            if(user && user.role === 1){
                <Redirect to="/admin/dashboard" />
            }
            else{
                <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticate()){
           return <Redirect to="/" />
        }
    }

    const loadingMessage = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    { redirectTo && <div className="alert alert-info"><h4>Loading ...</h4></div>  }                    
                </div>
            </div>
        )
    }

    const errorMessage = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                    style={{display: error ? "" :"none"}}
                    className="alert alert-danger">
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    return(
        <Base title="Log In Page" description="Get ready for unique shopping experience">
            <div>
                {loadingMessage()}
                {errorMessage()}
                {loginForm()}
                {performRedirect()}
            </div>
        </Base>
    )
}

export default Login;