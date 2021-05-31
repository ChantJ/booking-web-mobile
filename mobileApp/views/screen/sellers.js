import React, {useEffect, useContext,useCallback, useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import axios from 'axios';
import { debounce } from "lodash";
import {PageContext} from '../../context/pageNum';
import {SellersContext} from '../../context/sellersContext';
import {BuyerContext} from '../../context/buyerContext';

const Sellers = ({navigation}) => {
  const {pageNum, setPageNum} = useContext(PageContext);
  const {sellers, setSellers} = useContext(SellersContext);
  const {buyer}=useContext(BuyerContext)
  const [total, setTotal] = useState(0);
  const [search, setSearch]= useState('');

  useEffect( () => {
     axios
      .get(`http://localhost:3001/buyers/:${pageNum}`)
      .then(res => {
        setSellers(res.data.data);
        setTotal(res.data.total);
      })
      .catch(err => console.log(err));
  }, []);

  const changePage=(page)=>{
    setPageNum(page)
     axios
    .get(`http://localhost:3001/buyers/:${page}`)
    .then(res => {
      setSellers(res.data.data);
      setTotal(res.data.total);
    })
    .catch(err => console.log(err));
  }

  const handler = useCallback(debounce((event, page)=>{
    
    axios
    .post(`http://localhost:3001/buyers/searchbyname`, {search:event ,pageNum:page })
    .then(res => {
      setSellers(res.data.data||[]);
      setTotal(res.data.total);
    })
    .catch(err => {
      setSearch("")
      console.log(err)})}
    , 2000), []);
  
  const onChange = (event) => {
      // perform any event related action here
      setPageNum(0)
      setSearch(event)
      handler(event, 0);
   };

   const changePageWithSearch=(page)=>{
      setPageNum(page)
      handler(search, page);
   }
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'white',
        padding: '5%',
        overflow: 'scroll',
      }}>
       <View style={{height:"5%", padding: "2%", marginBottom:"5%",borderColor:"black", borderRadius:5, borderWidth:1, width:"100%"}}>
         <TextInput value={search} placeholder="Search" onChangeText={(text)=>onChange(text)}/>
       </View>
      <View>
        <View style={{borderBottomColor: 'black', borderBottomWidth: 3}}>
          <Text style={{fontSize: 20}}>Sellers:</Text>
        </View>
        {sellers.length > 0 ? (
          sellers.map((seller, index) => {
            return (
              <View
                key={index}
                style={{borderBottomColor: 'black', borderBottomWidth: 1}}>
                <View style={list.listContainer}>
                  <View>
                    <Text>{seller.name} </Text>
                  </View>
                  <View>
                    <Button title="Book" onPress={()=>{buyer ? navigation.navigate("SellerDetails", {data:seller}):navigation.navigate("Login")}}/>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <Text>No Sellers Found</Text>
        )}
      </View>
      <View style={{flexDirection: 'row',justifyContent:"center", marginTop:"10%"}}>
       {pageNum!==0 &&  <Button title="Previous page" onPress={()=>{search ?changePageWithSearch(pageNum-1):changePage(pageNum-1)}}/>}
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>
            {Math.min((pageNum + 1) * 5, total)} out of {total}
          </Text>
        </View>
        {(pageNum+1) < total / 5 && <Button fontSize={10} title="Next page"  onPress={()=>{search ?changePageWithSearch(pageNum+1):changePage(pageNum+1)}}/>}
      </View>
    </View>
  );
};

const list = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center"
  },
});
export default Sellers;
