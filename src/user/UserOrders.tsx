import React, { FC, useEffect, useState } from 'react';
import Base from '../core/Base';
import { authenticate, isAuthenticate } from '../auth/helper';
import { getSingleOrder } from '../core/helper/orderHelper';
import { Redirect, RouteComponentProps } from 'react-router';
import ProductCard from '../core/Reusable/ProductCard';
import { orderData } from '../core/PaymentUI';
import { Link } from 'react-router-dom';

type paymentSuccess=RouteComponentProps<any>;

const UserOrders:FC<paymentSuccess>=({match})=>{

    const [orderPlaced, setOrderPlaced] = useState<orderData>({
        products:[],
        transactionId:"",
        amount:0,
        address:"",
        user:"",
        status:"",
        createdAt:new Date()
    })
    const {user, token} = isAuthenticate();
    const [loading,setLoading] = useState(false);
    const [valid,setValid] = useState(true);

    useEffect(()=>{
        getOrderPlaced();
    },[])

   const getOrderPlaced=()=>{
        setLoading(true);
        getSingleOrder(user._id,token, match.params.orderId)
        .then((res)=>{
            if(res.error){
                setValid(false);
            }
            else{
                setOrderPlaced(res);
                setLoading(false)
            }

        }).catch(err=>{
            setValid(false);
        })
    }

    return(
        <Base title="Order Details">
            <div className="paymentSuccessContainer text-white">
                {valid && (<>
                 <div className="row">
                    <div className="col-sm-12 col-md-10 col-lg-8 mx-auto text-center rounded border my-2">
                        <div className="row">
                            <div className="col-md-3">
                                <label style={{fontWeight:"bold"}}>Order Status : </label>
                            </div>
                            <div className="col-md-2">
                                <label style={{fontWeight:"bold"}}>{orderPlaced.status}</label>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-3">
                                <label style={{fontWeight:"bold"}}>Transaction ID : </label>
                            </div>
                            <div className="col-md-2">
                                <label style={{fontWeight:"bold"}}>{orderPlaced.transactionId}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label style={{fontWeight:"bold"}}>Order Amount : </label>
                            </div>
                            <div className="col-md-2">
                                <label style={{fontWeight:"bold"}}>Rs.{orderPlaced.amount}</label>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-3">
                                <label style={{fontWeight:"bold"}}>Order Date : </label>
                            </div>
                            <div className="col-md-2">
                                <label style={{fontWeight:"bold"}}>{new Date(new Date(orderPlaced.createdAt).getTime()).toLocaleDateString("en-us")}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label style={{fontWeight:"bold"}}>Shipping Address : </label>
                            </div>
                            <div className="col-md-4">
                                <label style={{fontWeight:"bold"}}>{orderPlaced.address}</label>
                            </div>
                        </div>
                        <div className="row">
                            {orderPlaced.products.map((prd,index)=>{
                                prd._id = prd.product
                                return (
                                    <div key={index}  className="col-sm-12 col-md-6 col-lg-4 mx-auto my-3">
                                    <ProductCard product={prd} addToCart={false} removeFromCart={false} />
                                    </div>
                                )   
                            })}
                        </div>
                        <div className="text-center mb-2">
                            <Link to="/user/dashboard"><span className="btn btn-success"><b>Go to Dashboard</b></span></Link>
                        </div>
                    </div>
                 </div></>)}
                 {!valid && <Redirect to="/" />}
            </div>
        </Base>
    )
}

export default UserOrders;