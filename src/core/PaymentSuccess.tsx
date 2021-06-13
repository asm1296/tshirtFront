import React, { FC, useEffect, useState } from 'react';
import Base from './Base';
import GreenTick from '../Images/greenTick.jpg';
import { authenticate, isAuthenticate } from '../auth/helper';
import { getSingleOrder } from './helper/orderHelper';
import { Redirect, RouteComponentProps } from 'react-router';
import ProductCard from './Reusable/ProductCard';
import { orderData } from './PaymentUI';

type paymentSuccess=RouteComponentProps<any>;

const PaymentSucess:FC<paymentSuccess>=({match})=>{

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
        <Base title="Order Confirmation">
            <div className="paymentSuccessContainer text-white">
                {valid && (<><div className="row">
                    <div className="col-6 mx-auto">
                        <div>
                            <img 
                            src={GreenTick}
                            alt="Green Tick"
                            style={{ float:"left",maxHeight: "6%", maxWidth: "6%", marginRight:"15px", marginLeft:"25%" }} />
                            <h3 style={{float:"left"}}>Payment Successful</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 mx-auto text-center">
                        <h5>Your Order is placed Successfully</h5>
                    </div>
                 </div>
                 <div className="row">
                    <div className="col-8 mx-auto text-center rounded border my-2">
                        <div className="row">
                            <div className="col-3">
                                <label style={{fontWeight:"bold"}}>Order Status : </label>
                            </div>
                            <div className="col-2">
                                <label>{orderPlaced.status}</label>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-3">
                                <label style={{fontWeight:"bold"}}>Transaction ID : </label>
                            </div>
                            <div className="col-2">
                                <label>{orderPlaced.transactionId}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <label style={{fontWeight:"bold"}}>Order Amount : </label>
                            </div>
                            <div className="col-2">
                                <label>Rs.{orderPlaced.amount}</label>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-3">
                                <label style={{fontWeight:"bold"}}>Order Date : </label>
                            </div>
                            <div className="col-2">
                                <label>{new Date(new Date(orderPlaced.createdAt).getTime()).toLocaleDateString("en-us")}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <label style={{fontWeight:"bold"}}>Shipping Address : </label>
                            </div>
                            <div className="col-3">
                                <label>{orderPlaced.address}</label>
                            </div>
                        </div>
                        <div className="row">
                            {orderPlaced.products.map((prd,index)=>{
                                prd._id = prd.product
                                return (
                                    <div key={index}  className="col-4 mx-auto my-3">
                                    <ProductCard product={prd} addToCart={false} removeFromCart={false} />
                                    </div>
                                )   
                            })}
                        </div>
                    </div>
                 </div></>)}
                 {!valid && <Redirect to="/" />}
            </div>
        </Base>
    )
}

export default PaymentSucess;