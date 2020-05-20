import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import expenseReducer from './reducer'

const store = createStore(expenseReducer, applyMiddleware(thunk));
export default store;
