import React from "react"
import {View,Text,Image,StyleSheet,Button,TouchableOpacity,TouchableNativeFeedback} from 'react-native'
import Colors from "../../constants/Colors"

const ProductItem=props=>{
    return(
        
        <View style={styles.product}>
            <View style={styles.touchable}>
            <TouchableNativeFeedback onPress={props.onSelect} >
                <View>
            <View style={styles.imageContainer}>
            <Image  style={styles.image}source={{uri:props.image}}/>
            </View>
            <View style={styles.text}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.price}>
              ₹{props.price}
            </Text>

            </View>
            <View style={styles.action}>
                {props.children}
            </View>
            </View>
      </TouchableNativeFeedback>
      </View>
      </View>
    )

}
const styles=StyleSheet.create({
    product:{
        shadowColor:"black",
        shadowOpacity:0.5,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:6,
        borderRadius:10,
        backgroundColor:"white",
        height:320,
        margin:18,
    },
    touchable:{
        overflow:"hidden",
        borderRadius:10
    },
    image:{
        width:"100%",
        height:"100%",
        overflow:"hidden",
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    title:{
        fontSize:18,
        marginVertical:8,
        textAlign:"center",
        fontFamily:"open-sans"
        
    },
    price:{
        fontSize:15,
        color:"#7B8788",
        textAlign:"center",
        fontFamily:"open-sans-bold"
    },
    action:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:"13%",
        paddingHorizontal:20,
        
    },
    text:{
        height:"25%",
    },
    imageContainer:{
        width:"100%",
        height:"60%"

    }
})
export default ProductItem