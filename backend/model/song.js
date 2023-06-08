const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String
    // required: true
  },
  artist: {
    type: String
    // required: true
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  },
  duration: {
    type: String
    // required: true
  },
  genre: {
    type: String
  },
  url: {
    type: String
    // required: true
  },
  coverImage: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Song = mongoose.model('SongMusic', songSchema);

module.exports = Song;
