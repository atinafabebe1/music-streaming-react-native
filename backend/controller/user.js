const User = require('../model/user');
const jwt = require('jsonwebtoken');

// Controller for user registration
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

// Controller for user login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists and password matches
    const user = await User.findOne({ username });

    const isValidPassword = (password) => {
      if (user.password === password) {
        return true;
      }
      return false;
    };
    if (!user || !isValidPassword(password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey');

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login user', error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser, getUserById };
