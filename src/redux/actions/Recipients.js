
import {
    RECIPIENT_REQUEST,
    RECIPIENT_SUCCESS,
    RECIPIENT_ERROR,
} from '../action-types'

import GBApi from "../../service/GBApi"

const GetRecipient = () => {
    return (dispatch) => {
        dispatch({
            type: RECIPIENT_REQUEST
        })

        GBApi.getUsers((err, result) => {
            console.log('recipients result', err, result)
            if (err == null && result.error == null) {
                dispatch({
                    type: RECIPIENT_SUCCESS,
                    payload: result.result
                })
            } else {
                dispatch({
                    type: RECIPIENT_ERROR,
                    payload: err
                })
            }
        })
    }
}

export {
    GetRecipient
}