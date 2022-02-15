import { FlatList, StyleSheet, Text, View, ActivityIndicator, Button } from "react-native";
import React, { useCallback, useEffect , useState} from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../components/OrderItem"; 
import Colors from "../constants/Colors";
import * as orderActions from '../store/actions/order'
import { StatusBar } from "expo-status-bar";

const OrderScreen = (props) => {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()

  const loadOrders = useCallback(async ()=>{
    setError(null)
    setIsRefreshing(true)
    try{
     await dispatch(orderActions.fetchOrders())
    }catch(err){
      setError(err.message)
    }
    setIsRefreshing(false)
  },[dispatch, setError, setIsLoading])


  useEffect(()=>{
    props.navigation.addListener('willFocus', loadOrders)

    return()=>[
      props.navigation.removeListener('willFocus',loadOrders)
    ]
  })
  useEffect(()=>{
    setIsLoading(true);
    loadOrders().then(()=>{
    setIsLoading(false)

    });
  },[dispatch,loadOrders])
  const renderOrder = (itemData) => {
    return (
      
      <OrderItem keyExtractor={item=>item.id}
        items = {itemData.item.items}
        totalAmount={itemData.item.totalAmount}
        date={itemData.item.readableDate}
      />
     
    );
  };

  
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadOrders}
          color={Colors.secondary}
        />
      </View>
    );
  }
  if(isLoading){
    return(
      <View style={styles.centered}><ActivityIndicator size='large' color={Colors.secondary}/></View>
    )

  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No orders found. Maybe start placing some!</Text>
      </View>
    );
  }
  return (
  <View>
    <FlatList
    onRefresh={loadOrders}
    refreshing={isRefreshing}
      data={orders}
      renderItem={renderOrder}
      keyExtractor={(item) => item.id}
    />
    <StatusBar style="auto"/>
    </View>
  );
};

export default OrderScreen;
export const orderOptions = (navData) => {
  return {
    title: "Order Screen",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  centered:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  }
});
