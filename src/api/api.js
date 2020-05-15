/**
 * Api methods to get Expense information from server
 * @author - Srinath Ravi <srinath_ravi@hotmail.com> 
 */

import Axios from 'axios'
import * as actions from '../actions/actions'

/**
 * Get ExpensesList
 * @param {function} dispatch 
 * @return {funtion} - callback function
 */
export const getExpensesList = async (dispatch) => {
    try {
        const response = await Axios.get('/expenses');
        const data = await response.data;
        console.log(data);
        dispatch(actions.getExpensesList(data));
    } catch (err) {
        console.log("Error fetching Expenses list", err);
    }

}

/**
 * Add Expense detail
 * @param {object} expense - An expense item
 * @param {function} dispatch - Callback function
 */
export const AddExpense = async (expense, dispatch) => {
    try {
        const response = await Axios.put('/expenses/add', { expense: expense });
        const data = await response.data;
        console.log(data);
        dispatch(actions.addExpense(expense));
    } catch (err) {
        console.log("Error Adding Expense", err);
    }

}

/**
 * Update Expense detail 
 * @param {object} expense - An expense item
 * @param {function} dispatch - Callback function
 */
export const UpdateExpense = async (expense, dispatch) => {
    try {
        const response = await Axios.put('/expenses/update', { expense: expense });
        const data = await response.data;
        console.log(data);
        dispatch(actions.updateExpense(expense));
    } catch (err) {
        console.log("Error Updating Expense", err);
    }


}

/**
 * Delete Expense detail
 * @param {number} id - Expense item ID
 * @param {function} dispatch - Callback function
 */
export const DeleteExpense = async (id, dispatch) => {
    try {
        const response = await Axios.delete(`/expenses/delete?key=${id}`)
        const data = await response.data;
        console.log(data);
        dispatch(actions.deleteExpense(id));
    } catch (err) {
        console.log("Error Deleting Expense", err);
    }
}