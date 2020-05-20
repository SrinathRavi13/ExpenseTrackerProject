import { combineReducers } from 'redux'
import expenseReducer from './expenseReducer'

//Combine the reducers
export default combineReducers({expenseReducer})