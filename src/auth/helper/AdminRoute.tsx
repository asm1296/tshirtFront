import React, {FC} from 'react';
import {isAuthenticate} from './index';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type routeProps = {
    component:React.ComponentType<any>,
    to?:object
} & RouteProps

const AdminRoute = ({ component:Component, ...rest }:routeProps) => {
    if(isAuthenticate() && isAuthenticate().user.role === 1){
        return <Route {...rest} component={Component} />
    }else{
        return <Redirect to={{pathname:"/login"}} />
    }
  }

  export default AdminRoute;