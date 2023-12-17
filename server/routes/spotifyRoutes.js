const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const spotifyController = require('../controllers/spotifyController');

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

router.get('/songs', (req, res, next) => {
    console.log("GET /songs route hit");
    spotifyController.getSongs(req, res, next);
});

router.post('/songs/add', songValidationRules, validate, (req, res, next) => {
    console.log("POST /songs/add route hit");
    spotifyController.addSong(req, res, next);
});

router.put('/songs/update/:id', (req, res, next) => {
    console.log("PUT /songs/update/:id route hit");
    spotifyController.updateSong(req, res, next);
});

router.put('/songs/delete/:id', (req, res, next) => {
    console.log("PUT /songs/delete/:id route hit");
    spotifyController.softDeleteSong(req, res, next);
});

router.get('/exportData', (req, res, next) => {
    console.log("GET /exportData route hit");
    spotifyController.exportSongsData(req, res, next);
});

module.exports = router;