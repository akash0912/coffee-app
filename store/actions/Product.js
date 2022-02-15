export const SET_PRODUCTS ="SET_PRODUCTS";
import {PRODUCTS} from '../../data/dummyData'

export const setProducts = (product)=>{
    return {type:SET_PRODUCTS,product:PRODUCTS}
}