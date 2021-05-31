import React, {useContext} from "react"
import { withRouter } from 'react-router-dom';
import {SellerContext} from "../../contexts/sellerContext"
import Login from "./login"
import MainLayout from "./mainlayout"

const Layout=(props)=>{
    const {seller} = useContext(SellerContext)
    return (
        <div>
            {seller ?
            <MainLayout {...props}/>:
            <Login {...props}/>
            }
        </div>
    )
}
export default withRouter(Layout)