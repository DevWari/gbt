
import { 
    GET_USER_REQUEST, 
    GET_USER_SUCCESS, 
    GET_USER_ERROR,
} from '../action-types'

import GBApi from "../../service/GBApi"

const GetUserAction = (id) => {
    return (dispatch) => {
        dispatch({
            type: GET_USER_REQUEST
        })

        GBApi.getUser(id, (err, res) => {
            console.log('currency result', err, res)
            if (err == null && res.error == null) {
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: res.result
                })
            } else {
                dispatch({
                    type: GET_USER_ERROR,
                    payload: err
                })
            }
        })
    }
}

export {
    GetUserAction
}