
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    LOCK
} from '../action-types'

import GBApi from "../../service/GBApi"

const LoginAction = (email, password, isTouchID) => {
    return (        
        dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        })

        GBApi.login(email, password, (err, user) => {
            console.log('loing result', err, user)
            if (err == null && user != null) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: user,
                    isTouchID
                })
            } else {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: err
                })
            }
        })
    }
}

const LogoutAction = ()=>{
    return (dispatch)=>{
        GBApi.logout()
        dispatch({ type:LOGOUT})
    }
}

const LockAction = (isLocked)=>{
    return (dispatch)=>{
        dispatch({type:LOCK, payload: isLocked})
    }
}

export {
    LoginAction,
    LogoutAction,
    LockAction
}