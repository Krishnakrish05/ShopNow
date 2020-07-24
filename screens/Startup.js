import React,{useEffect} from "react"
import {View,ActivityIndicator,Text,StyleSheet,AsyncStorage} from "react-native"
import Colors from "../constants/Colors"
import {useDispatch} from "react-redux"
import * as Authactions from "../store/actions/auth"

const Startup=props=>{
    const dispatch=useDispatch()
    useEffect(()=>{
        const trylogin=async()=>{
            const userData=await AsyncStorage.getItem('userData')
            if(!userData){
                props.navigation.navigate('main')
                return
            }
            const transformedData=JSON.parse(userData)
            const {token,userId,expirydate}=transformedData
            const expirationDate=new Date(expirydate)
            
            if(expirationDate<=new Date() || !token || !userId){
                props.navigation.navigate('main')
                return
            }
            const expirationTime=expirationDate.getTime() - new Date().getTime()

            props.navigation.navigate('shop')
            dispatch(Authactions.authenticate(token,userId,expirationTime))
        }
        trylogin()
    },[dispatch])
    return(
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.secondary}/>
        </View>
    )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})

export default Startup