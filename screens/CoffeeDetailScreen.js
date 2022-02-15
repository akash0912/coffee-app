import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
} from "react-native";
import React,{useState} from "react";
import PRODUCTS from "../data/dummyData";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";
import { useDispatch } from "react-redux";
import * as cartActions from '../store/actions/cart';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { StatusBar } from "expo-status-bar";
const CoffeeDetailScreen = (props) => {
  const [isAdded, setIsAdded] = useState(false);
  const { id } = props.route.params;
  const selectedItem = PRODUCTS.find((item) => item.id === id);
  const dispatch = useDispatch();
  const onAddtoCartHandler=()=>{
    setIsAdded(true)
    dispatch(cartActions.addtoCart(selectedItem))
  }
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: Colors.primary }}
    >
      <View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedItem.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.screen}>
          <Text style={styles.text}>Price: ${selectedItem.price.toFixed(2)}</Text>
          
          <View style={{marginTop: 30}}>
          <Text style={styles.text1}>Ingredients</Text>
          {selectedItem.ingredients.map((item, key) => (
            <View style={styles.ingContainer} key={key}>
              <Text style={styles.ingredients}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
        
          <CustomButton onSelect={onAddtoCartHandler}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontWeight: "100",
                textAlign: "center",
              }}
            >
              Add To Cart
            </Text>
          </CustomButton>
        
      </View>
      </View>
      </View>
      <StatusBar style="auto" />

    </ScrollView>
  );
};

export default CoffeeDetailScreen;
export const coffeeDetailOptions = (navData) => {
  const { id } = navData.route.params;
  const selectedItem = PRODUCTS.find((item) => item.id === id);
  return {
    title: selectedItem.name,
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
  imageContainer: {
    height: Dimensions.get("window").height * 0.4,
    width: "100%",
    borderBottomLeftRadius: (Dimensions.get("window").height * 0.4) / 10,
    borderBottomRightRadius: (Dimensions.get("window").height * 0.4) / 10,
    overflow: "hidden",
  },
  image: {
    height: Dimensions.get("window").height * 0.4,
    width: "100%",
  },
  screen: {
    margin: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  ingredients: {
    fontSize: 20,
    color: Colors.secondary,
    fontWeight: "100",
    textAlign: "center",
  },
  text: {
    fontSize: 25,
    color: Colors.secondary,
    fontWeight: "bold",
  },
  text1: {
    fontSize: 25,
    color: Colors.secondary,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  ingContainer: {
    margin: 5,
  },
});
