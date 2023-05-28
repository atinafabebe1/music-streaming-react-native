const Song = require('../model/song');

const createSong = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const { title, artist, album, duration, genre } = req.body;

    const song = await Song.create({
      title,
      artist,
      album,
      duration,
      genre,
      url: req.file.path // Use the path of the uploaded file from req.file
    });
    console.log(song);
    res.status(201).json(song);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the song' });
  }
};

// Get all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();

    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the songs' });
  }
};

// Get a single song by ID
const getSongById = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the song' });
  }
};

// Update a song by ID
const updateSongById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, album, duration, genre, url, coverImage } = req.body;

    const song = await Song.findByIdAndUpdate(id, { title, artist, album, duration, genre, url, coverImage }, { new: true });

    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the song' });
  }
};

// Delete a song by ID
const deleteSongById = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the song' });
  }
};

module.exports = {
  createSong,
  getAllSongs,
  getSongById,
  updateSongById,
  deleteSongById
};
