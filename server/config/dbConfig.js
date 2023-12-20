const sqlite3 = require('sqlite3').verbose();

const dbConnection = () => {
    const db = new sqlite3.Database('./database/tunify.db', (err) => {
        if (err) {
            console.error('Error opening database', err.message);
            process.exit(1);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });

    return db;
};

module.exports = dbConnection;
