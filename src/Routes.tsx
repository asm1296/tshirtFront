import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './core/Home';
import Signup from './user/Signup';
import Login from './user/Login';
import PrivateRoute from './auth/helper/PrivateRoute';
import AdminRoute from './auth/helper/AdminRoute';
import UserDashboard from './user/UserDashboard';
import Profile from './user/Profile';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import ManageCategory from './admin/ManageCategory';
import AddProduct from './admin/AddProduct';
import ManageProduct from './admin/ManageProduct';
import UpdateProduct from './admin/UpdateProduct';
import Cart from './core/Cart';
import PaymentSucess from './core/PaymentSuccess';
import UserOrders from './user/UserOrders';

function Routes(){
    return(
        <Router>
            <Switch>
                
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/paymentSuccess/:orderId" component={PaymentSucess} />
                <Route exact path="/orderDetails/:orderId" component={UserOrders} />
                <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
                <PrivateRoute exact path="/user/profile" component={Profile} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute exact path="/admin/create/category" component={AddCategory} />
                <AdminRoute exact path="/admin/categories" component={ManageCategory} />
                <AdminRoute exact path="/admin/create/product" component={AddProduct} />
                <AdminRoute exact path="/admin/products" component={ManageProduct} />
                <AdminRoute exact path="/admin/product/update/:productId" component={UpdateProduct} />
            </Switch>
        </Router>
    )
}

export default Routes;