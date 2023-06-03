const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Split the token to remove the "Bearer " prefix
    const tokenValue = token.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(tokenValue, 'secretKey');

    console.log(decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { requireAuth };
