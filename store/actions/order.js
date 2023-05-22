export const ON_ORDER ="ON_ORDER";
export const SET_ORDERS = "SET_ORDERS"
import Order from "../../models/order";

export const fetchOrders=()=>{
    return async (dispatch,getState)=>{
        const date = new Date().toISOString();
        const token = getState().auth.token
        const userId = getState().auth.userId
        const response = await fetch(
          `https://coffee-cart-node-api.herokuapp.com/users/orders`,
          // `http://192.168.137.1:3000/users/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 400) {
          throw new Error("Something Went Wrong!");
        }

        const resData = await response.json();
        const loadOrders = [];
        for (const key in resData) {
          loadOrders.push(
            new Order(
              resData[key]._id,
              resData[key].cartItems,
              resData[key].totalAmount,
              new Date(resData[key].date)
            )
          );
        }
  
        dispatch({ type: SET_ORDERS, order: loadOrders });
    }
}
export const onOrder=(cartItems, totalAmount)=>{

    return async (dispatch,getState) =>{
        const date = new Date().toISOString();
        const token = getState().auth.token
        const userId = getState().auth.userId

        // const response = await fetch(`https://coffee-app-d0aa0-default-rtdb.firebaseio.com/order/${userId}.json`,{
        const response = await fetch(
          `https://coffee-cart-node-api.herokuapp.com/users/orders`,
          // `http://192.168.137.1:3000/users/orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              cartItems,
              totalAmount,
              date,
            }),
          }
        );
        
        if(response.status === 400){
            throw new Error("Something Went Wrong!")
        }
        const resData = await response.json();
        dispatch( { type:ON_ORDER, orderData:{
            id: resData._id,
            items: cartItems,
            totalAmount: totalAmount,
            date: new Date().toISOString()
        }})
    }
}

