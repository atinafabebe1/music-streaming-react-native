const mongoose = require('mongoose');

// Define the album schema
const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    coverImage: {
      type: String,
      required: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
      // required: true
    }
  },
  { timestamps: true }
);

// Create the album model
const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
