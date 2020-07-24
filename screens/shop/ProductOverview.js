import React,{useEffect,useState,useCallback} from "react"
import {View,Text,FlatList,Button,StyleSheet,ActivityIndicator} from 'react-native'
import {useSelector,useDispatch} from "react-redux"
import ProductItem from "../../components/shop/ProductItem"
import * as CartActions from "../../store/actions/cart"
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from "../../constants/Colors"
import * as productsActions from "../../store/actions/products"

const ProductOverview=props=>{
    const [isLoaded,setIsLoaded]=useState(false)
    const [refreshing,setRefreshing]=useState(false)
    const [error,setError]=useState()
    const products=useSelector(state=>state.product.availableProducts)
    const dispatch=useDispatch()


    const loadedproducts=useCallback(async()=>{
        setError(null)
        setRefreshing(true)
        try{
            await dispatch(productsActions.fetchProducts())
        }catch(err){
            setError(err.message)
        }
       setRefreshing(false)
    },[dispatch,setIsLoaded,setError])

    useEffect(()=>{
       const willfocused= props.navigation.addListener("willFocus",loadedproducts)

       return ()=>{
        willfocused.remove()
       }
    },[loadedproducts])

    useEffect(()=>{
        setIsLoaded(true)

        loadedproducts().then(()=>{
            setIsLoaded(false)
        })

    },[dispatch,loadedproducts])

    const selectedItems=(id,title)=> {
        props.navigation.navigate("Detail",{productId:id,productTitle:title})
    }

    if(error){
        return(
            <View style={styles.loading}>
            <Text>Error Occured! Please Try Again </Text>
            <Button title="Try Again" onPress={loadedproducts}color={Colors.third}/>
        </View>
        )
    }

    if(isLoaded){
        return(
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.secondary}/>
            </View>
        )
    }

    if(!isLoaded && products.length===0){
        return(
            <View style={styles.loading}>
                <Text>No Products found!</Text>
            </View>
        )
    }
    return(
        <FlatList onRefresh={loadedproducts} refreshing={refreshing} data={products} renderItem={itemData=><ProductItem
        image={itemData.item.imageUrl} title={itemData.item.title}
        price={itemData.item.price} onSelect={()=>{
            selectedItems(itemData.item.id,itemData.item.title)
            
        }}>
         <Button color={Colors.third} title="Add to Cart" onPress={()=>{dispatch(CartActions.addtoCart(itemData.item))}}/>
        <Button color={Colors.third} title="Description" onPress={()=>{selectedItems(itemData.item.id,itemData.item.title)}}/>

         </ProductItem> 
        }
        />

    )
}
ProductOverview.navigationOptions=navData=>{
    return{
    headerTitle:"Shop Now",
    headerLeft:()=>(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="md-menu" onPress={()=>{
            navData.navigation.toggleDrawer()
        }}/>
    </HeaderButtons>

    ),
    headerRight:()=>(
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Cart" iconName="md-cart" onPress={()=>{
            navData.navigation.navigate("addcart")
        }}/>
    </HeaderButtons>
    )
    }
}

const styles=StyleSheet.create({
    loading:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
export default ProductOverview