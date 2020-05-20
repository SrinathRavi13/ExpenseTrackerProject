/**
 * Model file
 * CRUD operation on the "expenses" collection are carried out here
 * 
 */

const getDB = require('../database/dbConn').getDB_Connection;
const collectionName = "expenses";

/**
 * Get all expense details
 * @author - Srinath Ravi <srinath_ravi@hotmail.com> 
 * @param {*} callback 
 * @return {funtion} - callback
 */
const getAllExpenses = async (callback) => {

    try {

        const db = getDB();

        let promise = () => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName).find({}).toArray((err, res) => {
                    err ? reject(err) : resolve(res)
                });
            })
        }

        let result = await promise();
        console.log("Documents fetched successfully")
        return callback(null, result);

    } catch (err) {
        console.error(err);
    }
}

/**
 * Add an expense
 * @author - Srinath Ravi <srinath_ravi@hotmail.com> 
 * @param {object} expense - The expense Object 
 * @param {*} callback 
 * @return {funtion} - callback
 */
const addExpense = async (expense, callback) => {
    try {
        const db = getDB();

        let promise = () => {
            return new Promise((resolve, reject) => {
                db.collection(collectionName).insertOne(expense, (err, res) => {
                    err ? reject(err) : resolve(res);
                })
            })
        }

        let result = await promise();
        console.log("Document Added successfully")
        return callback(null, result);

    } catch (e) {
        console.error(e);
    }
}

/**
 * Update an expense
 * @author - Srinath Ravi <srinath_ravi@hotmail.com> 
 * @param {object} expense - The expense Object 
 * @param {*} callback 
 * @return {funtion} - callback
 */
const updateExpense = async (expense, callback) => {

    try {
        const db = getDB();

        let promise = () => {
            return new Promise((resolve, reject) => {
                const collection = db.collection(collectionName);
                const query = { id: expense.id }
                let newValues = {
                    $set: {
                        description: expense.description,
                        amount: expense.amount,
                        taxes: expense.taxes,
                        date: expense.date
                    }
                }
                collection.updateOne(query, newValues, (err, res) => {
                    err ? reject(err) : resolve(res);
                })
            })
        }

        let result = await promise();
        console.log("Document Updated successfully")
        return callback(null, result);


    } catch (e) {
        console.error(e);
    }
}

/**
 * Delete an expense
 * @author - Srinath Ravi <srinath_ravi@hotmail.com> 
 * @param {number} key - The Key Object 
 * @param {*} callback 
 * @return {funtion} - callback
 */
const deleteExpense = async (key, callback) => {

    try {
        const db = getDB();

        let promise = () => {
            return new Promise((resolve, reject) => {
                const collection = db.collection(collectionName);
                const query = { id: key }
                collection.deleteOne(query, (err, res) => {
                    err ? reject(err) : resolve(res);
                })
            })
        }

        let result = await promise();
        console.log("1 document deleted successfully")
        return callback(null, result);

    } catch (e) {
        console.error(e);
    }
}

//Export all the functions
module.exports = {
    getAllExpenses: getAllExpenses,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense
}

//exports.getAllExpenses = { getAllExpenses };