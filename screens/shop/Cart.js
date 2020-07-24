import React,{useState} from "react"
import {View,Text,StyleSheet,FlatList,Button,ActivityIndicator} from "react-native"
import {useSelector,useDispatch} from "react-redux"
import Colors from "../../constants/Colors"
import CartItem from "../../components/shop/CartItem"
import * as cartActions from '../../store/actions/cart'
import * as orderActions from "../../store/actions/orders"


const Cart=props=>{
    const [isLoading,setIsLoading]=useState(false)
    const cartTotalAmount=useSelector(state=>state.cart.totalAmount)
    const cartItems=useSelector(state=>{
        const carts=[]
        for(const key in state.cart.items){
            carts.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum,

            })
        }
        return carts
    })
    const dispatch=useDispatch()

    const sendhandler=async()=>{
        setIsLoading(true)
      await  dispatch(orderActions.addOrder(cartItems,cartTotalAmount))
      setIsLoading(false)
    }


    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
    <Text style={styles.summarytext}> Total: <Text style={styles.amount}>₹{Math.round(cartTotalAmount.toFixed(2)*100)/100} </Text></Text>
    {isLoading?<ActivityIndicator size="large" color={Colors.secondary}/>: <Button title="Buy now" color={Colors.third} disabled={cartItems.length===0}
    onPress={sendhandler}/>}
   
            </View>
            <FlatList data={cartItems} keyExtractor={item=>item.productId} renderItem={itemData=>(
                <CartItem
            title={itemData.item.productTitle} quantity={itemData.item.quantity} amount={itemData.item.sum} deletable onRemove={()=>{
                dispatch(cartActions.removeFromCart(itemData.item.productId))
           
            }}
            
            />)}/>
        

            </View>
    )
}
const styles=StyleSheet.create({
    screen:{
        margin:20
    },
    summary:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:20,
        padding:20,
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:6,
        borderRadius:10,
        backgroundColor:"white",

    },
    amount:{
        color:"#777E8B"
    },
    summarytext:{
        fontFamily:'open-sans-bold',
        fontSize:17

    },
    loading:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

Cart.navigationOptions={
    headerTitle:"Cart"
}

export default Cart