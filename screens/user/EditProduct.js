import React,{useState,useEffect,useCallback,useReducer} from "react"
import {View,Text,ScrollView,FlatList,Button,StyleSheet,TextInput, Alert,KeyboardAvoidingView,ActivityIndicator} from "react-native"
import {HeaderButtons,Item} from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import {useSelector,useDispatch} from "react-redux"
import * as ProductActions from "../../store/actions/products"
import Input from "../../components/UI/Input"
import Colors from "../../constants/Colors"

const REDUCER_UPDATE="REDUCER_UPDATE"
const formReducer=(state,action)=>{
     if(action.type===REDUCER_UPDATE){
         const updatedValues={
             ...state.inputValues,
             [action.input]:action.value,
         }
         const updatedValidites={
             ...state.inputValidities,
             [action.input]:action.isValid
         }
         let formisValid =true
         for(const key in updatedValidites){
             formisValid=formisValid && updatedValidites[key]
         }
         return{
            formIsValid:formisValid,
            inputValidities:updatedValidites,
             inputValues:updatedValues,
             
         }

     }
     return state
}

const EditProduct=props=>{
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState()
    const prodId=props.navigation.getParam("productId")
    const editedProduct=useSelector(state=>state.product.userProducts.find(prod=>prod.id===prodId))
    const dispatch=useDispatch()

    const[formState,dispatchFormState]= useReducer(formReducer,{
        inputValues:{
        title:editedProduct?editedProduct.title:'',
        imageUrl:editedProduct?editedProduct.imageUrl:"",
        price:'',
        description:editedProduct?editedProduct.description:''

    },inputValidities:{
        title:editedProduct?true:false,
        imageUrl:editedProduct?true:false,
        price:editedProduct?true:false,
        description:editedProduct?true:false,
    },formIsValid:editedProduct?true:false})

    // const [title,setTitle]=useState(editedProduct?editedProduct.title:'')
    // const [titleisvalid,setTitleisvalid]=useState(false)
    // const [imageUrl,setImageUrl]=useState(editedProduct?editedProduct.imageUrl:"")
    // const [price,setPrice]=useState('')
    // const [description,setDescription]=useState(editedProduct?editedProduct.description:'')

    useEffect(()=>{
        if(error){
            Alert.alert("An Error Occured!",error,[{text:'Retry'}])
        }
    },[error])

    const submit=useCallback(async()=>{
        if(!formState.formIsValid){
            Alert.alert("Input Missing","Please enter the required input!",[{text:'OK'}])
            return
        }
        setError(null)
        setIsLoading(true)
        try{
            if(editedProduct){
                await dispatch(ProductActions.updateProduct(prodId,formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl))
                  }else{
                    await  dispatch(ProductActions.createProduct(formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl,+formState.inputValues.price))
                  }
                  props.navigation.goBack()
        }catch(err){
            setError(err.message)
        }
       
        setIsLoading(false)
       
    },[dispatch,prodId,formState])

    useEffect(()=>{
        props.navigation.setParams({submited:submit})

    },[submit])

    const texthandler=useCallback((inputIdentifier,inputValue,inputValidity)=>{
      
        dispatchFormState({type:REDUCER_UPDATE,value:inputValue,isValid:inputValidity,input:inputIdentifier})
        
    },[dispatchFormState])

    if(isLoading){
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
    }
   
    return(
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={10}>
        <ScrollView>
            <View style={styles.form}>
  <Input
        id="title"
        keyboardType='default'
        label='Title'
        errortext="Enter the valid Title" 
        onInputChange={texthandler}
        initialstate={editedProduct?editedProduct.title:''}
        initialvalid={!!editedProduct}
        required
        />    
    
   <Input
        id="imageUrl"
        keyboardType='default'
        label='imageUrl'
        errortext="Enter the image URL , image should be within 3MB"
        onInputChange={texthandler}
        initialstate={editedProduct?editedProduct.imageUrl:''}
        initialvalid={!!editedProduct}
        required
        />
      
        {editedProduct?null:<Input
        id="price"
        keyboardType='decimal-pad'
        label='price'
        errortext="Enter the exact price" 
        onInputChange={texthandler}
        required
        min={1}
        />}
        
         <Input
        id="description"
        keyboardType='default'
        label='description'
        errortext="Enter precise description within 100 words"
        onInputChange={texthandler}
        numberofLines={2}
        initialstate={editedProduct?editedProduct.description:''}
        initialvalid={!!editedProduct}
        required
        minLength={5}
        />
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )

}
EditProduct.navigationOptions=navData=>{
    const sub=navData.navigation.getParam("submited")
    return{
        headerTitle:navData.navigation.getParam("productId")?"Manage Products":'Add Product',
        headerRight:()=>(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName="md-checkmark" onPress={sub}/>
        </HeaderButtons>
    
        )
    }
}

const styles=StyleSheet.create({
    form:{
        margin:20
    },
    view:{
        width:"100%"
    },
    text:{
        fontFamily:"open-sans-bold",
        fontSize:16,
        marginVertical:10
    },
    input:{
        paddingVertical:3,
        paddingHorizontal:8,
        borderBottomColor:"#616C6F",
        borderBottomWidth:1.5
    },
    textcolor:{
        color:'#7B8788',
        fontFamily:"open-sans",
        fontSize:13
    },
    loading:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }

})

export default EditProduct