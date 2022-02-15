import Coffee from '../../models/Coffee';
import { SET_PRODUCTS } from '../actions/Product';
const initialState = {
    availableProducts : []
}
export default (state = initialState, action)=>{
    switch(action.type){
        case SET_PRODUCTS:
            return {
                availableProducts : action.product
            }
        default:
            return{

                initialState
            }
    }
}