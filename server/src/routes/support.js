const express = require('express');
const { z } = require('zod');

const SupportRequest = require('../models/SupportRequest');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const CreateSchema = z.object({
  category: z.enum(['learning', 'social', 'feelings', 'other']),
  message: z.string().trim().min(1).max(2000),
});

function auth(req, res, next) {
  return requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next);
}

router.post('/child', auth, async (req, res) => {
  if (req.auth.role !== 'child') return res.status(403).json({ message: 'Only children can send support requests' });
  const parsed = CreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });

  const child = await User.findById(req.auth.userId).select('_id name').lean();
  if (!child) return res.status(404).json({ message: 'Child not found' });

  const created = await SupportRequest.create({
    childUserId: child._id,
    childName: child.name,
    category: parsed.data.category,
    message: parsed.data.message,
  });
  return res.status(201).json({ requestId: String(created._id) });
});

router.get('/mine', auth, async (req, res) => {
  if (req.auth.role !== 'child') return res.status(403).json({ message: 'Only children can view this' });
  const items = await SupportRequest.find({ childUserId: req.auth.userId }).sort({ createdAt: -1 }).lean();
  return res.json({
    requests: items.map((r) => ({
      id: String(r._id),
      category: r.category,
      message: r.message,
      status: r.status,
      createdAt: r.createdAt,
    })),
  });
});

router.get('/teacher', auth, async (req, res) => {
  if (!['teacher', 'admin'].includes(req.auth.role)) return res.status(403).json({ message: 'Only teacher/admin can view support requests' });
  const items = await SupportRequest.find({}).sort({ createdAt: -1 }).limit(50).lean();
  return res.json({
    requests: items.map((r) => ({
      id: String(r._id),
      childName: r.childName,
      category: r.category,
      message: r.message,
      status: r.status,
      createdAt: r.createdAt,
    })),
  });
});

router.post('/:id/seen', auth, async (req, res) => {
  if (!['teacher', 'admin'].includes(req.auth.role)) return res.status(403).json({ message: 'Only teacher/admin can mark seen' });
  const item = await SupportRequest.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Request not found' });
  if (item.status !== 'seen') {
    item.status = 'seen';
    await item.save();
  }
  return res.json({ ok: true });
});

module.exports = { supportRouter: router };
