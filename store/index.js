import { applyMiddleware, combineReducers, createStore } from "redux";
import  productReducer  from "./reducer/Product";
import cartReducer from './reducer/cart'
import orderReducer from './reducer/order'
import authReducer from './reducer/auth' 
import ReduxThunk from 'redux-thunk';
const reducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    auth: authReducer
})
const store = createStore(reducer,applyMiddleware(ReduxThunk))

export default store;