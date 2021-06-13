import React, { useEffect, useState } from 'react';
import emptyCart from '../Images/emptycart.svg'

import Base from './Base';

import ProductCard from './Reusable/ProductCard';
import {loadCart, removeItemFromCart} from './helper/cartHelper'
import PaymentUI from './PaymentUI';
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/helper';

function Cart() {

    const [cartPrd, setCartPrd] =useState([])

    const removeProduct =(prod:string)=>{
        setCartPrd(removeItemFromCart(prod))
        
    }

    const loadCartProducts=()=>{
       return (
           <div className="row" style={{marginRight:"10%", marginLeft:"10%"}}>
                {cartPrd.map((prd,index)=>{
                    return (
                        <div key={index}  className="col-4 mx-auto my-3">
                            <ProductCard product={prd} addToCart={false} removeFromCart={true} removeProduct={removeProduct}/>
                        </div>
                    )   
                })}
           </div>
       )
    }

    const loadEmptyCart =()=>{
        return(
            <div>
                <div>
                    <img
                    src={emptyCart}
                    alt="photo"
                    style={{ maxHeight: "25%", maxWidth: "25%" }}
                    className="mb-3 rounded"
                    />
                </div>
                <div>
                <h3>No Products in Cart</h3>
                <Link to="/"><span className="btn btn-block btn-success mb-2"><b>Add Products</b></span></Link>
                </div>
           </div>
        )
    }

    useEffect(()=>{
        setCartPrd(loadCart())
    },[])


    return(
        <Base title="Cart Page" description="Lets checkout your favorite products">
            <div className="row text-white border border-white border-1 mx-5">
                <div className="col-12">
                    { (isAuthenticate()) ? (<div className="row">
                        <div className="col-6 mx-auto text-center"><PaymentUI cartPrd={cartPrd} /></div>
                    </div>) : (<div className="text-center border border-white border-1 m-2">
                        <h3 className="text-white">Please Login First to Checkout</h3>
                        <Link to="/login"><span className="btn btn-warning mb-3"><b>Login</b></span></Link>
                    </div>)}
                    <div className="row">
                        <div className="col-12 text-center">{cartPrd.length > 0 ?loadCartProducts():loadEmptyCart()}</div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Cart;