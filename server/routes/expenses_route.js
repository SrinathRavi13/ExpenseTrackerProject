"use strict";

/**
 * Express router methods
 * @author
 */

const express = require('express');
const router = express.Router();
const expensesModel = require('../model/expenses');
const TAXPERCENTAGE = Number(15/100);

/**
 * 
 */
router.get('/', function (req, res) {
    expensesModel.getAllExpenses((err,data) => {
        if(err) res.send("Error");
        res.json(data);
    });
})

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

router.delete('/delete', function (req, res) {
    let key = Number(req.query.key);
    expensesModel.deleteExpense(key,(err,data) => {
        if(err) res.send("Error");
        res.json(data);
    });
})

module.exports = router;