import React,{FC} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { isAuthenticate, signout } from '../auth/helper/index';

type MenuProps = RouteComponentProps<any>



const Menu:FC<MenuProps> =({history})=>{

    const currentTab=(history:any, path:string)=>{
        if(history.location.pathname === path){
            return{
                color:"#2ecc72"
            }
        }
        else {
            return {
                color:"#FFFFFF"
            }
        }
    }

    return(
        <div>
            <div className="container-fluid">
                <ul className="nav nav-tabs bg-dark">
                    <li className="nav-item">
                        <Link style={currentTab(history,"/")} className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">Cart</Link>
                    </li>
                    {(isAuthenticate() && isAuthenticate().user.role === 0) && 
                    (<li className="nav-item">
                        <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
                    </li>) }
                    {(isAuthenticate() && isAuthenticate().user.role === 1) &&
                    (<li className="nav-item">
                        <Link style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">Admin</Link>
                    </li>)}
                    {!isAuthenticate() && (<>
                        <li className="nav-item">
                            <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                            <Link style={currentTab(history,"/login")} className="nav-link" to="/login">Log In</Link>
                        </li>
                    </>)}
                    {isAuthenticate() && (
                        <li className="nav-item">
                            <span className="nav-link text-warning" style={{cursor:"pointer"}} onClick={()=>{signout(()=>{history.push("/")})}}>Log Out</span>
                        </li>
                        )}
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Menu);