import Cart from "../../models/Cart";
import { ADD_TO_CART, DELETE_ITEM, REMOVE_FROM_CART } from "../actions/cart";
import { ON_ORDER } from "../actions/order";
const initialState = {
    items: {},
    totalAmount: 0
  };
export default (state = initialState, action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const addedItem = action.product;
            // console.log(addedItem.id)
            const price = addedItem.price;
            const name = addedItem.name;
            let updatedProduct ;
            // console.log(addedItem.id)
            if(state.items[addedItem.id]){
                updatedProduct = new Cart(
                    addedItem.id,
                    state.items[addedItem.id].quantity + 1,
                    name,
                    price,
                    state.items[addedItem.id].sum + price
                );
            
            }else{
                updatedProduct = new Cart(addedItem.id, 1, name, price, price )
            }
            // console.log(state)

            return{
               
                items: {...state.items, [addedItem.id]: updatedProduct},
                totalAmount : state.totalAmount + price
            };
            case REMOVE_FROM_CART:
                const selectedItem = state.items[action.id];
                const currQuantity = selectedItem.quantity
                let updatedCartItems;
                if(currQuantity>1){
                    const updatedCartItem = new Cart(
                        action.id,
                        selectedItem.quantity - 1,
                        selectedItem.name,
                        selectedItem.price,
                        selectedItem.sum - selectedItem.price
                    );
                    updatedCartItems = {...state.items, [action.id]:updatedCartItem}
                }else{
                    updatedCartItems = {...state.items};
                    delete updatedCartItems[action.id]
                }
                return{
                    ...state,
                    items: updatedCartItems,
                    totalAmount: state.totalAmount - selectedItem.price
                }

                case ON_ORDER:
                    return initialState
                case DELETE_ITEM:
                    const itemToDelete = state.items[action.id];
                    const newCart = {...state.items};
                    delete newCart[action.id];
                    return{
                        ...state,
                        items: newCart,
                        totalAmount: state.totalAmount - itemToDelete.sum
                    }
    }
    return state;
}


