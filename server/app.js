"use strict";
const express = require('express');
const app = express();
const expensesRouter = require('./routes/expenses_route');
const init_MongoDB = require('./database/dbConn').initDB_Connection;
const bodyParser = require('body-parser');

var db;
const port = 4000;

/**
 * Initialize MongoDB connection and Express server
 * @author - Srinath Ravi <srinath_ravi@hotmail.com> 
 * @param {*} - callback Method
 */
init_MongoDB((err) => {
    if(err) { 
        console.log("MongoDB Connection Error");
    }else{
        app.listen(port, (err) => {
            if(err) console.log("Connection Error");
            console.log("Node server listening to port 4000");
        });
    }
})

//body parsing to json format - helps to read input from req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Api Method get
app.get('/', function (req, res) {
    res.send('Hello World')
})

//Route to ExpenseRouter
app.use('/expenses', expensesRouter);

//Export thr app object - used to run the server in package.json
module.exports = app;

