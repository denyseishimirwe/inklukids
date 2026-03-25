const mongoose = require('mongoose');

const ChildSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  age: { type: Number },
  school: { type: String, trim: true },
  diagnosis: { type: String, trim: true },
  notes: { type: String, trim: true },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'parent', 'child', 'admin'], required: true },
  status: { type: String, default: 'Active' },
  children: { type: [ChildSchema], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

