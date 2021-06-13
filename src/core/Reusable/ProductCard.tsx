import React, { FC } from 'react';
import ImageHelper from '../helper/ImageHelper';
import { addItemToCart, removeItemFromCart } from '../helper/cartHelper';

 type productCardProps = {
  product:{
    _id:string,
    name:string,
    description:string,
    price:string
  },
  addToCart?:boolean,
  removeFromCart?:boolean,
  removeProduct?:(prod:string)=>void
}

const ProductCard:FC<productCardProps> = ({product, addToCart=true, removeFromCart=false, removeProduct}) => {

    const addToCartHandle = ()=>{
      addItemToCart(product)
    }
    const removeFromCartHandle = (prodId:string)=>{
      if(removeProduct){
        removeProduct(prodId)
      }
    }
    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead text-center"><b>{product.name}</b></div>
        <div className="card-body text-center">
            <ImageHelper product={product}  />
          <p className="lead bg-success font-weight-normal text-wrap">
            <b>{product.description}</b>
          </p>
          <p className="btn btn-success rounded  btn-sm px-4"><b>Rs. {product.price}</b></p>
          <div className="row">
            <div className="col-12">
              { addToCart && (<button
                onClick={addToCartHandle}
                className="btn w-100 btn-outline-success border border-success border-2 mt-2 mb-2"
              >
                <b>Add to Cart</b>
              </button>)}
            </div>
            <div className="col-12">
              { removeFromCart && (<button
                onClick={()=>{removeFromCartHandle(product._id)}}
                className="btn w-100 btn-outline-danger border border-danger border-2 mt-2 mb-2"
              >
                <b>Remove from cart</b>
              </button>)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductCard;