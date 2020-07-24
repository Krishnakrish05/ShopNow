import { AUTH, SIGNOUT } from "../actions/auth"

const initialState={
    token:null,
    userId:null
}

export default(state=initialState,action)=>{
    switch(action.type){
        case AUTH:
            return{
                token:action.token,
                userId:action.userId
            }
        // case SIGNUP:
        //     return{
        //         token:action.token,
        //         userId:action.userId
        //     }
        case SIGNOUT:
            return initialState
            
            default:
                return state  
    }
}