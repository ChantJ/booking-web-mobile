// import {createStackNavigator} from 'react-navigation-stack';
// import {createAppContainer} from 'react-navigation';
// import Layout from '../views/main/layout';
// import Sellers from '../views/screen/sellers';
// import MyAppointments from "../views/screen/myappointments"
// import SellerDetails from "../views/screen/sellerdetails"

// const screens = {
//   main: {
//     screen: Layout,
//   },
//   Sellers: {
//     screen: Sellers,
//   },
//   myappointments: {
//     screen: MyAppointments,
//   },
//   sellerDetail: {
//     screen: SellerDetails,
//   },
// };
// const RouteStack = createStackNavigator(screens);

// export default createAppContainer(RouteStack);

import React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import Layout from '../views/main/layout';
import SellerDetails from "../views/screen/sellerdetails"
import Login from "../views/screen/login"

const Stack = createStackNavigator();

function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Layout} />
        <Stack.Screen name="SellerDetails" component={SellerDetails} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

export default MyStack