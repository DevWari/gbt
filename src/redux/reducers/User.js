import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR
} from '../action-types'

const initialSaleState = {
    isLoading: false,
    data: null,
    error: null
}

const getUserReducer = (state = initialSaleState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case GET_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export {
    getUserReducer,
}