const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const spotifyController = require('../controllers/spotifyController');

// Validation rules for adding a new song
const songValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('artist').notEmpty().withMessage('Artist is required'),
    body('duration').notEmpty().withMessage('Duration is required'),
    body('album').notEmpty().withMessage('Album is required'),
];

router.get('/test', (req, res) => {
    res.json({ message: "Test route is working!" });

});

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

router.put('/songs/update/:id', songValidationRules, validate, (req, res, next) => {
    console.log("PUT /songs/update/:id route hit");
    spotifyController.updateSong(req, res);
});

router.delete('/songs/delete/:id', (req, res, next) => {
    console.log("DELETE /songs/delete/:id route hit");
    spotifyController.softDeleteSong(req, res);
});

router.get('/exportData', (req, res, next) => {
    console.log("GET /exportData route hit");
    spotifyController.exportSongsData(req, res, next);
});

module.exports = router;

router.get('/exportData', (req, res, next) => {
    console.log("GET /exportData route hit");
    spotifyController.exportSongsData(req, res, next);
});

router.get('/songStatistics', (req, res, next) => {
    console.log("GET /songStatistics route hit");
    spotifyController.getSongStatistics(req, res, next);
});

router.get('/albumsWithTopSongs', (req, res, next) => {
    console.log("GET /albumsWithTopSongs route hit");
    spotifyController.getAlbumsWithTopSongs(req, res, next);
});

router.get('/artistAlbumSongInfo', (req, res, next) => {
    console.log("GET /artistAlbumSongInfo route hit");
    spotifyController.getArtistAlbumSongInfo(req, res, next);
});

router.get('/userPlaylistSongs/:userId', (req, res, next) => {
    console.log("GET /userPlaylistSongs/:userId route hit");
    spotifyController.getUserPlaylistSongs(req, res, next);
});

router.post('/songs/addWithTransaction', songValidationRules, validate, (req, res, next) => {
    console.log("POST /songs/addWithTransaction route hit");
    spotifyController.addSongWithTransaction(req, res, next);
});
