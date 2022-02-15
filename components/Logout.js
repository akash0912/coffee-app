import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import {useDispatch} from 'react-redux'
import { DrawerItem,DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import * as authActions from '../store/actions/auth'
const Logout = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
      icon={({color, size})=>{
          return (
              <View>
            <Ionicons name='log-out' color={color} size={size}/>
            </View>
          )
      }}
        label="Logout"
        onPress={() => dispatch(authActions.logout())}
      />
    </DrawerContentScrollView>
  )
}

export default Logout

const styles = StyleSheet.create({})