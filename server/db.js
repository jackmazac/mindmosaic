const dbConnection = require('./config/dbConfig');

const db = dbConnection();

module.exports = db;
