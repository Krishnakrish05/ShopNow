import React,{useReducer,useEffect} from "react"
import {View,Text,StyleSheet,TextInput} from "react-native"

const INPUT_CHANGE ="INPUT_CHANGE"
const INPUT_BLUR="INPUT_BLUR"
const inputReducer=(state,action)=>{
    switch(action.type){
        case INPUT_CHANGE:
            return{
                ...state,
                value:action.value,
                isValid:action.isValid
            }
            case INPUT_BLUR:
                return{
                    ...state,
                    touched:true
                }
            default:
                return state
    }
}

const Input=props=>{
    const [inputState,dispatch]=useReducer(inputReducer,{
        value:props.initialstate ? props.initialstate:'',
        isValid:props.initialvalid ?props.initialvalid:'',
        touched:false
    })
   const {onInputChange,id}=props
    useEffect(()=>{
        if(inputState.touched){
        onInputChange(id,inputState.value,inputState.isValid)
        }
    },[inputState,onInputChange,id])


 const texthandler=(text)=>{
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let isValid = true;
if (props.required && text.trim().length === 0) {
  isValid = false;
}
if (props.email && !emailRegex.test(text.toLowerCase())) {
  isValid = false;
}
if (props.min != null && +text < props.min) {
  isValid = false;
}
if (props.max != null && +text > props.max) {
  isValid = false;
}
if (props.minLength != null && text.length < props.minLength) {
  isValid = false;
}
 dispatch({type:INPUT_CHANGE,value:text,isValid:isValid})
 }

 const lostfocus=()=>{
     dispatch({type:INPUT_BLUR})

 }
    return(
    <View style={styles.view}>
            <Text style={styles.text}>{props.label} </Text>
            <TextInput {...props} style={styles.input} value={inputState.value} onChangeText={texthandler}
             onBlur={lostfocus}
         />
         {!inputState.isValid && inputState.touched && (<View style={styles.err}>
             <Text style={styles.textcolor}>
              {props.errortext}
         </Text>
         </View>)}
          
        </View>
    )
}
    

const styles=StyleSheet.create({
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
        color:'#FF3031',
        fontFamily:"open-sans",
        fontSize:13
    },
    err:{
        marginVertical:3

    }


})

export default Input