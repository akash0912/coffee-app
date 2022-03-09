export const SET_PRODUCTS ="SET_PRODUCTS";
export const ADD_PRODUCTS = "ADD_PRODUCTS"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
import {PRODUCTS} from '../../data/dummyData'
import axios from 'axios';
export const addProducts = (product)=>{
    return async (dispatch, getState)=>{
        
        const token = getState().auth.token;
        const response = await fetch(
          "https://coffee-cart-node-api.herokuapp.com/product/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...product,
            }),
          }
        );

       const resData = await response.json();
    
          dispatch({type: ADD_PRODUCTS, product: resData})
    }
}

export const setProducts = ()=>{
    return async (dispatch,getState)=>{
      const token = getState().auth.token
      try{
        const response = await fetch(
          "https://coffee-cart-node-api.herokuapp.com/products",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      if(response.status === 400){
        throw new Eroor("Could not fetch the Products")
      }

      const resData =await  response.json();

      dispatch({type:SET_PRODUCTS,product:resData});
      }catch(e){
        throw e
      }
      
    }

}


export const updateProduct = (id,product)=>{
  return async (dispatch, getState)=>{
    const token = getState().auth.token;
    try{
      // const response = await axios.patch(`http://192.168.137.1:3000/products/${id}`,{
      //   ...product
      // });
      const response = await fetch(
        `https://coffee-cart-node-api.herokuapp.com/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: product.name,
            image: product.image,
            ingredients: product.ingredients,
            price: product.price,
          }),
        }
      );
      const resData = await response.json()
    
      dispatch({ type: UPDATE_PRODUCT, product: product, id: id });
    }catch(e){
      throw new Error(e)
    }
    

  }
}


export const deleteProduct = (id)=>{
   return async (dispatch, getState) => {
     const token = getState().auth.token;
     try {
      
       const response = await fetch(
         `https://coffee-cart-node-api.herokuapp.com/product/${id}`,
         //  `http://192.168.137.1:3000/product/${id}`,
         {
           method: "DELETE",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         }
       );
       const resData = await response.json();
       dispatch({ type: DELETE_PRODUCT, id: id });
     } catch (e) {
       throw new Error(e);
     }
   };
}



