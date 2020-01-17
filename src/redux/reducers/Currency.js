import {
    CURRENCY_REQUEST,
    CURRENCY_SUCCESS,
    CURRENCY_ERROR
} from '../action-types'

const initialSaleState = {
    isLoading: false,
    data: null,
    error: null
}

const getCurrencyReducer = (state = initialSaleState, action) => {
    switch (action.type) {
        case CURRENCY_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case CURRENCY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case CURRENCY_ERROR:
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
    getCurrencyReducer,
}