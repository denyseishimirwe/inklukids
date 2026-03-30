const mongoose = require('mongoose');

const ChildSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  age: { type: Number },
  grade: { type: String, trim: true },
  school: { type: String, trim: true },
  diagnosis: { type: String, trim: true },
  notes: { type: String, trim: true },
}, { _id: false });

const ChildProgressSchema = new mongoose.Schema({
  completedActivityIds: { type: [String], default: [] },
  points: { type: Number, default: 0 },
  lastCompletedAt: { type: Date, default: null },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'parent', 'child', 'admin'], required: true },
  status: { type: String, default: 'Active' },
  children: { type: [ChildSchema], default: [] },
  // For child accounts (role=child): grade/class level at school
  gradeLevel: { type: String, trim: true, default: '' },
  // For teacher accounts (role=teacher): grades/classes they teach
  teachesGrades: { type: [String], default: [] },
  childProgress: { type: ChildProgressSchema, default: () => ({}) },
  // For linking existing child accounts to a parent account
  linkedChildUserIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  // For child accounts: which parent they belong to (optional)
  parentUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, index: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

