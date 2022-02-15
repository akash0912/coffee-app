import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import PRODUCTS from '../data/dummyData';
import CoffeeItem from '../components/CoffeeItem';
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
const CoffeeOverviewScreen = (props) => {
  

  const renderCoffeeItem = (item, key) => {
    return (
      <CoffeeItem
      key={key}
        name={item.name}
        image={item.imageUrl}
        onSelect={() => onPressHandler(item.id)}
      />
    );
  };
  const onPressHandler = (id) => {
    props.navigation.navigate("CoffeeDetail", {
      id: id,
    });
  };

  return (
    <ScrollView>
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          It's Great Day for
          <Text style={{ color: Colors.secondary }}> Coffee </Text>
        </Text>
      </View>

    {PRODUCTS.map((item,key)=>renderCoffeeItem(item,key))}
      {/* <FlatList
        data={PRODUCTS}
        renderItem={renderCoffeeItem}
        keyExtractor={(item) => item.id}
      /> */}
    </View>
    <StatusBar style="auto" />

    </ScrollView>
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
});
