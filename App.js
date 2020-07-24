import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers,applyMiddleware} from "redux"
import {Provider} from "react-redux"
import productReducer from "./store/reducers/products"
import ShopNavigation from "./navigation/ShopNavigation"
import  {AppLoading} from "expo"
import * as Font from "expo-font"
import cartReducer from "./store/reducers/cart"
import orderReducer from "./store/reducers/orders"
import ReduxThunk from "redux-thunk"
import authReducer from "./store/reducers/auth"
import NavigationContainer from './navigation/NavigationContainer'

const rootReducer=combineReducers({
  product:productReducer,
  cart:cartReducer,
  orders:orderReducer,
  auth:authReducer
})

const store=createStore(rootReducer,applyMiddleware(ReduxThunk))

const fetchFonts=()=>{
  return Font.loadAsync({
    "open-sans": require('./fonts/OpenSans-Regular.ttf'),
    "open-sans-bold" : require('./fonts/OpenSans-Bold.ttf')

  })
 
}

const  App=props=>{
  const [fontLoaded,setFontLoaded]=useState(false)
  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>{
      setFontLoaded(true)
    }}/>
  }
  return (
   <Provider store={store}>
    <NavigationContainer/>
   </Provider>
  );
}



export default App