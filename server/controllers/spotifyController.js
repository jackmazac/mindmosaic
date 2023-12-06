const db = require('../db'); // Assuming you have a db.js file for database connection
const { Parser } = require('json2csv'); // You might need to install json2csv for CSV export

// Get songs with optional filtering
exports.getSongs = (req, res) => {
    const filter = req.query.filter || '';
    const query = "SELECT * FROM Songs WHERE title LIKE ?";
    db.query(query, [`%${filter}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Add a new song
exports.addSong = (req, res) => {
    const { title, albumId, duration } = req.body; // Include other fields as necessary
    const query = "INSERT INTO Songs (title, albumId, duration) VALUES (?, ?, ?)";
    db.query(query, [title, albumId, duration], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Song added successfully', songId: results.insertId });
    });
};

// Update a song
exports.updateSong = (req, res) => {
    const songId = req.params.id;
    const { title, albumId, duration } = req.body; // Include other fields as necessary
    const query = "UPDATE Songs SET title = ?, albumId = ?, duration = ? WHERE id = ?";
    db.query(query, [title, albumId, duration, songId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Song updated successfully' });
    });
};

// Soft delete a song
exports.softDeleteSong = (req, res) => {
    const songId = req.params.id;
    const query = "UPDATE Songs SET deleted = 1 WHERE id = ?";
    db.query(query, [songId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Song deleted successfully' });
    });
};

// Export songs data as CSV
exports.exportSongsData = (req, res) => {
    const query = "SELECT * FROM Songs WHERE deleted = 0"; // Adjust query as needed
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        try {
            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(results);
            res.header('Content-Type', 'text/csv');
            res.attachment('SongsData.csv');
            return res.send(csv);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
};
