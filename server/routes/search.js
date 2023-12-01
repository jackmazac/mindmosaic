const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const searchTerm = req.query.term;
    const [results, fields] = await db.query('SELECT * FROM contents WHERE title LIKE ?', [`%${searchTerm}%`]);
    res.json(results);
});

module.exports = router;
