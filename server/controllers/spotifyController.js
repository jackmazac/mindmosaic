const db = require('../db');
const { Parser } = require('json2csv');

// Get songs with optional filtering
exports.getSongs = (req, res) => {
    console.log("Entered getSongs function");

    const filter = req.query.filter || '';
    console.log("Filter value:", filter);

    const query = "SELECT * FROM Songs WHERE title LIKE ? AND deleted = 0";
    db.all(query, [`%${filter}%`], (err, results) => {
        if (err) {
            console.error("Database query error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log("Query results:", results);
        res.json(results);
    });
};

// Add a new song
exports.addSong = (req, res) => {
    const { title, artist, duration, album } = req.body;
    const query = "INSERT INTO Songs (title, artist, duration, album, deleted) VALUES (?, ?, ?, ?, 0)";
    db.run(query, [title, artist, duration, album], function(err) {
        if (err) {
            console.error("Error adding song:", err);
            return res.status(500).json({ error: "Error adding song: " + err.message });
        }
        res.status(201).json({ message: 'Song added successfully', songId: this.lastID });
    });
};

// Update a song
exports.updateSong = (req, res) => {
    const songId = req.params.id;
    const { title, artist, duration, album } = req.body;
    const query = "UPDATE Songs SET title = ?, artist = ?, duration = ?, album = ? WHERE SongID = ?";
    db.run(query, [title, artist, duration, album, songId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Song updated successfully' });
    });
};

// Soft delete a song
exports.softDeleteSong = (req, res) => {
    const songId = req.params.id;
    const query = "UPDATE Songs SET deleted = 1 WHERE SongID = ?";
    db.run(query, [songId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Song deleted successfully' });
    });
};

// Export songs data as CSV
exports.exportSongsData = (req, res) => {
    const query = "SELECT * FROM Songs WHERE deleted = 0";
    db.all(query, (err, results) => {
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
};// Export songs data as CSV
exports.exportSongsData = (req, res) => {
    const query = "SELECT * FROM Songs WHERE deleted = 0";
    db.all(query, (err, results) => {
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
