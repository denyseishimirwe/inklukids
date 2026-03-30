const express = require('express');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

function auth(req, res, next) {
  return requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next);
}

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

// Parent: list linked child accounts (for progress, assignments, etc.)
router.get('/me/linked-children', auth, async (req, res) => {
  if (req.auth.role !== 'parent') return res.status(403).json({ message: 'Only parent can access this' });

  const parent = await User.findById(req.auth.userId).lean();
  if (!parent) return res.status(404).json({ message: 'Parent not found' });

  const childIds = (parent.linkedChildUserIds || []).map(String);
  if (childIds.length === 0) return res.json({ children: [] });

  const children = await User.find({ _id: { $in: childIds } })
    .select('_id name email gradeLevel childProgress')
    .lean();

  return res.json({
    children: children.map((c) => ({
      id: String(c._id),
      name: c.name,
      email: c.email,
      gradeLevel: c.gradeLevel || '',
      progress: {
        completedActivityIds: c.childProgress?.completedActivityIds || [],
        points: c.childProgress?.points || 0,
        lastCompletedAt: c.childProgress?.lastCompletedAt || null,
      },
    })),
  });
});

// Directory: list teachers and the grades they teach (for parent communication)
router.get('/teachers-directory', auth, async (req, res) => {
  const teachers = await User.find({ role: 'teacher', status: 'Active' })
    .sort({ createdAt: -1 })
    .select('_id name email teachesGrades')
    .lean();
  return res.json({
    teachers: teachers.map((t) => ({
      id: String(t._id),
      name: t.name,
      email: t.email,
      teachesGrades: t.teachesGrades || [],
    })),
  });
});

module.exports = { usersRouter: router };

