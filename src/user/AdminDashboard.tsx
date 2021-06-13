import React from 'react';
import Base from '../core/Base';
import { isAuthenticate } from '../auth/helper/index';
import { Link} from 'react-router-dom'

const AdminDashboard = ()=>{

    const { user:{ firstName, lastName, email, role}} = isAuthenticate();

    const adminLeftSide = ()=>{
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-success">Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-success">Manage Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-success">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-success">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-success">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightSide =()=>{
        return(
            <div className="card">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge bg-success mr-2">First Name</span> : {firstName}
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-success mr-2">Email</span> : {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-danger">Admin Privilage</span>
                    </li>
                </ul>
            </div>
        )
    }

    return(
        <Base title="Admin Dashboard" description="Manage your store from here">
            <div className="row mx-3 bg-success p-4">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
        </Base>
    )
}

export default AdminDashboard;