const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const { requireAuth } = require('../middleware/auth');
// Register a new user
router.post('/register', UserController.registerUser);

// Login user
router.post('/login', UserController.loginUser);
router.post('/getme', requireAuth, UserController.getUserById);

module.exports = router;
