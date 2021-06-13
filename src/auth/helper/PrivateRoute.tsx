import React, {FC} from 'react';
import {isAuthenticate} from './index';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type routeProps = {
    component:React.ComponentType<any>,
    to?:object
} & RouteProps

const PrivateRoute = ({ component:Component, ...rest }:routeProps) => {
    if(isAuthenticate()){
        return <Route {...rest} component={Component} />
    }else{
        return <Redirect to={{pathname:"/login"}} />
    }
  }

  export default PrivateRoute;