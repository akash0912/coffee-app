import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "../store/actions/Product.js";
import PRODUCTS from "../data/dummyData";
import Coffee from "../models/Coffee.js";
const Form = (props) => {
  const id = props.id;
  let editedProduct
  if(props.edit){
    
     editedProduct = useSelector((state) =>
    state && state.product && state.product.availableProducts
    ? state.product.availableProducts.find((prod) => prod._id === id)
    : null
    );
  }

  const products = useSelector(
    (state) => state && state.product && state.product.availableProducts
  );
  const [temp,setTemp] = useState([]);
  useEffect(()=>{
    if(products && products.length >=0){
      setTemp([...products])
    }
  },[products, setTemp, editedProduct])
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(editedProduct ? editedProduct?.name : "");
  const [price, setPrice] = useState(editedProduct ? editedProduct?.price : "");
  const [ingredients, setIngredients] = useState(
    editedProduct ? editedProduct.ingredients : []
  );
  const [image, setImage] = useState(editedProduct ? editedProduct?.image : "");
  const handleIngredients = (text) => {
    const ingredientsArray = text.split(",");
    setIngredients(ingredientsArray);
  };


  const submitHandler = () => {
    const isValid = validateText();
    if (isValid) {
      const product = new Coffee(
        Math.random(),
        name,
        image,
        ingredients,
        price
      );
      dispatch(productActions.addProducts(product));
      props.setModal();
    }
  };
  const validateText = () => {
    if (!name) {
      return Alert.alert("Warning", "Please enter valid name.", [
        { text: "Okay" },
      ]);
    }
    if (!price) {
      return Alert.alert("Warning", "Please enter valid price.", [
        { text: "Okay" },
      ]);
    }
    if (ingredients.length === 0) {
      return Alert.alert("Warning", "Please enter valid ingredients.", [
        { text: "Okay" },
      ]);
    }
    if (!image) {
      return Alert.alert("Warning", "Please enter valid image.", [
        { text: "Okay" },
      ]);
    }
    return true;
  };
  if(isLoading){
    return(
      <View>
        <ActivityIndicator size={23} color={'brown'}/>
      </View>
    )
  }
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="XYZ"
          autoCapitalize="none"
          keyboardType="default"
          label="Name"
          required
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        ></TextInput>
        {/* {!isEmailValid && (
          <View style={styles.errorTextContainer}>
        <Text style={styles.errorText}>{errorEmailMsg}</Text>
        </View>
      )} */}
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          keyboardType="decimal-pad"
          label="Price"
          required
          value={price.toString()}
          onChangeText={(text) => {
            setPrice(text);
          }}
        ></TextInput>
        <Text style={styles.label}>Ingredients</Text>
        <TextInput
          style={styles.input}
          placeholder="ex. water, coffee beans, water, sugar etc."
          autoCapitalize="none"
          keyboardType="default"
          label="Ingredients"
          required
          style={styles.input}
          value={ingredients.toString()}
          onChangeText={handleIngredients}
        ></TextInput>
        <Text style={styles.label}>Image</Text>
        <TextInput
          style={styles.input}
          placeholder="url"
          autoCapitalize="none"
          keyboardType="default"
          label="Image"
          required
          style={styles.input}
          value={image}
          onChangeText={(text) => {
            setImage(text);
          }}
        ></TextInput>
        <View style={styles.btn}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              const isValid = validateText();
              if (isValid) {
                const product = new Coffee(
                  Math.random(),
                  name,
                  image,
                  ingredients,
                  price
                );
                if(editedProduct){
                  setIsLoading(true)
                   dispatch(productActions.updateProduct(editedProduct._id,product));
                  setIsLoading(false)
                  props.navigation.navigate("Dashboard");
                }else{
                  
                  setIsLoading(true)
                  dispatch(productActions.addProducts(product));
                  setIsLoading(false)
                  props.navigation.push("Dashboard");
                }
               
                props.setModal();
              }
            }}
          >
            <Text style={styles.textStyle}>
              {editedProduct ? "Update" : "Add"}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              props.setModal();
            }}
          >
            <Text style={styles.textStyle}>Back</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  input: {
    width: "100%",
    padding: 3,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderRightColor: "#ccc",
    marginVertical: 6,
  },
  modalView: {
    margin: 20,
    height: 400,
    width: 370,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",

    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "brown",
  },
  btn: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
