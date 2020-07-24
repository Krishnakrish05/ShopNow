import Order from "../../models/orders"

export const ADD_ORDER ="ADD_ORDER"
export const SET_ORDERS="SET_ORDERS"

export const fetchOrders=()=>{
    return async (dispatch,getState)=>{
        const userId=getState().auth.userId
        try{
            const response = await fetch(`https://shop-app-a77f8.firebaseio.com/orders/${userId}.json`)
            if(!response.ok){
                throw new Error("Something went wrong!")
            }
            const resdata= await response.json()
           const loadedOrders=[]
           for(const key in resdata){
            loadedOrders.push(new Order(key,resdata[key].cartItems,resdata[key].totalAmount,new Date(resdata[key].date)))
           }
        dispatch({type:SET_ORDERS,orders:loadedOrders})
        }catch(err){
            throw err
        }
    

    }
}

export const addOrder=(cartItems,totalAmount)=>{
    return async (dispatch,getState)=>{
        const token=getState().auth.token
        const userId=getState().auth.userId
        const date=new Date()
    const response = await fetch(`https://shop-app-a77f8.firebaseio.com/orders/${userId}.json?auth=${token}`,{
             method:"POST",
                 headers:{
                     "Content-Type":"application/json"
                 },
                 body:JSON.stringify({
                    cartItems,totalAmount,
                    date:date.toISOString()
                 })
             
         })
         if(!response.ok){
             throw new Error('Something Went Wrong')
         }
         const resdata=await response.json()
   
        dispatch({type:ADD_ORDER,
        orderData:{id:resdata.name,items:cartItems,amount:totalAmount,date:date}
        })
    }
  
}