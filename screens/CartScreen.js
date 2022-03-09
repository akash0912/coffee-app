import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import * as cartActions from "../store/actions/cart";
import * as orderActions from "../store/actions/order";
import { StatusBar } from "expo-status-bar";
import { StackActions } from '@react-navigation/native';

const CartScreen = (props) => {
  const cartTotalAmount = useSelector(state=>state.cart.totalAmount)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const cartData = useSelector((state) => {
    const transformed = [];
    for (const key in state.cart.items) {
      transformed.push({
        _id: key,
        quantity: state.cart.items[key].quantity,
        price: state.cart.items[key].price,
        name: state.cart.items[key].name,
        sum: state.cart.items[key].sum,
      });
    }
    return transformed.sort((a,b)=>a.id>b.id);
  });
  
  const renderCartItem = (itemData) => {
    return (
      <CartItem
        name={itemData.item.name}
        quantity={itemData.item.quantity}
        price={itemData.item.sum}
        onAddToCart={() => {
          dispatch(cartActions.addtoCart(itemData.item))}}
        onRemoveCart={() =>
          {
          dispatch(cartActions.removeFromCart(itemData.item._id))
          }
        }
        removeCartItem={()=>dispatch(cartActions.deleteItem(itemData.item._id))}
        deletable={true}
      />
    );
  };

  const orderData=async ()=>{
    if(cartData.length === 0){
      Alert.alert("Warning", "Please enter items to cart",[{text:'Ok'}])
      return;
    }

    setError(null);
    setIsLoading(true)
    try{
      await dispatch(orderActions.onOrder(cartData,cartTotalAmount))
      // props.navigation.navigate('Orders',{
      //   clearStack: true
      // })
      setIsLoading(false)
      props.navigation.dispatch(
        StackActions.replace('CoffeeOverview')
      )
      
    }catch(err){
      setError(err.message)
    }
  }
  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <View style={styles.orderContainer}>
          <Text style={styles.text1}> Total: ₹{cartTotalAmount}</Text>
          {isLoading?<ActivityIndicator size='small' color={Colors.secondary} style={styles.indicator}/>:<CustomButton onSelect={orderData}>
            <Text style={styles.text}>Order Now</Text>
          </CustomButton>}
        </View>
      </Card>
      <View>
        <FlatList
          data={cartData}
          renderItem={renderCartItem}
          keyExtractor={(item) => item._id}
        />
      </View>
      <StatusBar style="auto" />

    </View>
  );
};

export default CartScreen;
export const cartOptions = (navData) => {
  return {
    title: "Cart Screen",
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },

  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    padding: 6,
    margin: 20,
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  text1: {
    fontSize: 22,
    color: Colors.secondary,
    fontWeight: "bold",
  },
  indicator:{
    marginRight: 40,
    
  }
    
  
});
