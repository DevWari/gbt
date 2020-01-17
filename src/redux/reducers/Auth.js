

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    LOCK
} from '../action-types'

const initialTokenState = {
    isLoading: false,
    isLocked: false,
    user: null,
    error: null,
    isTouchID: false,
}

const loginReducer = (state = initialTokenState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                data: null,
                error: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null,
                isLocked: false,
                isTouchID: action.isTouchID
            }
        case LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                user: null,
                error: action.payload
            }
        case LOGOUT:
            return initialTokenState;
        case LOCK:
            return {
                ...state,
                isLocked: action.payload
            }
        default:
            return state
    }
}

export {
    loginReducer
}