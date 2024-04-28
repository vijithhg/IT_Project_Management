const jwt = require('jsonwebtoken');
require('dotenv').config();

const managerAuth=(req, res, next)=> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized - Bearer token missing' });
  }

  const token = authHeader.split(' ')[1];

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if(decoded.userRole!=2){
      return res.status(500).json({error:`You don't have permission to access this route`})
    }
    // Extract candidate ID from decoded token
    req.userId = decoded.userId;
    next();
  });
}

module.exports = {managerAuth};
