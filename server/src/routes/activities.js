const express = require('express');
const Activity = require('../models/Activity');

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

module.exports = { activitiesRouter: router };

