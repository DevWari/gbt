
import { 
    CURRENCY_REQUEST, 
    CURRENCY_SUCCESS, 
    CURRENCY_ERROR,
} from '../action-types'

import GBApi from "../../service/GBApi"

const CurrencyAction = () => {
    return (dispatch) => {
        dispatch({
            type: CURRENCY_REQUEST
        })

        GBApi.getCurrencies((err, res) => {
            console.log('currency result', err, res)
            if (err == null && res.error == null) {
                dispatch({
                    type: CURRENCY_SUCCESS,
                    payload: res.result
                })
            } else {
                dispatch({
                    type: CURRENCY_ERROR,
                    payload: err
                })
            }
        })
    }
}

export {
    CurrencyAction
}