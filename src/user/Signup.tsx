import React,{useState} from 'react';
import Base from '../core/Base';
import {signup} from '../auth/helper/index';
import { Link } from 'react-router-dom';

const Signup =()=>{
    const [values,setValues] = useState({
        firstName :"",
        lastName :"",
        email:"",
        virtualPassword:"",
        error:"",
        success:false
    })

    const {firstName, lastName, email, virtualPassword, error, success} = values;

    const inputHandler = (name:string) => (event:React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [name]:event.target.value
        })
    }

    const onSubmit = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        signup({firstName,lastName,email,virtualPassword})
        .then(data =>{
            if(data.error){
                setValues({...values, error:data.error,success:false})
            }
            else {
                setValues({...values, 
                firstName:"",
                lastName:"",
                email:"",
                virtualPassword:"",
                error:"",
                success:true
                })
            }
        })
        .catch(err => console.log(err))
    }

    const successMessage =()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                    style={{display:success ? "":"none"}}
                    className="alert alert-success">
                        Signup successful.<Link to="/login">Click here</Link> to Login
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage =()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                    style={{display:error ? "":"none"}} 
                    className="alert alert-danger">
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const signupForm =()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group pb-1">
                            <label className="text-light" style={{fontWeight:"bold"}}>First Name</label>
                            <input type="text" value={firstName} onChange={inputHandler("firstName")} className="form-control"/>
                        </div>
                        <div className="form-group pb-1">
                            <label className="text-light" style={{fontWeight:"bold"}}>Last Name</label>
                            <input type="text" value={lastName} onChange={inputHandler("lastName")} className="form-control"/>
                        </div>
                        <div className="form-group pb-1">
                            <label className="text-light" style={{fontWeight:"bold"}}>Email</label>
                            <input type="email" value={email} onChange={inputHandler("email")} className="form-control"/>
                        </div>
                        <div className="form-group pb-2">
                            <label className="text-light" style={{fontWeight:"bold"}}>Password</label>
                            <input type="password" value={virtualPassword} onChange={inputHandler("virtualPassword")} className="form-control"/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success w-100"><b>Submit</b></button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base title="Sign Up Page" description="Signup to this amazing shopping marketplace">
            <div>
                {successMessage()}
                {errorMessage()}
                {signupForm()}
            </div>
        </Base>
    )
}

export default Signup;