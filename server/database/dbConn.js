const client = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/';
const options = {useUnifiedTopology: true, useNewUrlParser: true};

let _db;

/**
 * Initialize MongoDB connection
 * @author - Srinath Ravi <srinath_ravi@hotmail.com> 
 * @param {*} callback 
 * @return {funtion} - callback
 */
async function initDB_Connection(callback){
    if(_db){
        console.warn("Trying to initialize MongoDB...")
        return callback(null,_db);
    }
    await client.connect(uri,options).then(
        client => {
            const db = client.db('expense_tracker');
            _db = db;
            console.log(`MongoDB is connected to: ${uri}`);
            return callback(null, db);
        }
    );
}

/**
 * Get MongoDB connection object
 * @author - Srinath Ravi <srinath_ravi@hotmail.com> 
 * @return {_db} - Database Object
 */
function getDB_Connection() {
    return _db;
}

module.exports = { initDB_Connection, getDB_Connection};