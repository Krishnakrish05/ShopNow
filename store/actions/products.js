import Product from "../../models/Products";

export const DELETE_PRODUCT="DELETE_PRODUCT";
export const CREATE_PRODUCT="CREATE_PRODUCT"
export const UPDATE_PRODUCT="UPDATE_PRODUCT"
export const SET_PRODUCTS="SET_PRODUCTS"


export const fetchProducts=()=>{
    return  async (dispatch,getState)=>{
        try{
            const userId=getState().auth.userId
            const response = await fetch("https://shop-app-a77f8.firebaseio.com/products.json" )
            if(!response.ok){
                throw new Error("Something went wrong!")
            }
            const resdata= await response.json()
           const loadedProducts=[]
           for(const key in resdata){
             loadedProducts.push(new Product(key,resdata[key].ownerId,resdata[key].title,resdata[key].imageUrl,resdata[key].description,resdata[key].price))
           }
         dispatch({type:SET_PRODUCTS,products: loadedProducts,userProducts:loadedProducts.filter(prod=>prod.ownerId===userId)})
        }catch(err){
            throw err
        }
       
    }
}

export const deleteProduct=productId=>{
    return async (dispatch,getState)=>{
        const token=getState().auth.token
      const response=  await fetch(`https://shop-app-a77f8.firebaseio.com/products/${productId}.json?auth=${token}`,{
            method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    productId  
                })
            
        })
        if(!response.ok){
            throw new Error("Something went Wrong!")
        }
        dispatch({type:DELETE_PRODUCT,prod:productId})
    }
    
}

export const createProduct=(title,description,imageUrl,price)=>{
    return async (dispatch,getState)=>{
        const token=getState().auth.token
        const userId=getState().auth.userId
      const response = await fetch(`https://shop-app-a77f8.firebaseio.com/products.json?auth=${token}`,{
             method:"POST",
                 headers:{
                     "Content-Type":"application/json"
                 },
                 body:JSON.stringify({
                    title,description,imageUrl,price,ownerId:userId
                 })
             
         })
         const resdata= await response.json()
    
        dispatch({type:CREATE_PRODUCT,product:{
            id:resdata.name,
            title,
            description,
            imageUrl,
            price,
            ownerId:userId
        }})
    }
   
}

export const updateProduct=(id,title,description,imageUrl)=>{
    return async (dispatch,getState)=>{
        const token=getState().auth.token
       const response= await fetch(`https://shop-app-a77f8.firebaseio.com/products/${id}.json?auth=${token}`,{
             method:"PATCH",
                 headers:{
                     "Content-Type":"application/json"
                 },
                 body:JSON.stringify({
                    title,description,imageUrl
                 })
             
         })
         if(!response.ok){
            throw new Error("Something went Wrong!")
        }
        dispatch({
        type:UPDATE_PRODUCT,
            prod:id,
            product:{
            title,
            description,
            imageUrl,
            }
        })  
        
    }
}