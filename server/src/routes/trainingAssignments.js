const express = require('express');
const mongoose = require('mongoose');
const { z } = require('zod');

const TrainingAssignment = require('../models/TrainingAssignment');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const AssignSchema = z.object({
  assigneeUserId: z.string().min(1),
  moduleTitle: z.string().trim().min(1),
  moduleDescription: z.string().trim().optional(),
  moduleLink: z.string().url().optional(),
  dueAt: z.string().datetime().optional(),
});

function auth(req, res, next) {
  return requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next);
}

router.post('/', auth, async (req, res) => {
  if (!['admin', 'teacher'].includes(req.auth.role)) {
    return res.status(403).json({ message: 'Only admin or teacher can assign training' });
  }
  const parsed = AssignSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });

  if (!mongoose.isValidObjectId(parsed.data.assigneeUserId)) return res.status(400).json({ message: 'Invalid assignee id' });
  const assignee = await User.findById(parsed.data.assigneeUserId).select('_id role name').lean();
  if (!assignee) return res.status(404).json({ message: 'Assignee not found' });

  if (req.auth.role === 'admin' && assignee.role !== 'teacher') {
    return res.status(403).json({ message: 'Admin can assign training only to teachers' });
  }
  if (req.auth.role === 'teacher' && assignee.role !== 'parent') {
    return res.status(403).json({ message: 'Teacher can assign training only to parents' });
  }

  const created = await TrainingAssignment.create({
    assigneeUserId: assignee._id,
    assignedByUserId: req.auth.userId,
    assigneeRole: assignee.role,
    moduleTitle: parsed.data.moduleTitle,
    moduleDescription: parsed.data.moduleDescription || '',
    moduleLink: parsed.data.moduleLink || '',
    dueAt: parsed.data.dueAt ? new Date(parsed.data.dueAt) : null,
  });

  return res.status(201).json({ assignmentId: String(created._id) });
});

router.get('/mine', auth, async (req, res) => {
  if (!['teacher', 'parent'].includes(req.auth.role)) return res.status(403).json({ message: 'Only teacher/parent can view training assignments' });
  const items = await TrainingAssignment.find({ assigneeUserId: req.auth.userId }).sort({ createdAt: -1 }).lean();

  const assignerIds = [...new Set(items.map((x) => String(x.assignedByUserId)))];
  const assigners = await User.find({ _id: { $in: assignerIds } }).select('_id name role').lean();
  const byId = new Map(assigners.map((a) => [String(a._id), a]));

  return res.json({
    assignments: items.map((a) => ({
      id: String(a._id),
      moduleTitle: a.moduleTitle,
      moduleDescription: a.moduleDescription,
      moduleLink: a.moduleLink,
      status: a.status,
      dueAt: a.dueAt,
      completedAt: a.completedAt,
      assignedAt: a.createdAt,
      assignedBy: byId.get(String(a.assignedByUserId)) ? {
        id: String(byId.get(String(a.assignedByUserId))._id),
        name: byId.get(String(a.assignedByUserId)).name,
        role: byId.get(String(a.assignedByUserId)).role,
      } : null,
    })),
  });
});

router.post('/:id/complete', auth, async (req, res) => {
  if (!['teacher', 'parent'].includes(req.auth.role)) return res.status(403).json({ message: 'Only teacher/parent can complete training assignments' });
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid assignment id' });
  const a = await TrainingAssignment.findById(req.params.id);
  if (!a) return res.status(404).json({ message: 'Assignment not found' });
  if (String(a.assigneeUserId) !== String(req.auth.userId)) return res.status(403).json({ message: 'Not allowed' });
  if (a.status !== 'completed') {
    a.status = 'completed';
    a.completedAt = new Date();
    await a.save();
  }
  return res.json({ ok: true });
});

module.exports = { trainingAssignmentsRouter: router };

