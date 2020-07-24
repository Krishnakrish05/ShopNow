import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import Colors from "../../constants/Colors"
import { color } from 'react-native-reanimated'



const CartItem=props=>{
    return(
        <View style={styles.screen}>
            <Text style={styles.qty}>{props.quantity} x</Text>
    <Text style={styles.title}>{props.title.slice(0,12)}</Text>
             <View style={styles.itemdata}>
    <Text style={styles.amount}>₹{props.amount.toFixed(2)}</Text>
                 {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.delete}>
                 <MaterialCommunityIcons name="delete-empty" size={24} color="#B83227" />
                 </TouchableOpacity>}
             </View>
        </View>
    )

}

const styles=StyleSheet.create({
    screen:{
        padding:10,
        backgroundColor:'#DAE0E2',
        flexDirection:"row",
        justifyContent:"space-between",
        marginHorizontal:10,
        marginVertical:8

    },
    qty:{
        fontSize:17,
        fontFamily:"open-sans",
        color:"#616C6F"
    },
    title:{
        fontFamily:"open-sans-bold",
        fontSize:18,
    },
    itemdata:{
        flexDirection:"row",
        alignItems:"center"
    },
    amount:{
        fontFamily:"open-sans-bold",
        fontSize:18,
        color:"#777E8B"
    },
    delete:{
        marginHorizontal:20
    }
})
export default CartItem