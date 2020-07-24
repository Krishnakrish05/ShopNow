import React from "react"
import {View,Text,SafeAreaView,Button} from "react-native"
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator,DrawerNavigatorItems} from "react-navigation-drawer"
import ProductOverview from "../screens/shop/ProductOverview";
import Colors from "../constants/Colors"
import ProductDetail from "../screens/shop/ProductDetail"
import Cart from "../screens/shop/Cart"
import Order from "../screens/shop/Order"
import {Ionicons} from "@expo/vector-icons"
import UserProduct from "../screens/user/UserProduct"
import EditProduct from '../screens/user/EditProduct'
import Auth from "../screens/user/Auth"
import Startup from "../screens/Startup"
import {useDispatch} from "react-redux"
import * as Authactions from "../store/actions/auth"

const deafultstyle={
    headerStyle:{
       backgroundColor: Colors.third
    },
    headerTitleStyle:{
        fontFamily:"open-sans-bold"
    },
    headerTintColor:Colors.secondary
}



const ProductsNavigator=createStackNavigator({
    Overview:ProductOverview,
    Detail:ProductDetail,
    addcart:Cart,

},{
    navigationOptions:{
        drawerIcon:drawerConfig=>(
            <Ionicons name='md-list'
            size={23} color={drawerConfig.tintColor}/>
        )
    },
    defaultNavigationOptions:deafultstyle
})

const OrdersNavigator=createStackNavigator({
    addorder:Order
},{
    navigationOptions:{
        drawerIcon:drawerConfig=>(
            <Ionicons name='md-cart'
            size={23} color={drawerConfig.tintColor}/>
        )
    },
    defaultNavigationOptions:deafultstyle
})

const AdminNavigator=createStackNavigator({
    userproduct:UserProduct,
    editproducts:EditProduct,
},{
    navigationOptions:{
        drawerIcon:drawerConfig=>(
            <Ionicons name='md-create'
            size={23} color={drawerConfig.tintColor}/>
        )
    },
    defaultNavigationOptions:deafultstyle
})

const ShopNavigator=createDrawerNavigator({
    Products:ProductsNavigator,
    Orders:OrdersNavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor:Colors.third
    },
    contentComponent:props=>{
        const dispatch=useDispatch()
        return <View style={{flex:1,paddingTop:40}}>
            <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
                <DrawerNavigatorItems {...props}/>
                <Button title="Sign Out" color={Colors.third} onPress={()=>{
                    dispatch(Authactions.signout())
                    // props.navigation.navigate('main')
                }}/>
            </SafeAreaView>

        </View>
    }
})

const authNavigator=createStackNavigator({
    auths:Auth
},{
    defaultNavigationOptions:deafultstyle
})

const Mainnavigator=createSwitchNavigator({
    start:Startup,
    main:authNavigator,
    shop:ShopNavigator,
})

export default createAppContainer(Mainnavigator);