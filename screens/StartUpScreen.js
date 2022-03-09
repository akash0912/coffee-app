import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const StartUpScreen = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const tryLogin = async ()=>{   
            const userData = await AsyncStorage.getItem('userCreds');
            if(!userData){
              // props.navigation.navigate('Auth');
              dispatch(authActions.setDidTryAl());
            
              return;
            }            
            const transformedData = JSON.parse(userData);
            const {token, userId, role, expiryDate} = transformedData;
         
            const expirationDate = new Date(expiryDate);
            if(expirationDate <= new Date() || !token || !userId){
              // props.navigation.navigate('Auth');
              dispatch(authActions.setDidTryAl());
          
              return;
            }
            const expiryTime = expirationDate.getTime() - new Date().getTime();
            // props.navigation.navigate('drawer');
            dispatch(authActions.authenticate(token, userId, role, expiryTime))

        }

        tryLogin();
    },[dispatch])
   
  return (
    <View style={styles.centered}>
     <ActivityIndicator size='large' color={Colors.secondary} />
    </View>
  )
}

export default StartUpScreen

const styles = StyleSheet.create({
    centered:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})