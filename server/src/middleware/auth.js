const jwt = require('jsonwebtoken');

function requireAuth({ accessSecret }) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Missing access token' });
    try {
      const payload = jwt.verify(token, accessSecret);
      req.auth = { userId: payload.sub, role: payload.role };
      return next();
    } catch {
      return res.status(401).json({ message: 'Invalid or expired access token' });
    }
  };
}

module.exports = { requireAuth };

