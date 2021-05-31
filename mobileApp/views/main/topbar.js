import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import axios from "axios";
import {BuyerContext} from '../../context/buyerContext';

const TopBar = ({navigation}) => {
  const {buyer, setBuyer} = useContext(BuyerContext);

  const logout=()=>{
      axios.get("http://localhost:3001/users/logout")
      .then(res=>setBuyer(null))
      .catch(err=>console.log(err))
  }
  return (
    <View style={topBarStyle.topBar}>
      <View style={topBarStyle.titleContainer}>
        <Text style={{fontSize:30, color:"white", padding:"3%"}}>NovaLabs</Text>
      </View>
      <View style={topBarStyle.loginContainer}>
        {buyer ? (
          <View>
            <Text style={{color:"white", fontSize:20}}>Hi {buyer.name}</Text>
            <Button onPress={()=>logout()} color="white" title="Logout" />
          </View>
        ) : (
          <Button onPress={()=>navigation.navigate("Login")} color="white" title="Login" />
        )}
      </View>
    </View>
  );
};

export default TopBar;

const topBarStyle = StyleSheet.create({
  topBar: {
    height: 100,
    backgroundColor: '#1753bc',
    flexDirection:"row"
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding:"3%"
  },
  titleContainer: {
    flex:1
  },
});
