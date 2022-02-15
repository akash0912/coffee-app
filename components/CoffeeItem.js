import { StyleSheet, Text, View, Image,TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors'

const CoffeeItem = (props) => {
  return (
      <TouchableNativeFeedback onPress={props.onSelect}>
    <View style={styles.screen}>
        <View style={styles.item}>
            <View style={styles.container}>
            <View style={styles.imageContainer}>
        <Image source={{uri: props.image}} style={styles.image} resizeMode='cover'/>
        </View>
      <Text style={styles.text}>{props.name}</Text>
      </View>
      <View><Ionicons name='arrow-forward' color={Colors.secondary} size={23}/></View>
      </View>
    </View>
    </TouchableNativeFeedback>
  )
}

export default CoffeeItem

const styles = StyleSheet.create({
    screen:{
        paddingVertical: 10,
        paddingHorizontal:20,
        height:100,
    },
    container:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },  
    item:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    text:{
        fontSize:15,
        marginHorizontal: 15
    },
    
    image:{
        height:100,
        width:100,
    },
    imageContainer:{
        height:80,
        width:80,
        borderRadius:40,
        borderColor:'black',
        overflow:'hidden'
    }
})