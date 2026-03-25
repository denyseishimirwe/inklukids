const express = require('express');
const { z } = require('zod');
const Activity = require('../models/Activity');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const SEED = [
  {
    title: 'Color Match',
    description: 'Match the colors!',
    icon: 'puzzle',
    color: '#fef9c3',
    steps: ['Find matching colors', 'Try again with new cards', 'Celebrate your match'],
  },
  {
    title: 'How Do I Feel?',
    description: 'Name your feelings',
    icon: 'smile',
    color: '#dcfce7',
    steps: ['Pick a feeling card', 'Say the feeling', 'Make the face'],
  },
  {
    title: 'Count with Me',
    description: 'Count fun objects',
    icon: 'star',
    color: '#dbeafe',
    steps: ['Count together', 'Count by yourself', 'High five'],
  },
  {
    title: 'My Daily Routine',
    description: "What's your routine?",
    icon: 'calendar',
    color: '#fce7f3',
    steps: ['Look at the routine pictures', 'Put them in order', 'Practice the routine'],
  },
  {
    title: 'Story Time',
    description: 'Read a picture story',
    icon: 'book',
    color: '#ede9fe',
    steps: ['Look at the pictures', 'Read together', 'Talk about the story'],
  },
  {
    title: 'Move Your Body',
    description: 'Fun exercises!',
    icon: 'activity',
    color: '#ffedd5',
    steps: ['Stretch', 'Jump 5 times', 'Take deep breaths'],
  },
];

router.get('/', async (req, res) => {
  const count = await Activity.countDocuments();
  if (count === 0) {
    await Activity.insertMany(SEED);
  }
  const items = await Activity.find({ active: true }).sort({ createdAt: 1 }).lean();
  return res.json({
    activities: items.map(a => ({
      id: String(a._id),
      title: a.title,
      description: a.description,
      icon: a.icon,
      color: a.color,
      steps: a.steps || [],
    })),
  });
});

const UpsertSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().min(1),
  steps: z.array(z.string()).optional(),
});

function ensureTeacher(req, res) {
  if (req.auth?.role !== 'teacher') {
    res.status(403).json({ message: 'Only teachers can manage activities' });
    return false;
  }
  return true;
}

router.get('/mine', (req, res, next) => requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next), async (req, res) => {
  if (!ensureTeacher(req, res)) return;
  const items = await Activity.find({ active: true, createdByUserId: req.auth.userId }).sort({ createdAt: -1 }).lean();
  return res.json({
    activities: items.map(a => ({
      id: String(a._id),
      title: a.title,
      description: a.description,
      icon: a.icon,
      color: a.color,
      steps: a.steps || [],
    })),
  });
});

router.post('/', (req, res, next) => requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next), async (req, res) => {
  if (!ensureTeacher(req, res)) return;
  const parsed = UpsertSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });
  const a = await Activity.create({
    ...parsed.data,
    steps: parsed.data.steps || [],
    createdByUserId: req.auth.userId,
  });
  return res.status(201).json({ activity: { id: String(a._id) } });
});

router.put('/:id', (req, res, next) => requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next), async (req, res) => {
  if (!ensureTeacher(req, res)) return;
  const parsed = UpsertSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });

  const existing = await Activity.findById(req.params.id);
  if (!existing || !existing.active) return res.status(404).json({ message: 'Activity not found' });
  if (String(existing.createdByUserId) !== String(req.auth.userId)) return res.status(403).json({ message: 'Not allowed' });

  existing.title = parsed.data.title;
  existing.description = parsed.data.description;
  existing.icon = parsed.data.icon;
  existing.color = parsed.data.color;
  existing.steps = parsed.data.steps || [];
  await existing.save();
  return res.json({ ok: true });
});

router.delete('/:id', (req, res, next) => requireAuth({ accessSecret: req.app.locals.env.JWT_ACCESS_SECRET })(req, res, next), async (req, res) => {
  if (!ensureTeacher(req, res)) return;
  const existing = await Activity.findById(req.params.id);
  if (!existing || !existing.active) return res.status(404).json({ message: 'Activity not found' });
  if (String(existing.createdByUserId) !== String(req.auth.userId)) return res.status(403).json({ message: 'Not allowed' });
  existing.active = false;
  await existing.save();
  return res.json({ ok: true });
});

module.exports = { activitiesRouter: router };

