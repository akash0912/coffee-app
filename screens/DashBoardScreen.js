import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors.js";
import PRODUCTS from "../data/dummyData";
import Form from "../components/Form";
import { useSelector, useDispatch } from "react-redux";
import CoffeeItem from "../components/CoffeeItem";
import * as productActions from '../store/actions/Product'
const DashboardScreen = (props) => {
  const storeProducts = useSelector((state) => state.product.availableProducts);
  const [products, setProducts] = useState([])
  const [temp, settemp] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [id, setId] = useState();
  const dispatch = useDispatch()
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="add"
            iconName="md-add"
            onPress={() => {
              setEdited(false);
              setId(null);
              setModalVisible((prevState) => !prevState);
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [setModalVisible, setId, setEdited]);

  useEffect(() => {
    if (products && products.length > 0) {
      settemp([...products]);
    }
    
  }, [products]);


//fetching all products from database
  const loadProducts = useCallback(async () => {
    try {
      setRefreshing(true);
      await dispatch(productActions.setProducts());
      setRefreshing(false);
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadProducts);

    return () => {
      unsubscribe();
    };
  }, [loadProducts, setRefreshing,props.navigation]);

  



  const token = useSelector(state=>state.auth.token)

  useEffect(async() => {
    loadProducts();
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
  }, [dispatch, loadProducts, setProducts]);
  





  const renderCoffeeItem = (itemData) => {
    return (
      <CoffeeItem
        name={itemData.item.name}
        image={itemData.item.image}
        onSelect={() => {
          setEdited(true);
          setId(itemData.item._id);
          setModalVisible((prevState) => !prevState);
        }}
        onLongPress={()=>{
          Alert.alert("Delete Product", "Are you sure?", [
            {
              text: "Yes",
              onPress: () => {dispatch(productActions.deleteProduct(itemData.item._id));
              loadProducts();
              props.navigation.push('Dashboard')
              },
              style: "destructive",
            },
            {
              text: "No",
              onPress: () => console.log("No"),
              style: "cancel",
            },
          ]);
         
        }}
      />
    );
  };

const handleModal = (modalVisible) => {
  setModalVisible(!modalVisible);
};


  return (
    <View style={styles.screen}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Warning", "Are you sure?", [
            { text: "yes" },
            { text: "no" },
          ]);
          setModalVisible(!modalVisible);
        }}
      >
        <Form
          setModal={() => handleModal(modalVisible)}
          edit={edited}
          id={id}
          navigation={props.navigation}
        />
      </Modal>

      <View style={styles.topContainer}>
        <View style={styles.box}>
          <Text style={styles.text}>Total Orders:</Text>
          <Text style={styles.text}>15</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.text}>Total Products:</Text>
          <Text style={styles.text}>35</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.productsText}>Products:</Text>
        {/* {products.map((item, key) => renderCoffeeItem(item, key))} */}
        <FlatList
          onRefresh={loadProducts}
          refreshing={refreshing}
          initialNumToRender={50}
          data={products}
          renderItem={renderCoffeeItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

export default DashboardScreen;
export const dashboardOptions = (navData) => {
  return {
    title: "Admin",
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
  screen: {
    alignItems: "center",
    flex: 1,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.15,
    width: 400,
    backgroundColor: Colors.primary,
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  productsText: {
    fontSize: 30,
    color: "brown",
    marginHorizontal: 20,
  },
  box: {
    height: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").width * 0.4,
    marginHorizontal: 20,
    justifyContent: "flex-start",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "brown",
  },
});
