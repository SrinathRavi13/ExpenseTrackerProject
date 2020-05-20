import {applyMiddleware, createStore} from 'redux'
import rootReducer from '../src/reducer';
import {middlewares} from '../src/store';
import checkPropTypes from 'check-prop-types';

const intialState = {
    expenseList: [],
    totalAmount: 0,
    totalTax: 0
};

export const findByTestAttribute = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
}

export const checkProps = (component, expectedProps) => {
    const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props',component.name);
    return propsErr;
} 

export const testStore = (initialState = intialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer,initialState);
}