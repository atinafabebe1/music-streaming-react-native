const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://atinafabebe1:atinafabebe123@cluster0.wi7ww4z.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Terminate the application if unable to connect to the database
  });

// Middleware
app.use(express.json());

// Song routes
const songRouter = require('./routes/song');
app.use('/api/songs', songRouter);

// User routes
const userRouter = require('./routes/user');
app.use('/api/users', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Undefined route middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Server shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
