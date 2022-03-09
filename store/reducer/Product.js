import Coffee from "../../models/Coffee";
import {
  SET_PRODUCTS,
  ADD_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/Product";
const initialState = {
  availableProducts: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
      let temp = [...state.availableProducts];
      temp.push(action.product);
      return {
        ...state,
        availableProducts: temp,
      };
    case UPDATE_PRODUCT:
      const selectedProductIndex = state.availableProducts.findIndex(
        (item) => item._id === action.id
      );
      
      const updatedProduct = new Coffee(
        action.id,
        action.product.name,
        action.product.image,
        action.product.ingredients,
        action.product.price
      );

      const updatedNewProducts = { ...state.availableProducts };
      updatedNewProducts[selectedProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedNewProducts,
      };
    case SET_PRODUCTS:

      return {
        availableProducts: action.product,
      };
    case DELETE_PRODUCT:
      const productsAfterDeletion = state.availableProducts.filter(prod=>prod.id === action.id)
      
      return{
        availableProducts: productsAfterDeletion
      }
    default:
      return {
        initialState,
      };
  }
  return state;
};
