/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import Navigator from './routes/routeStack';
import {BuyerContext} from './context/buyerContext';
import {SellersContext} from './context/sellersContext';

const App = () => {
  const [buyer, setBuyer] = useState(null);
  const [sellers, setSellers] = useState([]);

  return (
    <BuyerContext.Provider value={{buyer, setBuyer}}>
      <SellersContext.Provider value={{sellers, setSellers}}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </SellersContext.Provider>
    </BuyerContext.Provider>
  );
};

export default App;
