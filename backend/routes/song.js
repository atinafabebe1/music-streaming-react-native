const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const songController = require('../controller/song');

// Create a storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  }
});

// Create a file filter function to only allow mp3 files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'audio/mpeg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP3 files are allowed.'), false);
  }
};

// Create an upload instance of multer with the storage and file filter options
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Create a new song with file upload
router.post('/songs', songController.createSong);

// Get all songs
router.get('/songs', songController.getAllSongs);

// Get a single song by ID
router.get('/songs/:id', songController.getSongById);

// Update a song by ID
router.put('/songs/:id', songController.updateSongById);

// Delete a song by ID
router.delete('/songs/:id', songController.deleteSongById);

module.exports = router;
