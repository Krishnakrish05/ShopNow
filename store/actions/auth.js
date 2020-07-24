import {AsyncStorage} from "react-native"
// export const SIGNUP="SIGNUP"
// export const SIGNIN="SIGNIN"
export const AUTH="AUTH"
export const SIGNOUT="SIGNOUT"

let timer;

export const authenticate=(userId,token,expiryTime)=>{
    return dispatch=>{
        dispatch(setlogout(expiryTime))
        dispatch({type:AUTH,userId:userId,token:token})
    }
}

export const signup=(email,password)=>{
    return async dispatch=>{
     const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCO760iDfU6fDlfl-dpNp4NHCqsCbErgRg',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        })
        if(!response.ok){
            const errdata=await response.json()
            const errcode=errdata.error.message
            let message="Something Went Wrong"
            if(errcode==="EMAIL_EXISTS"){
                message="Email Already Exist"
            }
            throw new Error(message)
        }
        const resdata=await response.json()
        console.log(resdata)
        dispatch(authenticate(resdata.localId,resdata.idToken,parseInt(resdata.expiresIn)*1000))
        const expirationDate=new Date(new Date().getTime() + parseInt(resdata.expiresIn) * 1000)
        savadata(resdata.idToken,resdata.localId,expirationDate)
        
    }
}

export const signin=(email,password)=>{
    return async dispatch=>{
     const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCO760iDfU6fDlfl-dpNp4NHCqsCbErgRg',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        })
        if(!response.ok){
            const errdata=await response.json()
            const errcode=errdata.error.message
            let message="Something Went Wrong"
            if(errcode==="EMAIL_NOT_FOUND"){
                message="Email Doesn't Exist"
            }else if(errcode==="INVALID_PASSWORD"){
                message="Incorrect Password"
            }
            throw new Error(message)
        }
        const resdata=await response.json()
        console.log(resdata)
        dispatch(authenticate(resdata.localId,resdata.idToken,parseInt(resdata.expiresIn)*1000))
        const expirationDate=new Date(new Date().getTime() + parseInt(resdata.expiresIn) * 1000)
        savadata(resdata.idToken,resdata.localId,expirationDate)
    }
}

export const signout=()=>{
    cleartimeout()
    AsyncStorage.removeItem('userData')
    return{type:SIGNOUT}
}

const cleartimeout=()=>{
    if(timer){
    clearTimeout(timer)
    }
}

const setlogout=(expirationTime)=>{
    return dispatch=>{
       timer= setTimeout(()=>{
            dispatch(signout())
        },expirationTime)
    }
}

const savadata=(token,userId,expirationDate)=>{
    AsyncStorage.setItem('userData',JSON.stringify({
        token:token,
        userId:userId,
        expirydate:expirationDate.toISOString()
    }))
}