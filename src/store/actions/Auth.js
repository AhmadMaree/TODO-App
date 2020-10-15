import * as actionType from './actionsType';
import axios from 'axios';

export const authSucces = (idToken,userId) => {
    return {
        type : actionType.AUTHENTICATE_SUCCESS , 
        userId : userId ,
        idToken : idToken,
    }
}

export const authFail = (error) => {
    return {
        type : actionType.AUTHENTICATE_FAIL,
        error : error
    }
}

export  const authStart = () => {
    return {
        type : actionType.AUTHENTICATE_START    ,
    }
}

export  const checkAuth = (expirationTime) => {
    return dispatch => {
        setTimeout (()=> {
           
            dispatch(logOut())
        },expirationTime *1000)
    }
}

export const logOut = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("idUser");
    localStorage.removeItem("expTime");
        return {
            type : actionType.AUTHENTICATE_LOGOUT
        }
}

 export const auth = (email , password , isSignup) => {
        return dispatch => {
            dispatch(authStart());
            const authData = {
                email : email ,
                password : password,
                returnSecureToken : true,
            }
            let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZOG91-bIEArVo3Xe6j4uw2q_QLgxSapQ";
            if(!isSignup){
                url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZOG91-bIEArVo3Xe6j4uw2q_QLgxSapQ"
            }
            axios.post(url,authData)
                 .then(response => {
                        localStorage.setItem("idToken", response.data.idToken);
                        localStorage.setItem("idUser", response.data.localId);
                        localStorage.setItem("expTime", new Date(new Date().getTime()+response.data.expiresIn*1000));
                        dispatch(authSucces(response.data.idToken , response.data.localId))
                        dispatch(checkAuth(response.data.expiresIn))
                 }).catch(err => {
                     dispatch(authFail(err.response.data.error))
                 })
        }
}

export const setRedirctPath =( path) => {
    return {
        type : actionType.SET_REDIRECT_PATH , 
        path : path ,
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('idToken') ;
        if(token) {
            const expirsin = new Date (localStorage.getItem("expTime")) ;
            if(expirsin > new Date()) {
                const userid = localStorage.getItem("idUser");
                dispatch(authSucces(token,userid));
                dispatch(
                    checkAuth (
                      (expirsin.getTime() - new Date().getTime()) / 1000
                    )
                  )
            }else {
                    dispatch(logOut());
            }
        }else {
            dispatch(logOut());
        }
    }

}