import React, {useEffect, useState, useContext} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import axios from 'axios';
import {BuyerContext} from '../../context/buyerContext';

const MyAppointments = () => {
  const {buyer} = useContext(BuyerContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/buyers/myappointments/:${buyer.email}`)
      .then(res => {
        let replied = res.data;
        replied.forEach(
          (item, index) => (
            (item.startDate = new Date(item.startDate)),
            (item.endDate = new Date(item.endDate))
          ),
        );
        setAppointments(replied);
      })
      .catch(err => console.log(err));
  }, []);

  const colors = {
    approved: 'green',
    pending: 'blue',
    rejected: '#810312',
  };
  return (

    <ScrollView vertical={true} style={styles.containter}>
      {appointments.map((appointment, index) => {
        return (
          <View key={index} style={styles.box}>
            <View style={styles.section}>
              <View>
                <Text style={{fontWeight: 'bold'}}>SelleEmail:</Text>
                <Text>{appointment.sellerEmail}</Text>
              </View>
              <View style={{marginTop: 2}}>
                <Text style={{fontWeight: 'bold'}}>Status:</Text>
                <Text
                  style={{
                    color: colors[appointment.status],
                    fontWeight: 'bold',
                  }}>
                  {appointment.status}
                </Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={{fontWeight: 'bold'}}>Start Date:</Text>
                <Text>{appointment.startDate.toLocaleString()}</Text>
              </View>
              <View style={{marginTop: 2}}>
                <Text style={{fontWeight: 'bold'}}>End Date:</Text>
                <Text>{appointment.endDate.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containter: {backgroundColor: 'white', padding: 20, borderBottomWidth:2},
  box: {flexDirection: 'row',marginTop:5, paddingTop: 10, justifyContent: 'space-between', borderBottomWidth:2},
  section: {width: 200},
});
export default MyAppointments;
