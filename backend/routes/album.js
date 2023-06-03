const express = require('express');
const router = express.Router();
const albumController = require('../controller/album');
const { requireAuth } = require('../middleware/auth');

// Create a new song with file upload
router.post('/album', albumController.createalbum);

// Get all songs
router.get('/', albumController.getAllalbums);

// Get a single song by ID
router.get('/:id', albumController.getalbumById);

// Update a song by ID
router.put('/:id', requireAuth, albumController.updatealbumById);

// Delete a song by ID
router.delete('/:id', requireAuth, albumController.deletealbumById);

module.exports = router;
