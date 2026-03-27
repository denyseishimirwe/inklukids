const express = require('express');
const { z } = require('zod');

const Announcement = require('../models/Announcement');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const CreateSchema = z.object({
  title: z.string().trim().min(1).max(120),
  body: z.string().trim().min(1).max(3000),
  audience: z.enum(['all', 'teachers', 'parents']),
});

function auth(req, res, next) {
  return requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next);
}

function canCreate(role) {
  return role === 'admin' || role === 'teacher';
}

function canSee(role, audience) {
  if (audience === 'all') return true;
  if (audience === 'teachers') return role === 'teacher' || role === 'admin';
  if (audience === 'parents') return role === 'parent' || role === 'admin' || role === 'teacher';
  return false;
}

router.post('/', auth, async (req, res) => {
  if (!canCreate(req.auth.role)) return res.status(403).json({ message: 'Only teachers/admins can post announcements' });
  const parsed = CreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });

  const created = await Announcement.create({
    createdByUserId: req.auth.userId,
    createdByRole: req.auth.role,
    title: parsed.data.title,
    body: parsed.data.body,
    audience: parsed.data.audience,
  });
  return res.status(201).json({ announcementId: String(created._id) });
});

router.get('/mine', auth, async (req, res) => {
  if (!canCreate(req.auth.role)) return res.json({ announcements: [] });
  const items = await Announcement.find({ createdByUserId: req.auth.userId }).sort({ createdAt: -1 }).lean();
  return res.json({
    announcements: items.map((a) => ({
      id: String(a._id),
      title: a.title,
      body: a.body,
      audience: a.audience,
      createdAt: a.createdAt,
    })),
  });
});

router.get('/', auth, async (req, res) => {
  const items = await Announcement.find({}).sort({ createdAt: -1 }).limit(30).lean();
  const filtered = items.filter((a) => canSee(req.auth.role, a.audience));

  const creatorIds = [...new Set(filtered.map((a) => String(a.createdByUserId)))];
  const creators = await User.find({ _id: { $in: creatorIds } }).select('_id name role').lean();
  const byId = new Map(creators.map((c) => [String(c._id), c]));

  return res.json({
    announcements: filtered.map((a) => {
      const c = byId.get(String(a.createdByUserId));
      return {
        id: String(a._id),
        title: a.title,
        body: a.body,
        audience: a.audience,
        createdAt: a.createdAt,
        createdBy: c ? { id: String(c._id), name: c.name, role: c.role } : null,
      };
    }),
  });
});

module.exports = { announcementsRouter: router };

