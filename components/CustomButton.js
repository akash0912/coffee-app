import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CustomButton = (props) => {
  return (
    <View style={{...styles.screen,...props.style}}>
    <TouchableNativeFeedback onPress={props.onSelect} >
        <View style={styles.button}>
        {props.children}
        </View>
    </TouchableNativeFeedback>  
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
    screen:{
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        margin: 10,
        overflow:'hidden',
        
    },
    button:{
        padding: 10    
    }
});
