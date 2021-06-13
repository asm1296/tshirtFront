import React, { FC } from 'react';
import { API } from '../../backend';

type imageHelperProps = {
    product?:{
        _id:string
    }
}

const ImageHelper:FC<imageHelperProps> = ({product})=>{
    let imageUrl = product ? `${API}/product/photo/${product._id}` :"https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    return (
        <div className="rounded border border-success p-2">
            <img
              src={imageUrl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div>
    )
}

export default ImageHelper;