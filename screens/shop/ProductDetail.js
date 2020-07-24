import React from "react"
import {Text,View,Button,StyleSheet,ScrollView,Image} from "react-native"
import {useSelector,useDispatch} from "react-redux"
import Colors from "../../constants/Colors"
import * as CartActions from "../../store/actions/cart"

const ProductDetail=props=>{
    const productId=props.navigation.getParam("productId")
    const selectedProduct=useSelector(state=>state.product.availableProducts.find(product=>product.id===productId))
    const dispatch=useDispatch()
    return(
        <ScrollView style={styles.card}>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.btn}>
            <Button color={Colors.third} title="Add to Cart" onPress={()=>{
                dispatch(CartActions.addtoCart(selectedProduct))
            }}/>

            </View>
            <Text style={styles.price}>
              ₹{selectedProduct.price}
            </Text>
            <Text style={styles.description}>
                {selectedProduct.description}
            </Text>
    
           
        </ScrollView>

    )

}
ProductDetail.navigationOptions=navData=>{
    return{
        headerTitle:navData.navigation.getParam("productTitle")
    }

}
const styles=StyleSheet.create({
    card:{
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
    image:{
        width:'100%',
        height:300,
        marginTop:10
    },
    price:{
        fontSize:18,
        color:"#7B8788",
        textAlign:"center",
        marginVertical:20,
        fontFamily:"open-sans-bold"

    },
    description:{
        fontSize:15,
        textAlign:"center",
        marginHorizontal:20,
        fontFamily:'open-sans'

    },
    btn:{
        margin:20,
        alignItems:"center"

    }


})
export default ProductDetail