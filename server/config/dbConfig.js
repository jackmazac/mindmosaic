const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database: ', error);
        process.exit(1);
    }
};

module.exports = dbConnection;
