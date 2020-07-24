import React,{useState,useEffect,useReducer,useCallback} from "react"
import {View,Text,TextInput,ScrollView,KeyboardAvoidingView,StyleSheet,Button,ActivityIndicator,Alert} from "react-native"
import Input from "../../components/UI/Input"
import Colors from "../../constants/Colors"
import {LinearGradient} from "expo-linear-gradient"
import {useDispatch} from "react-redux"
import * as Authaction from "../../store/actions/auth"

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

const Auth=props=>{
    const [isignup,setIssignup]=useState(false)
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState()
    const[formState,dispatchFormState]= useReducer(formReducer,{
        inputValues:{
        email:'',
        password:""
    
    },inputValidities:{
        email:false,
        password:false
    },formIsValid:false})

    useEffect(()=>{
        if(error){
            Alert.alert("Error Occured",error,[{text:"Try Again",}])
        }
        
    },[error])

    const dispatch=useDispatch()

    const auth=async()=>{
        let action;
        if(isignup){
            action=Authaction.signup(formState.inputValues.email,formState.inputValues.password)
        }else{
            action=Authaction.signin(formState.inputValues.email,formState.inputValues.password)
        }
        setError(null)
        setIsLoading(true)
        setError(null)
        try{
            await dispatch(action)
            props.navigation.navigate('shop')
        }catch(err){
            setError(err.message)
            setIsLoading(false)
        }
      
      
    }

    const authhandler=useCallback((inputIdentifier,inputValue,inputValidity)=>{
      
        dispatchFormState({type:REDUCER_UPDATE,value:inputValue,isValid:inputValidity,input:inputIdentifier})
    },[dispatchFormState])

    return(
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40} style={styles.key}>
            <LinearGradient colors={["#ccffff","#ccccff"]} style={styles.gradient}>
        <View style={styles.card}>
           <View style={styles.cardContainer}>
            <ScrollView>
                <Input id="email" label="Email" keyboardType="email-address" required email errortext="Enter a Valid Email Address"
                onInputChange={authhandler} initialValue=""
                />
                 <Input id="password" label="Password" keyboardType="default" secureTextEntry required minLength={5} errortext="Password is Wrong"
                onInputChange={authhandler} initialValue=""
                />
                <View style={styles.btn}>
               {isLoading?<ActivityIndicator size="large" color={Colors.secondary}/>:<Button title={isignup ?'Sign up':"Sign in"} color={Colors.third} onPress={auth}/>} 
                </View>
                <View style={styles.btn}>
                <Button title={`Switch  ${isignup?'Sign in':'Sign up'}`} color={Colors.third} onPress={()=>{setIssignup(prevState=>!prevState)}}/>
                </View>
                
            </ScrollView>
            </View>
            </View>
            </LinearGradient> 
        </KeyboardAvoidingView>
    )

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
        width:"80%",
        height:"60%",
        padding:20
    
    },
    // screen:{
    //     flex:1,
    //     justifyContent:"center",
    //     alignItems:"center",
    //     margin:50,
    //     marginHorizontal:50,
    //     paddingTop:50,
    //     marginVertical:30,
    // },
    key:{
        width:"100%",
        height:"100%",
        flex:1,
    },
    cardContainer:{
        padding:20,
        maxHeight:400,
        width:"100%",
        maxWidth:400,
        paddingBottom:20
    },
    gradient:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    btn:{
        marginTop:35
    }
})

Auth.navigationOptions={
    headerTitle:'Shop-Now'
}
export default Auth