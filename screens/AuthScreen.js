import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,Dimensions, 
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import Card from "../components/Card";
import Colors from "../constants/Colors";
const AuthScreen = (props) => {
  const [email, setEmail] = useState();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState();
const [errorEmailMsg, setErrorEmailMsg] = useState()
const [errorPasswordMsg, setErrorPasswordMsg] = useState()
  const emailHanlder = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setIsEmailValid(true);
    if (text.trim().length === 0) {
      setIsEmailValid(false);
      setErrorEmailMsg("Please enter valid email")
    }
    if (text && !emailRegex.test(text.toLowerCase())) {
      setIsEmailValid(false);
      setErrorEmailMsg("Please enter valid email")
    }
    setEmail(text);
  };

  const passwordHandler = (text) => {
    setIsPasswordValid(true);
    if (text.length < 6) {
      setIsPasswordValid(false);
      setErrorPasswordMsg("Password should be atleast 6 charactor long")
    }

    setPassword(text);
  };

  const authHandler = async () => {
    if (isEmailValid && isPasswordValid) {
      let action;
      if (isSignUp) {
        action = authActions.signUp(email, password);
      } else {
        action = authActions.logIn(email, password);
      }
      setError(null)
      setIsLoading(true)
      try {
        await dispatch(action);
      } catch (err) {
        console.log(err);
        setError(err.message)
        setIsLoading(false)
      }
    }
  };
useEffect(()=>{
    if(error){
         Alert.alert("An Error Occured",error,[{text:'ok'}])
    }

},[error])
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-500}
      style={styles.screen}
    >
        <LinearGradient colors={[Colors.primary, Colors.secondary]} style={styles.gradient}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{isSignUp ? "Sign Up" : "Log In"}</Text>
            </View>
      <Card style={styles.authContainer}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <Text style={styles.label}>Email</Text>
          <TextInput
          style={styles.input}
            placeholder="xyz@gmail.com"
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            email
            required
            style={styles.input}
            value={email}
            onChangeText={emailHanlder}
          ></TextInput>
          {!isEmailValid && (
          <View style={styles.errorTextContainer}>
        <Text style={styles.errorText}>{errorEmailMsg}</Text>
        </View>
      )}
          <Text style={styles.label}>Password</Text>
          <TextInput
          style={styles.input}
            min={6}
            autoCapitalize="none"
            keyboardType="default"
            label="Password"
            secureTextEntry
            required
            style={styles.input}
            value={password}
            onChangeText={passwordHandler}
          ></TextInput>
          {!isPasswordValid && (
          <View style={styles.errorTextContainer}>
        <Text style={styles.errorText}>{errorPasswordMsg}</Text>
        </View>
      )}
            <View>
          <View style={styles.button}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.secondary} />
            ) : (
              <CustomButton
                
                onSelect={authHandler}
              ><View style={styles.loginButton}><Text style={styles.text}>{isSignUp ? "Sign Up" : "Log In"}</Text></View></CustomButton>
            )}
          </View>
          <View style={styles.button}>
                <CustomButton
                  style={{backgroundColor: Colors.primary}}
                  onSelect={() => {
                    setIsSignUp((prevState) => !prevState);
                  }}
                ><View style={styles.loginButton}><Text style={{color: Colors.secondary}}>{`Switch to ${isSignUp ? "Log In" : "Sign Up"}`}</Text></View></CustomButton>
              </View>
            </View>
          
        </ScrollView>
      </Card>
      </LinearGradient>
      <StatusBar style="auto" />

    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
export const authOptions ={
    title:'Login'
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        
      },
      gradient: {
        width: "100%",
        height: "100%",
        alignItems:'center',
        justifyContent:'center',
      },
      authContainer: {
        padding: 10,
        width: Dimensions.get("window").width * 0.9,
        maxWidth: 400,
        maxHeight: 400,
        
      },
      loginButton:{
          alignItems:'center',
          justifyContent:'center',
          
      },
      text:{
          color:'white',
          fontSize: 16
      },
      input: {
        padding: 3,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderRightColor: "#ccc",
      },
      header:{
          margin: 30
      },
      headerText:{
        fontSize: 35,
        fontWeight:'bold',
        color:'brown'
      },
      label:{
          marginVertical: 8,
          fontSize: 17

      },
      errorTextContainer:{
        
     },
     errorText:{
         color:'red',
        
         fontSize:13
     }
});
