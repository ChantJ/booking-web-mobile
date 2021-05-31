import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import axios from 'axios';
import {BuyerContext} from '../../context/buyerContext';

const Login = ({navigation}) => {
  const {setBuyer} = useContext(BuyerContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = () => {
    let data = {
      email: email,
      password: password,
      role: 'buyer',
    };
    axios.post('http://localhost:3001/users/login', data)
    .then(res => {
      setBuyer(res.data);
      navigation.navigate("Home")
    })
    .catch(err=>setError(err.response.data));
  };
  return (
    <View style={loginStyle.container}>
      <Text style={loginStyle.Title}>Welcome To NovaLabs</Text>
      <View style={loginStyle.box}>
        <Text style={loginStyle.inputLabel}>Email:</Text>
        <TextInput
          style={loginStyle.inputField}
          onChangeText={e => setEmail(e)}></TextInput>
        <Text style={loginStyle.inputLabel}>Password:</Text>
        <TextInput
          style={loginStyle.inputField}
          onChangeText={e => setPassword(e)}></TextInput>
        <Button
          title="Login"
          onPress={() => login()}
          disabled={!email || !password}
          color="black"
        />
        <Text style={loginStyle.errorText}>{error}</Text>
      </View>
      <Text style={loginStyle.Notification}>
        P.S.: If you are a Seller, please sign with our web app to check your
        appointments.
      </Text>
    </View>
  );
};

const loginStyle = StyleSheet.create({
  container: {
    backgroundColor: '#1753bc',
    height: '100%',
    flex: 1,
    alignItems: 'center',
  },
  box: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 3,
    height: '40%',
    width: '80%',
  },
  inputLabel: {
    marginTop: '5%',
    marginLeft: '5%',
    fontSize: 20,
    fontWeight: '400',
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: '5%',
    marginRight: '5%',
    height: '15%',
  },

  Title: {
    color: 'white',
    margin: '10%',
    fontSize: 30,
    fontWeight: '600',
  },
  Notification: {
    margin: '10%',
    color: 'white',
  },
  errorText: {
    color: 'red',
    margin: '5%',
  },
});

export default Login;
