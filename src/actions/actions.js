/**
 * Action Creator Methods
 * @author - Srinath Ravi <srinath_ravi@hotmail.com> 
 */

import store from '../store';
import * as actionTypes from '../constants/actionTypes'
import * as api from '../api/api'

 /**
 * Action - fetchData
 * Fetch data from api and intialize the store value
 * @return {Object} - The action Object {type}
 */
export const fetchData = () => {
    return {
        type : actionTypes.INIT_STORE
    }
}

/**
 * Action - getExpensesList
 * Get expense list from the store
 * @return {Object} - The action Object {type,expenseList}
 */
export const getExpensesList = expenses => {
    return {
        type : actionTypes.GET_EXPENSES,
        expenseList : expenses
    }
}


/**
 * Action - addExpense
 * Add an Expense detail to the store
 * @return {Object} - The action Object {type, expense}
 */
export const addExpense = expense => {
    return {
        type : actionTypes.ADD_EXPENSE,
        expense : expense
    }
}

/**
 * Action - updateExpense
 * Update an Expense detail in the store
 * @return {Object} - The action Object {type,expense}
 */
export const updateExpense = expense => {
    return {
        type : actionTypes.UPDATE_EXPENSE,
        expense : expense
    }
}

/**
 * Action - deleteExpense
 * Delete an Expense detail from the store
 * @return {Object} - The action Object {type,id}
 */
export const deleteExpense = id => {
    return {
        type : actionTypes.DELETE_EXPENSE,
        id : id
    }
}

/**
 * Action - getTotalExpense
 * @return {Object} - The action Object
 */
export const getTotalExpense = () => {
    return {
        type : actionTypes.TOTAL_EXPENSE
    }
}

/**
 * Action - Total Tax
 * @return {Object} - The action Object
 */
export const getTotalTax = () => {
    return {
        type : actionTypes.TOTAL_TAX
    }
}

/*
 * Action Creator Methods using Thunk to handle Async calls
 */

/**
 * Fetch expenses list
 * @return {funtion} - Redux Callback getExpensesList
 */
export const fetch_Api_Data = () => {
    store.dispatch(fetchData());
    return (dispatch) => {
        return api.getExpensesList(dispatch);
    } 
}

/**
 * Add Expense detail
 * @param {object} expense - An expense item
 * @return {funtion} - callback AddExpense
 */
export const api_AddExpense = expense => {
    return (dispatch) => {
        return api.AddExpense(expense,dispatch);
    } 
}

/**
 * Update Expense detail
 * @param {object} expense - An expense item
 * @return {funtion} - callback UpdateExpense
 */
export const api_UpdateExpense = expense => {
    store.dispatch(fetchData());
    return (dispatch) => {
        return api.UpdateExpense(expense,dispatch);
    } 
}

/**
 * Delete Expense detail
 * @param {number} id 
 * @return {funtion} - callback DeleteExpense
 */
export const api_DeleteExpense = id => {
    store.dispatch(fetchData());
    return (dispatch) => {
        return api.DeleteExpense(id,dispatch);
    } 
}
