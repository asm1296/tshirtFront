import React, {FC} from 'react';

import '../styles.css'
import Menu from './Menu';

type BaseProps = {
    title:string,
    description?:string,
    className?:string,
    children?:JSX.Element
}

const Base:FC<BaseProps> = ({
    title="My Title",
    description="",
    className="bg-dark p-4",
    children=<p className="lead">My Main Content</p>
})=>{
    return(
        <div>
            <Menu />
            <div className="container-fluid px-0">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead mb-0 pb-2">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center">
                    <h5>If you have any questions ? Please feel free to reach out !</h5>
                    <button className="btn btn-warning btn-md mb-2"><b>Contact Us</b></button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An amazing <span className="text-white">T-shirt Store</span>
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base;