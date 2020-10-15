import * as actionType from '../actions/actionsType';
import {updateObject} from '../../Shared/utility';

const initalState = {
    idToken : null ,
    userId : null ,
    error : null ,
    loading : false ,
    redirectPath : '/' ,
}

const authStart = ( state , action ) => {
    return updateObject(state , {error : null , loading : true})
}
const authSuccess = ( state , action ) => {
    return updateObject(state , {
        idToken : action.idToken ,
        userId : action.userId ,
        error : null , 
        loading : false
    
    })
}
const authFail = ( state , action ) => {
    return updateObject(state , {
        error : action.error, 
        loading : false
    })
}
const authlogout = ( state , action ) => {
    return updateObject(state , {
        idToken : null , 
        userId : null ,
    })
}

export const setAuthRedirectPath =(state , action ) =>{
        return updateObject (state , {redirectPath: action.path})
}

const authReducer = (state = initalState , action) => {
    switch(action.type) {
    case actionType.AUTHENTICATE_START : return authStart(state,action) 
    case actionType.AUTHENTICATE_FAIL : return authFail(state,action) 
    case actionType.AUTHENTICATE_SUCCESS: return authSuccess(state,action)
    case actionType.AUTHENTICATE_LOGOUT : return authlogout(state,action)
    case actionType.SET_REDIRECT_PATH : return setAuthRedirectPath(state,action)
    default : return state 
    }
}
export default authReducer;