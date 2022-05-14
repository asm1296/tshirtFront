import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../admin/helper/adminapicall';

import Base from './Base';

import ProductCard from './Reusable/ProductCard';

function Home() {

    const [products,setProducts] = useState([]);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const loadAllProducts = () =>{
        setLoading(true);
        getAllProducts().then(data=>{
            if(data.error){
                setError(data.error);
                setLoading(false);
            }else{
                setProducts(data)
                setLoading(false);
            }
        })
    }

    useEffect(()=>{
        loadAllProducts()
    },[])

    return(
        <Base title="Home Page">
            <div className="row">
                {loading && <div className="progress">
                    <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{width:'100%'}} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} >Loading</div>
                </div>}
                <h4 className="text-white text-center mb-3">All Products</h4>
                <div className="row">
                    {products.map((prd,index)=>{
                        return (
                            <div key={index} className="col-sm-12 col-md-6 col-lg-4 my-3">
                                <ProductCard product={prd}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )
}

export default Home;