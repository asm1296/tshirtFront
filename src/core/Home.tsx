import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../admin/helper/adminapicall';

import Base from './Base';

import ProductCard from './Reusable/ProductCard';

function Home() {

    const [products,setProducts] = useState([]);
    const [error,setError] = useState("");

    const loadAllProducts = () =>{
        getAllProducts().then(data=>{
            if(data.error){
                setError(data.error);
            }else{
                setProducts(data)
            }
        })
    }

    useEffect(()=>{
        loadAllProducts()
    },[])

    return(
        <Base title="Home Page">
            <div className="row">
                <h4 className="text-white text-center mb-3">All Products</h4>
                <div className="row">
                    {products.map((prd,index)=>{
                        return (
                            <div key={index} className="col-4 my-3">
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