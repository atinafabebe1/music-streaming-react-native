const express = require('express');
const router = express.Router();
const albumController = require('../controller/album');

// Create a new song with file upload
router.post('/album', albumController.createalbum);

// Get all songs
router.get('/', albumController.getAllalbums);

// Get a single song by ID
router.get('/:id', albumController.getalbumById);

// Update a song by ID
router.put('/:id', albumController.updatealbumById);

// Delete a song by ID
router.delete('/:id', albumController.deletealbumById);

module.exports = router;
