import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Card from "./Card";
import CustomButton from "./CustomButton";
import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Card style={styles.card}>
      <View style={styles.screen}>
        <Text style={styles.amount}>₹{props.totalAmount}</Text>
        <Text>{props.date}</Text>
      </View>
      <CustomButton onSelect={() => setIsClicked((prevState) => !prevState)}>
        <View style={styles.button}>
          <Text style={{ color: "white" }}>{isClicked?"Less":"More"}</Text>
        </View>
      </CustomButton>
      {isClicked && (
        <View style={styles.list}>
          {props.items.map((item,key) => (
            <View style={styles.container} key={key}>
              <Text style={styles.text}>Qty: {item.quantity}</Text>
              <Text style={{ ...styles.text, ...styles.nameText }} numberOfLines={1}>{item.name}</Text>
            <View style={styles.amountConatiner}>
              <Text style={{ ...styles.text, ...styles.price }}>
          ₹{item.price.toFixed(2)}
        </Text>
        </View>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  screen: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountConatiner:{
      justifyContent:'flex-end'
  },
  card: {
    margin: 20,
  },
  amount: {
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems:'center'
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
  list: {
    margin: 15,
  },
});
