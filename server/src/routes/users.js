const express = require('express');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

function ensureRole(role) {
  return (req, res, next) => requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, () => {
    if (req.auth?.role !== role) return res.status(403).json({ message: `Only ${role} can access this` });
    return next();
  });
}

// Teacher: list child accounts to assign activities
router.get('/children', ensureRole('teacher'), async (req, res) => {
  const children = await User.find({ role: 'child', status: 'Active' }).sort({ createdAt: -1 }).select('_id name email').lean();
  return res.json({
    children: children.map(c => ({ id: String(c._id), name: c.name, email: c.email })),
  });
});

// Admin: list teachers for training assignments
router.get('/teachers', ensureRole('admin'), async (req, res) => {
  const teachers = await User.find({ role: 'teacher', status: 'Active' }).sort({ createdAt: -1 }).select('_id name email').lean();
  return res.json({
    teachers: teachers.map(u => ({ id: String(u._id), name: u.name, email: u.email })),
  });
});

// Teacher: list parents for training assignments
router.get('/parents', ensureRole('teacher'), async (req, res) => {
  const parents = await User.find({ role: 'parent', status: 'Active' }).sort({ createdAt: -1 }).select('_id name email').lean();
  return res.json({
    parents: parents.map(u => ({ id: String(u._id), name: u.name, email: u.email })),
  });
});

module.exports = { usersRouter: router };

