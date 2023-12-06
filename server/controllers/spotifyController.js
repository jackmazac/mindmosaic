const db = require('../db'); // Assuming you have a db.js file for database connection

const getSampleData = (req, res) => {
    db.query('SELECT * FROM Songs', (err, results) => { // Replace 'Songs' with the name of the table you want to fetch data from
        if (err) {
            console.error('Error fetching data from Tunify:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            console.log('No data found in Tunify.');
            return res.status(404).json({ error: 'No data found.' });
        }
        console.log('Fetched data from Tunify:', results);
        res.json(results);
    });
};

module.exports = {
    getSampleData,
    // TODO: Add functions for creating, updating, deleting, and querying records
};