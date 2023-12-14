const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const spotifyController = require('../controllers/spotifyController');

// Route to fetch songs with optional filtering
router.get('/api/spotify/songs', spotifyController.getSongs);

// Validation rules for adding a new song
const songValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    // Add other validation rules as needed
];

// Middleware to check for validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Route to add a new song
router.post('/songs/add', songValidationRules, validate, spotifyController.addSong);

// Route to update a song
router.put('/songs/update/:id', spotifyController.updateSong);

// Route for soft deletion of a song
router.put('/songs/delete/:id', spotifyController.softDeleteSong);

// Route to export songs data
router.get('/exportData', spotifyController.exportSongsData);

module.exports = router;
