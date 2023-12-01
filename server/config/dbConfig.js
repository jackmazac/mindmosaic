const mysql = require('mysql');

const dbConnection = () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    connection.connect(error => {
        if (error) {
            console.error('Error connecting to the database: ', error);
            process.exit(1);
        } else {
            console.log('Database connected successfully');
        }
    });

    return connection;
};

module.exports = dbConnection;
