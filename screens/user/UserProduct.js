import React,{useState} from "react"
import {View,Text,Button,FlatList,StyleSheet,Alert,ActivityIndicator} from "react-native"
import {useSelector,useDispatch} from"react-redux"
import ProductItem from "../../components/shop/ProductItem"
import {HeaderButtons,Item} from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import Colors from "../../constants/Colors"
import * as ProductActions from "../../store/actions/products"

const UserProduct=props=>{
    const[isLoading,setIsLoading]=useState(false)
    const[error,setError]=useState()
    const userProducts=useSelector(state=>state.product.userProducts)
    const dispatch=useDispatch()

    const edit=(id)=>{
        props.navigation.navigate("editproducts",{productId:id})

    }
  
    const deletealert=(id)=>{
       
        Alert.alert("Are You Sure ?","You want Delete this Product ?",[
            {text:'No',style:'default'},{text:'Yes',style:'destructive',onPress:async()=>{
                setError(null)
                setIsLoading(true)
                try{
                  await dispatch(ProductActions.deleteProduct(id))
                }catch(err){
                    setError(err.message)
                }
                setIsLoading(false)
        
            }
            }
            ])
    }

    if(userProducts.length=== 0){
        return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
             <Text>No Products Found</Text>
         </View>
        )
     }
   
    return <FlatList data={userProducts} keyExtractor={item=>item.id}
     renderItem={itemData=>(
         <ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price}
        onSelect={()=>{
            edit(itemData.item.id)
        }}> 
        <View style={styles.btn1}>
        <Button color={Colors.third} title="Edit 🔧" onPress={()=>{
            edit(itemData.item.id)
        }}/>
        </View >
       <View style={styles.btn2}>
           {isLoading ?<ActivityIndicator size="small" color={Colors.secondary}/>:
           <Button color={Colors.third} title="Delete 🗑️" onPress={()=>{deletealert(itemData.item.id)}}/> }
            
            </View>
        </ProductItem>
     )}  />

}

UserProduct.navigationOptions=navData=>{
    return{
    headerTitle:"User Products",
    headerLeft:()=>(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="md-menu" onPress={()=>{
            navData.navigation.toggleDrawer()
        }}/>
    </HeaderButtons>

    ),
    headerRight:()=>(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="logo-googleplus" onPress={()=>{
            navData.navigation.navigate("editproducts")
        }}/>
    </HeaderButtons>

    )
    }
}

const styles=StyleSheet.create({
    btn1:{
        width:"25%",
        alignItems:"center",
        justifyContent:"space-between"
    },
    btn2:{
        width:"32%",
        alignItems:"center",
        justifyContent:"space-between"
    },
    loading:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }

})

export default UserProduct