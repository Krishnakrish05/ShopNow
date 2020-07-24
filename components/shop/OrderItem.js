import React,{useState} from "react"
import {View,Text,StyleSheet,Button} from 'react-native'
import Colors from '../../constants/Colors'
import CartItem from "./CartItem"
import {Ionicons} from "@expo/vector-icons"

const OrderItem=props=>{
    const [showDetails,setShowDetails]=useState(false)
    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.amt}>
                ₹{props.total.toFixed(2)}
                </Text>
                <Text style={styles.date}>
                  
                 {props.date}
                </Text>
            </View>
            <Ionicons color={Colors.secondary}size={28} name={showDetails ?"ios-arrow-dropup-circle":'ios-arrow-dropdown-circle'} onPress={()=>{
                setShowDetails(prevState=>!prevState)
            }}/>
            {showDetails && <View style={styles.detail}>
               {props.items.map(cartItem=><CartItem
               key={cartItem.productId} quantity={cartItem.quantity} title={cartItem.productTitle}
               amount={cartItem.sum}
               />)}
                </View>}
        </View>
    )

}

const styles=StyleSheet.create({
    screen:{
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:6,
        borderRadius:10,
        backgroundColor:"white",
        margin:20,
        padding:10,
        alignItems:"center"
    },
    summary:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        marginBottom:25

    },
    amt:{
        fontFamily:"open-sans-bold",
        fontSize:18,

    },
    date:{
        fontFamily:"open-sans",
        fontSize:15,
        color:"#777E8B"

    },
    detail:{
        width:"100%"
    }

})

export default OrderItem