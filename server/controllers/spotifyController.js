const db = require('../db'); // Assuming you have a db.js file for database connection

const getSampleData = (req, res) => {
    db.query('SELECT * FROM Tunify', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

module.exports = {
    getSampleData
};
