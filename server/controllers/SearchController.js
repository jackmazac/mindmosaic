const db = require('../db');

const SearchController = {
    search: async (req, res) => {
        const searchTerm = req.query.term;
        const [results, fields] = await db.query('SELECT * FROM contents WHERE title LIKE ?', [`%${searchTerm}%`]);
        res.json(results);
    }
};

module.exports = SearchController;
