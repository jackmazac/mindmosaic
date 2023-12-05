const express = require('express');
const router = express.Router();

const db = require('../db'); // Assuming you have a db.js file for database connection

// Route to start the Spotify authentication process
// TODO: Replace 'startAuth' with your actual function
router.get('/auth/start', startAuth);

// Route to finish the Spotify authentication process
// TODO: Replace 'finishAuth' with your actual function
router.get('/auth/finish', finishAuth);

// Route to fetch sample data from database
router.get('/sampleData', (req, res) => {
    db.query('SELECT * FROM Songs', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
