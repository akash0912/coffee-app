export const ON_ORDER ="ON_ORDER";
export const SET_ORDERS = "SET_ORDERS"
import Order from "../../models/order";

export const fetchOrders=()=>{
    return async (dispatch,getState)=>{
        const date = new Date().toISOString();
        const token = getState().auth.token
        const userId = getState().auth.userId
        const response = await fetch(`https://coffee-app-d0aa0-default-rtdb.firebaseio.com/order/${userId}.json`)

        if(!response.ok){
            throw new Error("Something Went Wrong!")
        }
        const resData = await response.json();
        const loadOrders = [];
        for (const key in resData) {
          loadOrders.push(
            new Order(
              key,
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

        const response = await fetch(`https://coffee-app-d0aa0-default-rtdb.firebaseio.com/order/${userId}.json`,{
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                cartItems,
                totalAmount,
                date
            })
        })
        
        if(!response.ok){
            throw new Error("Something Went Wrong!")
        }
        const resData = await response.json();
        dispatch( { type:ON_ORDER, orderData:{
            id: resData.name,
            items: cartItems,
            totalAmount: totalAmount,
            date: new Date().toISOString()
        }})
    }
}

