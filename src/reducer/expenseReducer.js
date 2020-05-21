/**
 * Redux Reducer Method for Expenses
 * @author - Srinath Ravi <srinath_ravi@hotmail.com> 
 */
import * as actionTypes from '../constants/actionTypes'

const intialState = {
    expenseList: [],
    totalAmount: 0,
    totalTax: 0
};

/**
 * Calculate total expense
 * @param {object} obj - expense List
 * @return {number}
 */
const getTotalAmount = (expenseList) => {
    return expenseList.reduce((acc, expense) => acc + Number(expense.amount), 0);
}

/**
 * Calculate total tax
 * @param {object} obj - expense List
 * @return {number}
 */
const getTotalTaxes = (expenseList) => {
    return expenseList.reduce((acc, expense) => acc + Number(expense.taxes), 0);
}

/**
 * Redux Reducer method - expenseReducer
 * @param {object} state - Redux State Object
 * @param {*} action - action Value
 */
const expenseReducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_STORE:
            return state
        case actionTypes.GET_EXPENSES:
            return {
                ...state,
                expenseList: action.expenseList,
                totalAmount: getTotalAmount(action.expenseList),
                totalTax: getTotalTaxes(action.expenseList)
            }
        case actionTypes.TOTAL_EXPENSE:
            return {
                ...state,
                totalAmount: action.value
            }
        case actionTypes.TOTAL_TAX:
            return {
                ...state,
                totalTax: action.value
            }
        case actionTypes.ADD_EXPENSE:
            let Obj = [...state.expenseList, action.expense];
            return {
                ...state,
                expenseList: Obj,
                totalAmount: getTotalAmount(Obj),
                totalTax: getTotalTaxes(Obj)
            }
        case actionTypes.UPDATE_EXPENSE:
            let expense = action.expense;
            let expenseList = state.expenseList.map((item) => {
                return (item._id === expense._id) ? Object.assign({}, item, expense) : item;
            })
            return {
                ...state,
                expenseList: expenseList,
                totalAmount: getTotalAmount(expenseList),
                totalTax: getTotalTaxes(expenseList)
            }
        case actionTypes.DELETE_EXPENSE:
            let filteredObj = state.expenseList.filter(e => e._id !== action.id);
            return {
                ...state,
                expenseList: filteredObj,
                totalAmount: getTotalAmount(filteredObj),
                totalTax: getTotalTaxes(filteredObj)
            }
        default:
            return state;
    }
}

export default expenseReducer;
