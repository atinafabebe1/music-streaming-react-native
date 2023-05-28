const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');

// Register a new user
router.post('/register', UserController.registerUser);

// Login user
router.post('/login', UserController.loginUser);

module.exports = router;
