import {
    createStore,
    applyMiddleware
} from 'redux'

import promise from 'redux-promise'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import RootReducer from '../reducers'

let middlewares = [thunk, promise]
if(__DEV__) {
    middlewares = [...middlewares, logger]
}

const middleware = applyMiddleware(...middlewares)

const Store = createStore(
    RootReducer,
    middleware
)

export default Store