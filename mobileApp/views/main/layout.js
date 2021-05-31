import React, {useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios'
import TopBar from "./topbar"
import Content from "./content"
import {BuyerContext} from "../../context/buyerContext"

const Layout = (props) => {
  const {setBuyer}=useContext(BuyerContext)
  useEffect(()=>{
    axios.get("http://localhost:3001/users")
    .then(res=>setBuyer(res.data))
    .catch(err=>console.log(err))
  },[])

  return (
    <View>
      <TopBar {...props}/>
      <Content {...props}/>
    </View>
  );
};

export default Layout