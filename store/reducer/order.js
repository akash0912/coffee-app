import Order from "../../models/order";
import { ON_ORDER, SET_ORDERS } from "../actions/order";

const initialState = {
    orders:[]
}
export default(state = initialState, action)=>{
    switch(action.type){
        case ON_ORDER:
            const newOrder =new Order(
                Math.random(),
                action.orderData.items,
                action.orderData.totalAmount,
                action.orderData.date
            )

            return{
                orders: state.orders.concat(newOrder)
            }
        case SET_ORDERS:
            return {
                orders: action.order
            }
    }
    return state;
}