const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function createAccessToken({ userId, role, secret, ttl }) {
  return jwt.sign({ sub: String(userId), role }, secret, { expiresIn: ttl });
}

function createRefreshToken({ userId, secret, ttlDays }) {
  const jti = crypto.randomBytes(24).toString('hex');
  const token = jwt.sign({ sub: String(userId), jti }, secret, { expiresIn: `${ttlDays}d` });
  return { token, jti };
}

function verifyRefreshToken(token, secret) {
  return jwt.verify(token, secret);
}

module.exports = {
  sha256,
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
};

