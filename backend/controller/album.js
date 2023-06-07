const Album = require('../model/album');
const path = require('path');
const fs = require('fs');

const createalbum = async (req, res) => {
  try {
    const { title, description, genre } = req.body;

    // Check if a file was uploaded
    let coverImage = '';
    if (req.file) {
      coverImage = req.file.path; // Save the path of the uploaded file
    }

    const album = await Album.create({
      title,
      genre,
      description,
      coverImage, // Save the file path in the album data
      user: req.user._id
    });

    res.status(201).json(album);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the album' });
  }
};

// Get all albums
const getAllalbums = async (req, res) => {
  try {
    const albums = await Album.find();

    // Retrieve the cover image for each album
    const albumsWithCoverImage = await Promise.all(
      albums.map(async (album) => {
        const { _id, title, genre, description, user } = album;

        // Retrieve the filename from the coverImage field
        const filename = path.basename(album.coverImage);

        // Construct the cover image path
        const coverImagePath = path.join(__dirname, '..', 'uploads', filename);

        // Read the cover image file
        const coverImage = fs.readFileSync(coverImagePath);

        return {
          _id,
          title,
          genre,
          description,
          user,
          coverImage
        };
      })
    );

    res.json(albumsWithCoverImage);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the albums' });
  }
};

// Get a single album by ID
const getalbumById = async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({ message: 'album not found' });
    }

    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a album by ID
const updatealbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, genre } = req.body;

    const album = await album.findByIdAndUpdate(id, { title, description, genre }, { new: true });

    if (!album) {
      return res.status(404).json({ error: 'album not found' });
    }

    res.json(album);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the album' });
  }
};

// Delete a album by ID
const deletealbumById = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await album.findByIdAndDelete(id);

    if (!album) {
      return res.status(404).json({ error: 'album not found' });
    }

    res.json({ message: 'album deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the album' });
  }
};

module.exports = {
  createalbum,
  getAllalbums,
  getalbumById,
  updatealbumById,
  deletealbumById
};
