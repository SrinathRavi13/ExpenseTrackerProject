"use strict";

/**
 * Express router methods
 * @author - Srinath Ravi <srinath_ravi@hotmail.com>
 */

const express = require('express');
const router = express.Router();
const expensesModel = require('../model/expenses');
const TAXPERCENTAGE = Number(15/100);

/**
 * Get request router
 * @param {string} / - URL string
 * @param {function} callback 
 * @return {json} - The expense List
 */
router.get('/', function (req, res) {
    expensesModel.getAllExpenses((err,data) => {
        if(err) res.send("Error");
        res.json(data);
    });
})

/**
 * Put request router
 * @param {string} /add - URL string
 * @param {function} callback 
 * @return {json} - The expense List
 */
router.put('/add', function (req, res) {
    let expense = req.body.expense;
    if(expense){
        expense.taxes = Number(expense.amount) * TAXPERCENTAGE;
        expense.date = new Date().toISOString();
        expensesModel.addExpense(expense,(err,data) => {
            if(err) res.send("Error ");
            res.json(data);
        });
    }else{
        console.log("No value")
        res.json({});
    }
})

/**
 * Put request router
 * @param {string} /update - URL string
 * @param {function} callback 
 * @return {json} - The expense List
 */
router.put('/update', function (req, res) {
    let expense = req.body.expense;
    if(expense){
        expense.taxes = Number(expense.amount)*TAXPERCENTAGE;
        expense.date = new Date().toISOString();
        expensesModel.updateExpense(expense,(err,data) => {
            if(err) res.send("Error");
            res.json(data);
        });
    }else{
        console.log("No value");
        res.json({});
    }
})

/**
 * Delete request router
 * @param {string} /delete - URL string
 * @param {function} callback 
 * @return {json} - The expense List
 */
router.delete('/delete', function (req, res) {
    let key = Number(req.query.key);
    expensesModel.deleteExpense(key,(err,data) => {
        if(err) res.send("Error");
        res.json(data);
    });
})

module.exports = router;
