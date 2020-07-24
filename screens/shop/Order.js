import React,{useEffect,useState} from "react"
import {View,Text,StyleSheet,FlatList,ActivityIndicator} from "react-native"
import {useSelector,useDispatch} from "react-redux"
import {HeaderButtons,Item} from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import OrderItem from "../../components/shop/OrderItem"
import * as OrderActions from "../../store/actions/orders"
import Colors from "../../constants/Colors"

const Order=props=>{
    const[isLoading,setIsLoading]=useState(false)
    const selectedOrder=useSelector(state=>state.orders.orders)
    const dispatch=useDispatch()

    useEffect(()=>{
            setIsLoading(true)
            dispatch(OrderActions.fetchOrders()).then(()=>{
                setIsLoading(false)
            })
       
    },[dispatch])

    if(isLoading){
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.third}/>
        </View>
    }

    if(selectedOrder.length===0){
        return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
             <Text>No orders Found</Text>
         </View>
        )
     }

    return (
        <FlatList data={selectedOrder} renderItem={itemData=><OrderItem
        total={itemData.item.totalAmount} date={itemData.item.readableDate} 
        items={itemData.item.items}  />

        }/>
    )

}

Order.navigationOptions=navData=>{
    return{
    headerTitle:"Orders",
    headerLeft:()=>(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="md-menu" onPress={()=>{
            navData.navigation.toggleDrawer()
        }}/>
    </HeaderButtons>

    ),
    }
    

}

const styles=StyleSheet.create({
    loading:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }


})

export default Order