const express = require('express');
const { z } = require('zod');
const bcrypt = require('bcryptjs');

const Assignment = require('../models/Assignment');
const Activity = require('../models/Activity');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const AssignSchema = z.object({
  childUserId: z.string().min(1),
  activityId: z.string().min(1),
  dueAt: z.string().datetime().optional(),
});

const LinkChildSchema = z.object({
  childEmail: z.string().email(),
  childPassword: z.string().min(1),
});

function auth(req, res, next) {
  return requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next);
}

// Teacher assigns activity to child
router.post('/', auth, async (req, res) => {
  if (req.auth.role !== 'teacher') return res.status(403).json({ message: 'Only teachers can assign activities' });
  const parsed = AssignSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });

  const child = await User.findById(parsed.data.childUserId);
  if (!child || child.role !== 'child') return res.status(404).json({ message: 'Child not found' });

  const activity = await Activity.findById(parsed.data.activityId);
  if (!activity || !activity.active) return res.status(404).json({ message: 'Activity not found' });

  const assignment = await Assignment.create({
    teacherUserId: req.auth.userId,
    childUserId: child._id,
    activityId: activity._id,
    dueAt: parsed.data.dueAt ? new Date(parsed.data.dueAt) : null,
  });
  return res.status(201).json({ assignmentId: String(assignment._id) });
});

// Child: list my assignments
router.get('/mine', auth, async (req, res) => {
  if (req.auth.role !== 'child') return res.status(403).json({ message: 'Only children can view assignments' });
  const items = await Assignment.find({ childUserId: req.auth.userId }).sort({ assignedAt: -1 }).lean();
  const activityIds = [...new Set(items.map(a => String(a.activityId)))];
  const activities = await Activity.find({ _id: { $in: activityIds } }).lean();
  const byId = new Map(activities.map(a => [String(a._id), a]));
  return res.json({
    assignments: items.map(a => {
      const act = byId.get(String(a.activityId));
      return {
        id: String(a._id),
        status: a.status,
        assignedAt: a.assignedAt,
        dueAt: a.dueAt,
        completedAt: a.completedAt,
        activity: act ? {
          id: String(act._id),
          title: act.title,
          description: act.description,
          icon: act.icon,
          color: act.color,
          steps: act.steps || [],
        } : null,
      };
    }).filter(x => x.activity),
  });
});

// Child marks assignment completed
router.post('/:id/complete', auth, async (req, res) => {
  if (req.auth.role !== 'child') return res.status(403).json({ message: 'Only children can complete assignments' });
  const a = await Assignment.findById(req.params.id);
  if (!a) return res.status(404).json({ message: 'Assignment not found' });
  if (String(a.childUserId) !== String(req.auth.userId)) return res.status(403).json({ message: 'Not allowed' });
  if (a.status !== 'completed') {
    a.status = 'completed';
    a.completedAt = new Date();
    await a.save();
  }
  return res.json({ ok: true });
});

// Parent: link existing child account
router.post('/parent/link-child', auth, async (req, res) => {
  if (req.auth.role !== 'parent') return res.status(403).json({ message: 'Only parents can link a child' });
  const parsed = LinkChildSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });

  const child = await User.findOne({ email: parsed.data.childEmail.toLowerCase().trim() });
  if (!child || child.role !== 'child') return res.status(404).json({ message: 'Child account not found' });

  const ok = await bcrypt.compare(parsed.data.childPassword, child.passwordHash);
  if (!ok) return res.status(400).json({ message: 'Child credentials are incorrect' });

  const parent = await User.findById(req.auth.userId);
  if (!parent) return res.status(404).json({ message: 'Parent not found' });

  if (!parent.linkedChildUserIds.map(String).includes(String(child._id))) {
    parent.linkedChildUserIds.push(child._id);
    await parent.save();
  }

  child.parentUserId = parent._id;
  await child.save();

  return res.json({ ok: true, child: { id: String(child._id), name: child.name, email: child.email } });
});

// Parent: list assignments for linked children
router.get('/parent', auth, async (req, res) => {
  if (req.auth.role !== 'parent') return res.status(403).json({ message: 'Only parents can view this' });

  const parent = await User.findById(req.auth.userId).lean();
  if (!parent) return res.status(404).json({ message: 'Parent not found' });

  const childIds = (parent.linkedChildUserIds || []).map(String);
  if (childIds.length === 0) return res.json({ assignments: [] });

  const items = await Assignment.find({ childUserId: { $in: childIds } }).sort({ assignedAt: -1 }).lean();
  const activityIds = [...new Set(items.map(a => String(a.activityId)))];
  const activities = await Activity.find({ _id: { $in: activityIds } }).lean();
  const byAct = new Map(activities.map(a => [String(a._id), a]));

  const children = await User.find({ _id: { $in: childIds } }).select('_id name').lean();
  const byChild = new Map(children.map(c => [String(c._id), c]));

  return res.json({
    assignments: items.map(a => {
      const act = byAct.get(String(a.activityId));
      const ch = byChild.get(String(a.childUserId));
      return {
        id: String(a._id),
        status: a.status,
        assignedAt: a.assignedAt,
        dueAt: a.dueAt,
        completedAt: a.completedAt,
        child: ch ? { id: String(ch._id), name: ch.name } : null,
        activity: act ? {
          id: String(act._id),
          title: act.title,
          description: act.description,
          icon: act.icon,
          color: act.color,
        } : null,
      };
    }).filter(x => x.activity && x.child),
  });
});

module.exports = { assignmentsRouter: router };

