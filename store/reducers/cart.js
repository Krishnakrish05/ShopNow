import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart"
import CartItem from "../../models/cart-item"
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState={
    items:{},
    totalAmount: 0
}

export default (state=initialState,action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct=action.product;
            const prodPrice=addedProduct.price;
            const prodTitle=addedProduct.title;

            let updatedOrNewCart;

            if(state.items[addedProduct.id]){
                updatedOrNewCart=new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,prodTitle,state.items[addedProduct.id].sum + prodPrice);      

            }
            else{
               updatedOrNewCart=new CartItem(1,prodPrice,prodTitle,prodPrice) ;
                }
                return{
                    ...state,
                    items:{ ...state.items,[addedProduct.id]:updatedOrNewCart},
                    totalAmount:state.totalAmount + prodPrice
                 }
                 case REMOVE_FROM_CART:
                     const currentQty=state.items[action.prod].quantity
                    let updatedcartitems
                     if(currentQty > 1){
                         const updatecartitem=new CartItem(
                             state.items[action.prod].quantity - 1, 
                             state.items[action.prod].productPrice,
                             state.items[action.prod].productTitle,
                             state.items[action.prod].sum - state.items[action.prod].productPrice);
                             updatedcartitems ={...state.items,[action.prod]:updatecartitem}
                         
                     }else{
                          updatedcartitems={...state.items}
                         delete updatedcartitems[action.prod]
                     }
                     return{
                         ...state,
                         items:updatedcartitems,
                         totalAmount:state.totalAmount -  state.items[action.prod].productPrice
                     }
                     case DELETE_PRODUCT:
                         if(!state.items[action.prod]){
                             return state
                         }
                         const updateitem={...state.items}
                         const itemtotal=state.items[action.prod].sum
                         delete updateitem[action.prod]
                         return{
                             ...state,
                             items:updateitem,
                             totalAmount:state.totalAmount-itemtotal
                         }
                     case ADD_ORDER:
                         return initialState
        
    }

    return state;
}

