const db = require('../db');
const { Parser } = require('json2csv');

// Get songs with optional filtering
exports.getSongs = (req, res) => {
    // Log that the function has been entered
    console.log("Entered getSongs function");

    const filter = req.query.filter || '';
    // Log the filter value
    console.log("Filter value:", filter);

    const query = "SELECT * FROM Songs WHERE title LIKE ?";
    db.query(query, [`%${filter}%`], (err, results) => {
        if (err) {
            // Log the error
            console.error("Database query error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        // Log the results
        console.log("Query results:", results);

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
