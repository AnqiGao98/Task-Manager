const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models/index');
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized token',
      });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
