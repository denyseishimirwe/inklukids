const express = require('express');
const { z } = require('zod');

const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const CompleteSchema = z.object({
  activityId: z.string().min(1),
  pointsAwarded: z.coerce.number().int().min(0).max(100).default(10),
});

function ensureChild(req, res) {
  if (req.auth?.role !== 'child') {
    res.status(403).json({ message: 'Only children can access progress' });
    return false;
  }
  return true;
}

router.get('/me', (req, res, next) => requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next), async (req, res) => {
  if (!ensureChild(req, res)) return;
  const user = await User.findById(req.auth.userId).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({
    progress: {
      completedActivityIds: user.childProgress?.completedActivityIds || [],
      points: user.childProgress?.points || 0,
      lastCompletedAt: user.childProgress?.lastCompletedAt || null,
    },
  });
});

router.post('/complete', (req, res, next) => requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next), async (req, res) => {
  if (!ensureChild(req, res)) return;

  const parsed = CompleteSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });

  const { activityId, pointsAwarded } = parsed.data;

  const user = await User.findById(req.auth.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const list = user.childProgress?.completedActivityIds || [];
  const already = list.includes(activityId);
  if (!already) {
    user.childProgress.completedActivityIds = [...list, activityId];
    user.childProgress.points = (user.childProgress.points || 0) + pointsAwarded;
    user.childProgress.lastCompletedAt = new Date();
    await user.save();
  }

  return res.json({
    progress: {
      completedActivityIds: user.childProgress.completedActivityIds || [],
      points: user.childProgress.points || 0,
      lastCompletedAt: user.childProgress.lastCompletedAt || null,
    },
    alreadyCompleted: already,
  });
});

router.post('/reset', (req, res, next) => requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next), async (req, res) => {
  if (!ensureChild(req, res)) return;
  const user = await User.findById(req.auth.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.childProgress.completedActivityIds = [];
  user.childProgress.points = 0;
  user.childProgress.lastCompletedAt = null;
  await user.save();
  return res.json({ ok: true });
});

module.exports = { progressRouter: router };

