import PRODUCTS from "../../data/dummy-data"
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from "../actions/products"
import Product from "../../models/Products"

const initalState={
    availableProducts:[],
    userProducts:[]
}

export default(state=initalState,action)=>{
    switch(action.type){
        case SET_PRODUCTS:
            return{
                availableProducts:action.products,
                userProducts:action.userProducts
            }
        case CREATE_PRODUCT:
            const newProduct =new Product(action.product.id,action.product.ownerId,action.product.title,action.product.imageUrl,action.product.description,action.product.price)
            return{
                ...state,
                availableProducts:state.availableProducts.concat(newProduct),
                userProducts:state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const productIndex=state.userProducts.findIndex(prod=>prod.id===action.prod)
            const updateProduct=new Product(action.prod,state.userProducts[productIndex].ownerId,action.product.title,action.product.imageUrl,action.product.description,state.userProducts[productIndex].price)

            const updatedUserprod=[...state.userProducts]
            updatedUserprod[productIndex]=updateProduct
            const availableproduct=state.availableProducts.findIndex(prod=>prod.id===action.prod)
            const updatedavailableproduct=[...state.availableProducts]
            updatedavailableproduct[availableproduct]=updateProduct
            return{
                ...state,
                availableProducts:updatedavailableproduct,
                userProducts:updatedUserprod
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts:state.userProducts.filter(
                    product=>product.id!==action.prod
                ),
                availableProducts:state.availableProducts.filter(
                    product=>product.id!==action.prod
                )

            }
    }
    return state
}