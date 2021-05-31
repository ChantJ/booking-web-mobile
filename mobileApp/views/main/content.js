import React, {useState, useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {PageContext} from '../../context/pageNum';
import MyAppointments from '../screen/myappointments';
import Sellers from '../screen/sellers';
import {BuyerContext} from '../../context/buyerContext';


const Content = props => {
  const {buyer}=useContext(BuyerContext)
  const [selectedTab, setSelectedTab] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  return (
    <PageContext.Provider value={{pageNum, setPageNum}}>
      <View style={{overflow: 'scroll'}}>
        <View style={tab.tabContainer}>
          <View style={selectedTab == 0 ? tab.tabItemSelected : tab.tabItem}>
            <Button onPress={() => setSelectedTab(0)} title="Sellers" />
          </View>
          {buyer && <View style={selectedTab == 1 ? tab.tabItemSelected : tab.tabItem}>
            <Button onPress={() => {setSelectedTab(1)}} title="My Appointments" />
          </View>}
        </View>
        {selectedTab === 0 ? (
          <Sellers {...props} />
        ) : (
          <MyAppointments {...props} />
        )}
      </View>
    </PageContext.Provider>
  );
};

const tab = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1753bc',
  },
  tabItem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
  },
  tabItemSelected: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    borderBottomWidth: 0,
  },
});
export default Content;
