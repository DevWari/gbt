import { combineReducers } from "redux"
import {
	loginReducer
} from './Auth'

import {
	getCurrencyReducer
} from './Currency'

import {
	RecipientReducer
} from './Recipients'

import {
	getUserReducer
} from './User'

export default combineReducers({
	login: loginReducer,
	getCurrency: getCurrencyReducer,
	recipient: RecipientReducer,
	getUser: getUserReducer,
})