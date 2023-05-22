import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import PRODUCTS from '../data/dummyData';
import CoffeeItem from '../components/CoffeeItem';
import Colors from "../constants/Colors";
import { useDispatch,useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import * as productActions from '../store/actions/Product.js'
const CoffeeOverviewScreen = (props) => {
  // let products = useSelector(state => state.product.availableProducts);
  const [products, setProducts] = useState([])
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const token = useSelector(state=>state.auth.token)

  const loadProducts = useCallback(async () => {
    
      try{
        setIsRefreshing(true)
       
          
        await dispatch(productActions.setProducts())
         setIsRefreshing(false);
      }catch(e){
        throw e
        console.log(e)
      }
    },
   [] 
  )
useEffect(() => {
  const unsubscribe = props.navigation.addListener("focus", loadProducts);

  return () => {
    unsubscribe();
  };
}, [loadProducts]);


  useEffect(async()=>{
    loadProducts();
    let cancel = false
    if(cancel){return}
    const response = await fetch(
      "https://coffee-cart-node-api.herokuapp.com/products",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 400) {
      throw new Eroor("Could not fetch the Products");
    }
    const resData = await response.json();
    setProducts([...resData])
     return ()=>{
       cancel = true
     }  
  },[dispatch, loadProducts])
  

  
  const renderCoffeeItem = (itemData) => {
  
    return (
      <CoffeeItem
        name={itemData.item.name}
        image={itemData.item.image}
        onSelect={() => {
          onPressHandler(itemData.item._id);
        }}
      />
    );
  };
  const onPressHandler = (id) => {
    props.navigation.navigate("CoffeeDetail", {
      id: id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            It's Great Day for
            <Text style={{ color: Colors.secondary }}> Coffee </Text>
          </Text>
        </View>

        {/* {products.map((item,key)=>renderCoffeeItem(item,key))} */}
        <FlatList
          onRefresh={loadProducts}
          refreshing={isRefreshing}
          initialNumToRender={50}
          data={products}
          renderItem={renderCoffeeItem}
          keyExtractor={(item) => item._id}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default CoffeeOverviewScreen;
export const coffeeOverviewOptions = (navData) => {
  return {
    title: "Home Screen",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName="md-cart"
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  textContainer: {
    height: Dimensions.get("window").height * 0.2,
    width: "100%",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 40,
  },
  screen: {
    flex: 1,
    color: Colors.primary,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
  },
});
