import React, {useState, useEffect, FC} from 'react'
import { Link, Redirect } from 'react-router-dom';
import { loadCart,emptyCart } from './helper/cartHelper';
import {getTokenFromServer, processPaymentInit} from './helper/paymentHelper';
import {createOrder} from './helper/orderHelper';
import { isAuthenticate } from '../auth/helper';
import {create} from 'braintree-web-drop-in';

export type orderData = {
    _id?:string,
    products:Array<any>,
    transactionId:string,
    amount:number,
    address:string,
    user:string,
    status:string,
    createdAt:Date,
    updatedAt?:Date}
type product={
    _id:string,
    name:string,
    description:string,
    price:string,
    category:{
        name:string
    }
}

type paymentUiProps = {
    cartPrd:Array<product>
}
const PaymentUI:FC<paymentUiProps>=({cartPrd})=>{

    const [info,setInfo] = useState({
        loading:false,
        success:false,
        clientToken:"",
        error:"",
        redirectToHome:false,
        newOrder:{_id:"01"}
    })

    const {loading,
        newOrder,
        success,
        clientToken,
        error} = info;
    const {user, token} = isAuthenticate();

    useEffect(()=>{
        getClientToken();
    },[])

    useEffect(()=>{
        createDropin();
    },[clientToken])

    const getClientToken=()=>{
        getTokenFromServer(user._id,token)
        .then((data)=>{
            console.log(data);
            console.log("INFO", info);
            console.log("Cart", cartPrd)
            if(data.error){
                setInfo({...info, error:data.error})
            }else{
                const clToken=data.clientToken
                setInfo({...info,clientToken:clToken})
            }
        })
        
    }

    const createDropin=()=>{
        if(cartPrd.length > 0){
        create({
            authorization: clientToken,
            container: '#dropin'
          },(error, dropininstance)=>{
              if(error){
                  console.log(error)
                  setInfo({...info,error:"Authorization failed"})
              }
              buyButton?.addEventListener('click',()=>{
                  dropininstance?.requestPaymentMethod().then(data=>{
                      let nonce = data.nonce;
                      const paymentData={
                        nonceFromTheClient: nonce,
                        totalAmount:getAmount()
                      }
                      processPaymentInit(user._id,token,paymentData).then(response=>{
                            setInfo({...info, success:true})
                            emptyCart(()=>{
                                let productList:Array<any>=[];
                                cartPrd.forEach((product:product)=>{
                                  let indProd = {
                                        product:product._id,
                                        name:product.name,
                                        category:product.category.name,
                                        description:product.description,
                                        quantity:1,
                                        price:product.price
                                    }
                                    productList.push(indProd)
                                })
                                let orderData = {
                                    products:productList,
                                    transactionId:response.transaction.id,
                                    amount:Number(response.transaction.amount),
                                    address:"Goregaon-East, Mumbai",
                                    user:user._id
                                }
                                createOrder(user._id,token,orderData).then((response)=>{
                                    setInfo({...info, newOrder:response, loading:false,redirectToHome:true})
                                }).catch(error=>{
                                    setInfo({...info,error:error,loading:false,success:false,redirectToHome:false})
                                })
                            })
                            console.log("Payment Successful");
                      }).catch(error=>{
                            setInfo({...info,error:error,loading:false,success:false,redirectToHome:false})
                            console.log("payment Failed")
                      })
                  })
              }) 
          })}
    }

    const showDropIn=()=>{
        return(
            <div>
                
                {(clientToken !== null && cartPrd.length > 0) ?(
                    <div>
                    <h3 className="my-2">Total Amount to be paid: {getAmount()}</h3>
                        <div id="dropin"></div>
                        <button id="buyClick" className="btn w-100 btn-success mb-2" ><b>Buy</b></button>
                    </div>
                ) :(
                    (!isAuthenticate()) ?
                    (<h3>Please login to check your Cart </h3>) :
                    (<h3>Please add products in cart to checkout </h3>)
                )}
            </div>
        )
    }

    const getAmount=()=>{
        let amount:number=0;
        cartPrd.forEach((prd)=>{
            amount = amount + parseFloat(prd.price);
        })
        return amount;
    }

    const buyButton = document.querySelector('#buyClick');
    
    

    /* const onBuyClick=()=>{
        setInfo({...info,loading:true})
        let nonce;
        info.dropinstance.requestPaymentMethod().then((data)=>{
            nonce=data.nonce
            const paymentData = {
                nonceFromTheClient: nonce,
                totalAmount:getAmount()
            }
            processPaymentInit(user._id,token,paymentData).then(response=>{
                setInfo({...info, success:true,loading:false})
                console.log("Payment Successful");
                emptyCart(()=>{
                    setTimeout(()=>{
                        <Redirect to="/" />
                    },3000)
                })
            }).catch(error=>{
                setInfo({...info,error:error,loading:false,success:false,})
                console.log("payment Failed")
            })
        })
    } */

     const successMessage=()=>{
        return(
            <div
            style={{display:success ?"" :"none"}}
            className="alert alert-success mt-3"
            > <p>Payment Successful for Transaction</p></div>
        )
    }

/*     useEffect(()=>{
        redirectFunc()
    },[info.redirectToHome]) */

    /* const redirectFunc=()=>{
        if(info.redirectToHome){
            setTimeout(()=>{
              return <Redirect to="/" /> 
            },2000)
        }
    } */

    const errorMessage=()=>{
        return(
            <div
            style={{display:error===""?"none" :""}}
            className="alert alert-danger mt-3"
            > <p>Payment Failed for Transaction</p></div>
        )
    } 

    return(
        <div>
            {successMessage()}
            {errorMessage()}
            {showDropIn()}
            {info.redirectToHome &&  <Redirect to={`/paymentSuccess/${newOrder._id}`} />}
        </div>
    )
}

export default PaymentUI;