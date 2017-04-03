const jwt = require('jsonwebtoken');

const JWT_SECRET = 'GIVE_ME_JOB_:D'; // push to config in production

module.exports = {
  generateToken,
  verifyToken
}

function generateToken(username) {
  return jwt.sign({ username }, JWT_SECRET);
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, function(err, decoded) {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}