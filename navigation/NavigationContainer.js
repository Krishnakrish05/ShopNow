import React,{useEffect,useRef}from "react"
import ShopNavigator from '../navigation/ShopNavigation'
import {useSelector} from "react-redux"
import {NavigationActions} from "react-navigation"

const NavigationContainer=props=>{
    const authref=useRef()
    const isauth=useSelector(state=>!!state.auth.token)
    useEffect(()=>{
        if(!isauth){
            authref.current.dispatch(NavigationActions.navigate({routeName:"main"}))
        }
    },[isauth])
    return <ShopNavigator ref={authref}/>

}
export default NavigationContainer
