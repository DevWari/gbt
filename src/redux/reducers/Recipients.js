import {
    RECIPIENT_REQUEST,
    RECIPIENT_SUCCESS,
    RECIPIENT_ERROR,
} from '../action-types'

const initialTokenState = {
    isLoading: false,
    recipients: [],
    error: null
}

const RecipientReducer = (state = initialTokenState, action) => {
    switch (action.type) {
        case RECIPIENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error:null
            }
        case RECIPIENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                recipients: action.payload,
                error: null
            }
        case RECIPIENT_ERROR:
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
    RecipientReducer
}