const Album = require('../model/album');

const createalbum = async (req, res) => {
  try {
    const { title, description, genre } = req.body;
    const album = await Album.create({
      title,
      genre,
      description,
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

    res.json(albums);
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
