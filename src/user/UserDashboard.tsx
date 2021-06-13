import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth/helper';
import Base from '../core/Base';
import { orderData } from '../core/PaymentUI';
import { getMyOrders } from '../core/helper/orderHelper'
import { useEffect } from 'react';


const UserDashboard = ()=>{
    const [allMyOrders, setAllMyOrders] = useState<orderData[]>([
        {
            products:[],
            transactionId:"",
            amount:0,
            address:"",
            user:"",
            status:"",
            createdAt:new Date()
        }
    ]);
    const [loading,setLoading] = useState(false);
    const {user:{firstName,email,_id}, token} = isAuthenticate();

    useEffect(()=>{
        fetchAllOrders();
    },[])

    const fetchAllOrders=()=>{
        setLoading(true);
        getMyOrders(_id,token).then((resp)=>{
            if(resp.error){
                setLoading(false);
                alert("couldn't fetch your orders. Try Again Later");
            }
            setAllMyOrders(resp);
            setLoading(false);
        })
    }

    const userLeftSide=()=>{
        return(
            <div className="card bg-dark border-white">
                <h4 className="card-header text-warning text-center">PROFILE</h4>
                <div className="text-white text-center"> 
                    <label className="fs-6" style={{fontWeight:"bold", marginRight:"5px"}}>FirstName : </label>
                    <label>{firstName}</label>
                </div>
                <div className="text-white text-center"> 
                    <label className="fs-6" style={{fontWeight:"bold", marginRight:"5px"}}>Email : </label>
                    <label>{email}</label>
                </div>
                <div className="text-center p-3">
                    <Link to="/"><span className="btn w-100 btn-warning"><b>Add Products</b></span></Link>
                </div>
                <div className="text-center px-3 pb-3">
                    <Link to="/cart"><span className="btn w-100 btn-warning"><b>MY CART</b></span></Link>
                </div>
            </div>
        )
    }

    const userRightSide=()=>{
        return(
            <div className="card bg-dark border-white">
                <h4 className="card-header text-warning">MY ORDERS</h4>
                <ul className="list-group">
                    {(allMyOrders.length > 0) && (allMyOrders.map((myOrder:orderData,index)=>{
                        return(
                        <li key={index} className="list-group-item bg-dark border border-white m-2 position-relative">
                            <div className="text-warning">
                                <label className="fs-5" style={{fontWeight:"bold", marginRight:"5px"}}>Ordered On : </label><label style={{fontWeight:"bold"}}>{new Date(new Date(myOrder.createdAt).getTime()).toLocaleDateString('en-us')}</label>
                            </div>
                            <div className="text-white">
                                <label className="fs-5" style={{fontWeight:"bold", marginRight:"5px"}}>Order Status : </label><label style={{fontWeight:"bold"}}>{myOrder.status !== 'Delivered'?'Delivery In Progress':`Delivered on ${myOrder.updatedAt}`}</label>
                            </div>
                            <div className="text-white">
                                <label className="fs-5" style={{fontWeight:"bold", marginRight:"5px"}}>Order Amount : </label><label style={{fontWeight:"bold"}}>{myOrder.amount}</label>
                            </div>
                            <Link to={`/orderDetails/${myOrder._id}`}><span className="btn btn-warning position-absolute top-50 end-0 translate-middle-y m-2"><b> {'>'} </b></span></Link>
                        </li>)
                    }))}
                    {(allMyOrders.length === 0) && (<div className="text-center">
                        <h3 className="text-white">You have no Orders</h3>
                        <Link to="/"><span className="btn btn-warning mb-3"><b>Start Shopping !</b></span></Link>
                    </div>)}
                </ul>
            </div>
        )
    }

    return(
        <Base title="User Dashboard" description="Check your activity here">
            <div className="row mx-3 p-4">
                <div className="col-3">
                    {userLeftSide()}
                </div>
                <div className="col-9">
                    {userRightSide()}
                </div>
            </div>
        </Base>
    )
}

export default UserDashboard;