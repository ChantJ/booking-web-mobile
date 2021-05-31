import React, {useContext} from "react"
import axios from "axios"
import { SellerContext } from "../../contexts/sellerContext";
import "./style.css"

const TopBar =(props)=>{
    const {seller,  setSeller } = useContext(SellerContext);

    const logout=()=>{
        axios.get("users/logout")
        .then(res=>setSeller(null))
        .catch(err=>console.log(err))
    }
    return (
        <div className="topbar">
            <div>
                Hi {seller.name}
            </div>
            <div style={{fontSize:"3rem"}}>
                Welcome To NovaLabs
            </div>
            <div>
                <button className="logout" onClick={()=>logout()}>logout</button>
            </div>
        </div>
    )
}
export default TopBar