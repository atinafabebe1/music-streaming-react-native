const Song = require('../model/song');
const fs = require('fs');
const path = require('path');

const createSong = async (req, res) => {
  try {
    const { title, artist, album, duration, genre } = req.body;
    console.log(req.userId);
    const song = await Song.create({
      title,
      artist,
      album,
      duration,
      genre,
      url: req.file.path,
      user: req.userId
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

    // Map the songs array to include the music link
    const songsWithLink = songs.map((song) => {
      return {
        ...song._doc,
        url: `https://musicify-0umh.onrender.com/${song.url}`
      };
    });

    res.json(songsWithLink);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the songs' });
  }
};

// Get a single song by ID
const getSongById = async (req, res) => {
  try {
    const songId = req.params.id;
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    const songFilePath = path.join(__dirname, '../uploads', song.path.replace(/\\/g, '/'));
    const songStream = fs.createReadStream(songFilePath);

    // Set the appropriate headers for streaming the music file
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': song.size
    });

    console.log(res);

    // Stream the music file as the response
    songStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getSongAudioById = async (req, res) => {
  try {
    const songId = req.params.id;
    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    const songFilePath = path.join(__dirname, '..', song.url.replace(/\\/g, '/'));

    // Set the appropriate headers for streaming the music file
    res.set({
      'Content-Type': 'audio/mpeg',
      'Transfer-Encoding': 'chunked'
    });

    // Create a readable stream and pipe it to the response
    const stream = fs.createReadStream(songFilePath);
    stream.pipe(res);

    stream.on('error', (error) => {
      console.error('Error streaming audio file:', error);
    });

    stream.on('end', () => {
      console.log('Audio file streamed successfully');
    });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error' });
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
  deleteSongById,
  getSongAudioById
};
