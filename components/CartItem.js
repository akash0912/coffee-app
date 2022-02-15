import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";


const CartItem = (props) => {
    
    
  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Qty: {props.quantity}</Text>
          <Text
            style={{ ...styles.text, ...styles.nameText }}
            numberOfLines={1}
          >
            {props.name}
          </Text>
        </View>
        {props.deletable && <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CustomButton onSelect={props.onRemoveCart}>
            <Ionicons name="remove" size={11} color="white" />
          </CustomButton>
          <Text style={styles.text1}>{props.quantity}</Text>
          <CustomButton onSelect={props.onAddToCart}>
            <Ionicons name="add" size={11} color="white" />
          </CustomButton>
          </View>}
      </View>

      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...styles.text, ...styles.price }}>
          ₹{props.price.toFixed(2)}
        </Text>
          
        </View>
        {props.deletable &&<TouchableOpacity onPress={props.removeCartItem}>
          <Ionicons style={styles.icon}
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            color="red"
            size={23}
          />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal:20,
    borderRadius: 12,
    overflow: "hidden",
    height: 100,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  topContainer: {
    
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    alignItems:'center',
    height: "60%",
  },
  icon:{
      marginRight: 45
  },
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // alignItems:'center'
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: 10,
    width:120
  },
  price: {
    fontWeight: "700",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },
  text1: {
    textAlign: "center",
    fontSize: 16,
  },
});
