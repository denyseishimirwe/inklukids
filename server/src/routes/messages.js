const express = require('express');
const mongoose = require('mongoose');
const { z } = require('zod');

const Message = require('../models/Message');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const SendSchema = z.object({
  text: z.string().trim().min(1).max(2000),
});

function auth(req, res, next) {
  return requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next);
}

function canUseMessagingRole(role) {
  return ['teacher', 'parent', 'admin'].includes(role);
}

router.get('/threads', auth, async (req, res) => {
  const me = String(req.auth.userId);
  if (!canUseMessagingRole(req.auth.role)) return res.json({ threads: [] });

  const all = await Message.find({
    $or: [{ senderUserId: me }, { recipientUserId: me }],
  }).sort({ createdAt: -1 }).lean();

  const byOther = new Map();
  for (const m of all) {
    const otherId = String(m.senderUserId) === me ? String(m.recipientUserId) : String(m.senderUserId);
    if (!byOther.has(otherId)) byOther.set(otherId, []);
    byOther.get(otherId).push(m);
  }

  const candidateUsers = await User.find({
    _id: { $ne: me },
    role: { $in: ['teacher', 'parent', 'admin'] },
    status: 'Active',
  }).select('_id name email role').lean();

  const userById = new Map(candidateUsers.map((u) => [String(u._id), u]));

  const threads = [];
  for (const [otherId, msgs] of byOther.entries()) {
    const other = userById.get(otherId);
    if (!other) continue;
    const last = msgs[0];
    const unreadCount = msgs.filter((m) => String(m.recipientUserId) === me && !m.readAt).length;
    threads.push({
      userId: otherId,
      name: other.name,
      email: other.email || '',
      role: other.role,
      lastText: last.text,
      lastAt: last.createdAt,
      unreadCount,
    });
  }

  // Also include users with no messages yet so teacher/parent can start chat
  for (const u of candidateUsers) {
    const id = String(u._id);
    if (!threads.find((t) => t.userId === id)) {
      threads.push({
        userId: id,
        name: u.name,
        email: u.email || '',
        role: u.role,
        lastText: '',
        lastAt: null,
        unreadCount: 0,
      });
    }
  }

  threads.sort((a, b) => {
    const at = a.lastAt ? new Date(a.lastAt).getTime() : 0;
    const bt = b.lastAt ? new Date(b.lastAt).getTime() : 0;
    return bt - at;
  });

  return res.json({ threads });
});

router.get('/with/:userId', auth, async (req, res) => {
  const me = String(req.auth.userId);
  if (!mongoose.isValidObjectId(req.params.userId)) return res.status(400).json({ message: 'Invalid user id' });
  const otherId = String(req.params.userId);
  if (otherId === me) return res.status(400).json({ message: 'Cannot message yourself' });

  const other = await User.findById(otherId).select('_id name role status').lean();
  if (!other || other.status !== 'Active') return res.status(404).json({ message: 'Recipient not found' });
  if (!canUseMessagingRole(req.auth.role) || !canUseMessagingRole(other.role)) return res.status(403).json({ message: 'Messaging not allowed' });

  const messages = await Message.find({
    $or: [
      { senderUserId: me, recipientUserId: otherId },
      { senderUserId: otherId, recipientUserId: me },
    ],
  }).sort({ createdAt: 1 }).lean();

  await Message.updateMany(
    { senderUserId: otherId, recipientUserId: me, readAt: null },
    { $set: { readAt: new Date() } }
  );

  return res.json({
    peer: { id: String(other._id), name: other.name, role: other.role },
    messages: messages.map((m) => ({
      id: String(m._id),
      text: m.text,
      fromUserId: String(m.senderUserId),
      toUserId: String(m.recipientUserId),
      createdAt: m.createdAt,
      mine: String(m.senderUserId) === me,
    })),
  });
});

router.post('/with/:userId', auth, async (req, res) => {
  const me = String(req.auth.userId);
  if (!mongoose.isValidObjectId(req.params.userId)) return res.status(400).json({ message: 'Invalid user id' });
  const otherId = String(req.params.userId);
  if (otherId === me) return res.status(400).json({ message: 'Cannot message yourself' });

  const parsed = SendSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });

  const other = await User.findById(otherId).select('_id role status').lean();
  if (!other || other.status !== 'Active') return res.status(404).json({ message: 'Recipient not found' });
  if (!canUseMessagingRole(req.auth.role) || !canUseMessagingRole(other.role)) return res.status(403).json({ message: 'Messaging not allowed' });

  const created = await Message.create({
    senderUserId: me,
    recipientUserId: otherId,
    text: parsed.data.text,
  });

  return res.status(201).json({
    message: {
      id: String(created._id),
      text: created.text,
      fromUserId: String(created.senderUserId),
      toUserId: String(created.recipientUserId),
      createdAt: created.createdAt,
      mine: true,
    },
  });
});

module.exports = { messagesRouter: router };

