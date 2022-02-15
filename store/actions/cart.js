export const ADD_TO_CART ="ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"
export const DELETE_ITEM = "DELETE_ITEM"

export const addtoCart =(product)=>{
    return {type:ADD_TO_CART, product: product}
}

export const removeFromCart =(id)=>{
    return {type: REMOVE_FROM_CART, id: id} 
}

export const deleteItem = (id)=>{
    return {type: DELETE_ITEM, id:id}
}