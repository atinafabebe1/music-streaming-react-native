const express = require('express');
const router = express.Router();
const albumController = require('../controller/album');
const { requireAuth } = require('../middleware/auth');
const multer = require('multer');

// Create a new song with file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Generate a unique filename
    cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename for the uploaded file
  }
});

const upload = multer({ storage: storage }); // Create a multer instance with the specified storage

router.post('/album', upload.single('coverImage'), albumController.createalbum); // Use the upload middleware to process the image upload

// Get all songs
router.get('/', albumController.getAllalbums);

// Get a single song by ID
router.get('/:id', albumController.getalbumById);

// Update a song by ID
router.put('/:id', requireAuth, albumController.updatealbumById);

// Delete a song by ID
router.delete('/:id', requireAuth, albumController.deletealbumById);

module.exports = router;
